# To support `map` on Flux Chains containing both `Chain` and `Parallel` layers,
# we need a flexible, general purpose container, e.g. Tuple.
# We opt to use `ChainTuple` and `ParallelTuple` instead of `Chain` and `Parallel`
# to avoid type piracy.
"""
    ChainTuple(xs)

Thin wrapper around `Tuple` for use with Flux.jl models.

Together with [`ParallelTuple`](@ref), this can be used to store data `xs`
while preserving the structure of a Flux model without risking type piracy.

See also [`ParallelTuple`](@ref), [`chainmap`](@ref).
"""
struct ChainTuple{T<:Tuple}
    vals::T
end
ChainTuple(xs...) = ChainTuple(xs)

@forward ChainTuple.vals Base.getindex,
Base.length,
Base.first,
Base.last,
Base.iterate,
Base.lastindex,
Base.keys,
Base.firstindex,
Base.:(==)

Base.:(==)(a::ChainTuple, b::ChainTuple) = a.vals == b.vals

"""
    ParallelTuple(connection, xs)

Thin wrapper around `Tuple` for use with Flux.jl models.

Together with [`ChainTuple`](@ref), this can be used to store data `xs`
while preserving the structure of a Flux model without risking type piracy.

See also [`ChainTuple`](@ref), [`chainmap`](@ref).
"""
struct ParallelTuple{C,T<:Tuple}
    connection::C
    vals::T
end
ParallelTuple(connection, xs...) = ParallelTuple(connection, xs)

@forward ParallelTuple.vals Base.getindex,
Base.length,
Base.first,
Base.last,
Base.iterate,
Base.lastindex,
Base.keys,
Base.firstindex,
Base.:(==)

function Base.:(==)(a::ParallelTuple, b::ParallelTuple)
    return a.connection == b.connection && a.vals == b.vals
end

Base.show(io::IO, m::MIME"text/plain", t::ChainTuple) = _show_tuple(io, t, 0)
Base.show(io::IO, m::MIME"text/plain", t::ParallelTuple) = _show_tuple(io, t, 0)

function _show_tuple(io::IO, ct::ChainTuple, indent::Int)
    println(io, " "^indent, "ChainTuple(")
    for x in ct
        _show_tuple(io, x, indent + 2)
    end
    println(io, " "^indent, ")", ifelse(indent != 0, ",", ""))
end
function _show_tuple(io::IO, pt::ParallelTuple, indent::Int)
    println(io, " "^indent, "ParallelTuple(")
    print(io, " "^(indent + 2), pt.connection, ", ")
    printstyled(io, "# connection \n"; color=:light_black)
    for x in pt
        _show_tuple(io, x, indent + 2)
    end
    println(io, " "^indent, ")", ifelse(indent != 0, ",", ""))
end
_show_tuple(io::IO, layer, indent::Int) = println(io, " "^indent, layer, ",")

"""
    chainmap(f, model)
    chainmap(f, model, [f_parallel])

`map` for Flux `Chains`. Applies the function `f` to all layers in a Flux model,
returning a [`ChainTuple`](@ref) or [`ParallelTuple`](@ref) matching the model structure.

## Optional arguments
A second function `f_parallel(p::Parallel)` can be passed, which takes a `Parallel` layer
`p` as input and sets the `connection` field of the constructed `ParallelTuple`.
If no function is specified, `connection` will be set to `nothing`.
"""
chainmap(f, layer) = chainmap(f, layer, _default_f_parallel)
_default_f_parallel = Returns(nothing)

chainmap(f, layer, fp) = f(layer)
chainmap(f, c::Chain, fp) = ChainTuple(chainmap.(f, c.layers, (fp,))...)
chainmap(f, p::Parallel, fp) = ParallelTuple(fp(p), chainmap.(f, p.layers, (fp,))...)

# chainmap can be re-applied on results:
chainmap(f, c::ChainTuple, fp) = ChainTuple(chainmap.(f, c.vals, (fp,))...)
chainmap(f, p::ParallelTuple, fp) = ChainTuple(chainmap.(f, p.vals, (fp,))...)

"""
    heat_tail(xs)

Split input into head and tail.

## Examples
```julia-repl
julia> head_tail(1, 2, 3, 4)
(1, (2, 3, 4))

julia> head_tail((1, 2, 3, 4))
(1, (2, 3, 4))

julia> head_tail([1, 2, 3, 4])
(1, (2, 3, 4))

julia> head_tail(1, (2, 3), 4)
(1, ((2, 3), 4))

julia> head_tail(1)
(1, ())

julia> head_tail()
()
```
"""
head_tail(h, t...) = h, t
head_tail(h, t) = h, t
head_tail() = ()
head_tail(xs::Tuple) = head_tail(xs...)
head_tail(xs::AbstractVector) = head_tail(xs...)
