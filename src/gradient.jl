function gradient_wrt_input(model, input, ns::AbstractNeuronSelector)
    output, back = Zygote.pullback(model, input)
    output_indices = ns(output)
    v = zero(output)
    v[output_indices] .= 1
    grad = only(back(v))
    return grad, output, output_indices
end

"""
    Gradient(model)

Analyze model by calculating the gradient of a neuron activation with respect to the input.
"""
struct Gradient{C<:Chain} <: AbstractXAIMethod
    model::C
    Gradient(model::Chain) = new{typeof(model)}(Flux.testmode!(check_output_softmax(model)))
end
function (analyzer::Gradient)(input, ns::AbstractNeuronSelector)
    grad, output, output_indices = gradient_wrt_input(analyzer.model, input, ns)
    return Explanation(grad, output, output_indices, :Gradient, nothing)
end

"""
    InputTimesGradient(model)

Analyze model by calculating the gradient of a neuron activation with respect to the input.
This gradient is then multiplied element-wise with the input.
"""
struct InputTimesGradient{C<:Chain} <: AbstractXAIMethod
    model::C
    function InputTimesGradient(model::Chain)
        return new{typeof(model)}(Flux.testmode!(check_output_softmax(model)))
    end
end
function (analyzer::InputTimesGradient)(input, ns::AbstractNeuronSelector)
    grad, output, output_indices = gradient_wrt_input(analyzer.model, input, ns)
    attr = input .* grad
    return Explanation(attr, output, output_indices, :InputTimesGradient, nothing)
end

"""
    SmoothGrad(analyzer, [n=50, std=0.1, rng=GLOBAL_RNG])
    SmoothGrad(analyzer, [n=50, distribution=Normal(0, σ²=0.01), rng=GLOBAL_RNG])

Analyze model by calculating a smoothed sensitivity map.
This is done by averaging sensitivity maps of a `Gradient` analyzer over random samples
in a neighborhood of the input, typically by adding Gaussian noise with mean 0.

# References
- $REF_SMILKOV_SMOOTHGRAD
"""
SmoothGrad(model, n=50, args...) = NoiseAugmentation(Gradient(model), n, args...)

"""
    IntegratedGradients(analyzer, [n=50])
    IntegratedGradients(analyzer, [n=50])

Analyze model by using the Integrated Gradients method.

# References
- $REF_SUNDARARAJAN_AXIOMATIC
"""
IntegratedGradients(model, n=50) = InterpolationAugmentation(Gradient(model), n)
