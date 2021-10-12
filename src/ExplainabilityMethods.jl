module ExplainabilityMethods

using LinearAlgebra
using Flux
using Zygote
using PrettyTables: pretty_table
using ColorSchemes
using CairoMakie
using ImageCore
using Base.Iterators

include("api/explain.jl")
include("neuron_selection.jl")
include("gradient.jl")
include("lrp.jl")
include("lrp_rules.jl")
include("visualization/heatmap.jl")
include("visualization/compare.jl")
include("utils.jl")

export explain, classify_and_explain

# analyzers
export Gradient, InputTimesGradient
export LRP, LRPZero, LRPEpsilon, LRPGamma

# rules
export LRPLayer
export ZeroRule, EpsilonRule, GammaRule, ZBoxRule

# heatmapping
export heatmap, compare

# utils
export model_summary

end # module
