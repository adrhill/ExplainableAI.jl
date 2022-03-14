var documenterSearchIndex = {"docs":
[{"location":"api/#API-Reference","page":"API Reference","title":"API Reference","text":"","category":"section"},{"location":"api/","page":"API Reference","title":"API Reference","text":"All methods in ExplainabilityMethods.jl work by calling analyze on an input and an analyzer:","category":"page"},{"location":"api/","page":"API Reference","title":"API Reference","text":"analyze\nheatmap","category":"page"},{"location":"api/#ExplainabilityMethods.analyze","page":"API Reference","title":"ExplainabilityMethods.analyze","text":"analyze(input, method)\nanalyze(input, method, neuron_selection)\n\nReturn raw classifier output and explanation. If neuron_selection is specified, the explanation will be calculated for that neuron. Otherwise, the output neuron with the highest activation is automatically chosen.\n\n\n\n\n\n","category":"function"},{"location":"api/#ExplainabilityMethods.heatmap","page":"API Reference","title":"ExplainabilityMethods.heatmap","text":"heatmap(expl; kwargs...)\n\nVisualize explanation. Assumes the Flux's WHCN convention (width, height, color channels, batch size).\n\nKeyword arguments\n\n-cs::ColorScheme: ColorScheme that is applied. Defaults to ColorSchemes.bwr. -reduce::Symbol: How the color channels are reduced to a single number to apply a colorscheme.     Can be either :sum or :maxabs. :sum sums up all color channels for each pixel.     :maxabs selects the maximum(abs, x) over the color channel in each pixel.     Default is :sum. -normalize::Symbol: How the color channel reduced heatmap is normalized before the colorscheme is applied.     Can be either :extrema or :centered. Default for use with colorscheme bwr is :centered.\n\n\n\n\n\n","category":"function"},{"location":"api/#Analyzers","page":"API Reference","title":"Analyzers","text":"","category":"section"},{"location":"api/","page":"API Reference","title":"API Reference","text":"LRP\nGradient\nInputTimesGradient","category":"page"},{"location":"api/#ExplainabilityMethods.LRP","page":"API Reference","title":"ExplainabilityMethods.LRP","text":"LRP(c::Chain, r::AbstractLRPRule)\nLRP(c::Chain, rs::AbstractVector{<:AbstractLRPRule})\n\nAnalyze model by applying Layer-Wise Relevance Propagation.\n\nKeyword arguments\n\nskip_checks::Bool: Skip checks whether model is compatible with LRP and contains output softmax. Default is false.\nverbose::Bool: Select whether the model checks should print a summary on failure. Default is true.\n\nReferences\n\n[1] G. Montavon et al., Layer-Wise Relevance Propagation: An Overview [2] W. Samek et al., Explaining Deep Neural Networks and Beyond: A Review of Methods and Applications\n\n\n\n\n\n","category":"type"},{"location":"api/#ExplainabilityMethods.Gradient","page":"API Reference","title":"ExplainabilityMethods.Gradient","text":"Gradient(model)\n\nAnalyze model by calculating the gradient of a neuron activation with respect to the input.\n\n\n\n\n\n","category":"type"},{"location":"api/#ExplainabilityMethods.InputTimesGradient","page":"API Reference","title":"ExplainabilityMethods.InputTimesGradient","text":"InputTimesGradient(model)\n\nAnalyze model by calculating the gradient of a neuron activation with respect to the input. This gradient is then multiplied element-wise with the input.\n\n\n\n\n\n","category":"type"},{"location":"api/#LRP","page":"API Reference","title":"LRP","text":"","category":"section"},{"location":"api/#Rules","page":"API Reference","title":"Rules","text":"","category":"section"},{"location":"api/","page":"API Reference","title":"API Reference","text":"ZeroRule\nGammaRule\nEpsilonRule\nZBoxRule","category":"page"},{"location":"api/#ExplainabilityMethods.ZeroRule","page":"API Reference","title":"ExplainabilityMethods.ZeroRule","text":"ZeroRule()\n\nConstructor for LRP-0 rule. Commonly used on upper layers.\n\n\n\n\n\n","category":"type"},{"location":"api/#ExplainabilityMethods.GammaRule","page":"API Reference","title":"ExplainabilityMethods.GammaRule","text":"GammaRule(; γ=0.25)\n\nConstructor for LRP-γ rule. Commonly used on lower layers.\n\nArguments:\n\nγ: Optional multiplier for added positive weights, defaults to 0.25.\n\n\n\n\n\n","category":"type"},{"location":"api/#ExplainabilityMethods.EpsilonRule","page":"API Reference","title":"ExplainabilityMethods.EpsilonRule","text":"EpsilonRule(; ϵ=1f-6)\n\nConstructor for LRP-ϵ rule. Commonly used on middle layers.\n\nArguments:\n\nϵ: Optional stabilization parameter, defaults to 1f-6.\n\n\n\n\n\n","category":"type"},{"location":"api/#ExplainabilityMethods.ZBoxRule","page":"API Reference","title":"ExplainabilityMethods.ZBoxRule","text":"ZBoxRule()\n\nConstructor for LRP-z^mathcalB-rule. Commonly used on the first layer for pixel input.\n\n\n\n\n\n","category":"type"},{"location":"api/#Custom-rules","page":"API Reference","title":"Custom rules","text":"","category":"section"},{"location":"api/","page":"API Reference","title":"API Reference","text":"These utilities can be used to define custom rules without writing boilerplate code:","category":"page"},{"location":"api/","page":"API Reference","title":"API Reference","text":"modify_params\nmodify_denominator","category":"page"},{"location":"api/#ExplainabilityMethods.modify_params","page":"API Reference","title":"ExplainabilityMethods.modify_params","text":"modify_params(rule, W, b)\n\nFunction that modifies weights and biases before applying relevance propagation.\n\n\n\n\n\n","category":"function"},{"location":"api/#ExplainabilityMethods.modify_denominator","page":"API Reference","title":"ExplainabilityMethods.modify_denominator","text":"modify_denominator(rule, d)\n\nFunction that modifies zₖ on the forward pass, e.g. for numerical stability.\n\n\n\n\n\n","category":"function"},{"location":"api/#Utilities","page":"API Reference","title":"Utilities","text":"","category":"section"},{"location":"api/","page":"API Reference","title":"API Reference","text":"strip_softmax\nflatten_model","category":"page"},{"location":"api/#ExplainabilityMethods.strip_softmax","page":"API Reference","title":"ExplainabilityMethods.strip_softmax","text":"strip_softmax(model)\n\nRemove softmax activation on model output if it exists.\n\n\n\n\n\n","category":"function"},{"location":"api/#ExplainabilityMethods.flatten_model","page":"API Reference","title":"ExplainabilityMethods.flatten_model","text":"flatten_model(c)\n\nFlatten a Flux chain containing Flux chains.\n\n\n\n\n\n","category":"function"},{"location":"api/#Index","page":"API Reference","title":"Index","text":"","category":"section"},{"location":"api/","page":"API Reference","title":"API Reference","text":"","category":"page"},{"location":"generated/example/","page":"Getting started","title":"Getting started","text":"EditURL = \"https://github.com/adrhill/ExplainabilityMethods.jl/blob/master/docs/literate/example.jl\"","category":"page"},{"location":"generated/example/#Getting-started","page":"Getting started","title":"Getting started","text":"","category":"section"},{"location":"generated/example/#Preparing-the-model","page":"Getting started","title":"Preparing the model","text":"","category":"section"},{"location":"generated/example/","page":"Getting started","title":"Getting started","text":"ExplainabilityMethods.jl can be used on any classifier. In this tutorial we will be using a pretrained VGG-19 model from Metalhead.jl.","category":"page"},{"location":"generated/example/","page":"Getting started","title":"Getting started","text":"using ExplainabilityMethods\nusing Flux\nusing Metalhead\nusing Metalhead: weights\n\nvgg = VGG19()\nFlux.loadparams!(vgg, Metalhead.weights(\"vgg19\"))","category":"page"},{"location":"generated/example/","page":"Getting started","title":"Getting started","text":"warning: Pretrained weights\nThis doc page was generated using Metalhead v0.6.0. At the time you read this, Metalhead might already have implemented weight loading via VGG19(; pretrain=true), in which case loadparams! is not necessary.","category":"page"},{"location":"generated/example/","page":"Getting started","title":"Getting started","text":"In case they exist, we need to strip softmax activations from the output before analyzing:","category":"page"},{"location":"generated/example/","page":"Getting started","title":"Getting started","text":"model = strip_softmax(vgg.layers);\nnothing #hide","category":"page"},{"location":"generated/example/","page":"Getting started","title":"Getting started","text":"We also need to load an image","category":"page"},{"location":"generated/example/","page":"Getting started","title":"Getting started","text":"using Images\nusing TestImages\n\nimg = testimage(\"chelsea\")","category":"page"},{"location":"generated/example/","page":"Getting started","title":"Getting started","text":"which we can preprocess for VGG-19 using DataAugmentation.jl:","category":"page"},{"location":"generated/example/","page":"Getting started","title":"Getting started","text":"using DataAugmentation\n\n# Coefficients taken from PyTorch's ImageNet normalization code\nμ = [0.485, 0.456, 0.406]\nσ = [0.229, 0.224, 0.225]\ntransform = CenterResizeCrop((224, 224)) |> ImageToTensor() |> Normalize(μ, σ)\n\nitem = Image(img)\ninput = apply(transform, item) |> itemdata\ninput = permutedims(input, (2,1,3))[:,:,:,:] * 255; # flip X/Y axes, add batch dim. and rescale\nnothing #hide","category":"page"},{"location":"generated/example/#Calling-the-analyzer","page":"Getting started","title":"Calling the analyzer","text":"","category":"section"},{"location":"generated/example/","page":"Getting started","title":"Getting started","text":"We can now select an analyzer of our choice and call analyze to get an explanation expl:","category":"page"},{"location":"generated/example/","page":"Getting started","title":"Getting started","text":"analyzer = LRPZero(model)\nexpl, out = analyze(input, analyzer);\nnothing #hide","category":"page"},{"location":"generated/example/","page":"Getting started","title":"Getting started","text":"Finally, we can visualize the explanation through heatmapping:","category":"page"},{"location":"generated/example/","page":"Getting started","title":"Getting started","text":"heatmap(expl)","category":"page"},{"location":"generated/example/","page":"Getting started","title":"Getting started","text":"tip: Neuron selection\nTo get an explanation with respect to a specific output neuron (e.g. class 42) callexpl, out = analyze(img, analyzer, 42)","category":"page"},{"location":"generated/example/","page":"Getting started","title":"Getting started","text":"Currently, the following analyzers are implemented:","category":"page"},{"location":"generated/example/","page":"Getting started","title":"Getting started","text":"├── Gradient\n├── InputTimesGradient\n└── LRP\n    ├── LRPZero\n    ├── LRPEpsilon\n    └── LRPGamma","category":"page"},{"location":"generated/example/#Custom-composites","page":"Getting started","title":"Custom composites","text":"","category":"section"},{"location":"generated/example/","page":"Getting started","title":"Getting started","text":"If our model is a \"flat\" chain of Flux layers, we can assign LRP rules to each layer individually. For this purpose, ExplainabilityMethods exports the method flatten_model:","category":"page"},{"location":"generated/example/","page":"Getting started","title":"Getting started","text":"model = flatten_model(model)","category":"page"},{"location":"generated/example/","page":"Getting started","title":"Getting started","text":"warning: Flattening models\nNot all models can be flattened, e.g. those using Parallel and SkipConnection layers.","category":"page"},{"location":"generated/example/","page":"Getting started","title":"Getting started","text":"Now we set a rule for each layer","category":"page"},{"location":"generated/example/","page":"Getting started","title":"Getting started","text":"rules = [\n    ZBoxRule(),\n    repeat([GammaRule()], 15)...,\n    repeat([ZeroRule()], length(model) - 16)...\n]","category":"page"},{"location":"generated/example/","page":"Getting started","title":"Getting started","text":"and define a custom LRP analyzer:","category":"page"},{"location":"generated/example/","page":"Getting started","title":"Getting started","text":"analyzer = LRP(model, rules)\nexpl, out = analyze(input, analyzer)\nheatmap(expl)","category":"page"},{"location":"generated/example/#Custom-rules","page":"Getting started","title":"Custom rules","text":"","category":"section"},{"location":"generated/example/","page":"Getting started","title":"Getting started","text":"Let's define a rule that modifies the weights and biases of our layer on the forward pass. The rule has to be of type AbstractLRPRule.","category":"page"},{"location":"generated/example/","page":"Getting started","title":"Getting started","text":"struct MyCustomLRPRule <: AbstractLRPRule end","category":"page"},{"location":"generated/example/","page":"Getting started","title":"Getting started","text":"It is then possible to dispatch on the utility functions  modify_params and modify_denominator with our rule type MyCustomLRPRule to define custom rules without writing boilerplate code.","category":"page"},{"location":"generated/example/","page":"Getting started","title":"Getting started","text":"function modify_params(::MyCustomLRPRule, W, b)\n    ρW = W + 0.1 * relu.(W)\n    return ρW, b\nend","category":"page"},{"location":"generated/example/","page":"Getting started","title":"Getting started","text":"We can directly use this rule to make an analyzer!","category":"page"},{"location":"generated/example/","page":"Getting started","title":"Getting started","text":"analyzer = LRP(model, MyCustomLRPRule())\nexpl, out = analyze(input, analyzer)\nheatmap(expl)","category":"page"},{"location":"generated/example/","page":"Getting started","title":"Getting started","text":"tip: Pull requests welcome\nIf you implement a rule that's not included in ExplainabilityMethods, please make a PR to src/lrp_rules.jl!","category":"page"},{"location":"generated/example/","page":"Getting started","title":"Getting started","text":"","category":"page"},{"location":"generated/example/","page":"Getting started","title":"Getting started","text":"This page was generated using Literate.jl.","category":"page"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = ExplainabilityMethods","category":"page"},{"location":"#ExplainabilityMethods.jl","page":"Home","title":"ExplainabilityMethods.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Explainable AI in Julia using Flux.jl.","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"To install this package and its dependencies, open the Julia REPL and run ","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> ]add ExplainabilityMethods","category":"page"}]
}
