var documenterSearchIndex = {"docs":
[{"location":"guide/#Defining-traits-1","page":"User Guide","title":"Defining traits","text":"","category":"section"},{"location":"guide/#The-@trait-macro-1","page":"User Guide","title":"The @trait macro","text":"","category":"section"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"You can define a new trait using the @trait macro. The syntax is described below:","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"@trait <TraitName> [as <SuperType>] [prefix <Can>,<Cannot>] [with <Trait1>,<Trait2>,...]","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"<TraitName>: an abstract type is defined with the same name\n<SuperType>: optional super-type of the trait's abstract type\n<Can> and <Cannot>: words that indicate whether a data type exhibits the trait or not\n<Trait1>, <Trait2>, etc. can be specified to define composite traits.","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"The as-clause, prefix-clause, and with-clause are all optional.","category":"page"},{"location":"guide/#Specifying-super-type-for-trait-1","page":"User Guide","title":"Specifying super-type for trait","text":"","category":"section"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"The as-clause is used to specify the super-type of the trait type. If the clause is missing, the super-type is defaulted to Any. This may be useful when you want to group a set of traits under the same hierarchy.  For example:","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"abstract type Ability end\n@trait Fly as Ability\n@trait Swim as Ability","category":"page"},{"location":"guide/#Using-custom-prefixes-1","page":"User Guide","title":"Using custom prefixes","text":"","category":"section"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"When you define a trait using verbs like Fly or Swim in the above, it makes sense to define trait types with Can and Cannot prefixes.  But, what if you want to define a trait using a noun or an adjective? In that case, you can define your trait with the prefix-clause. For example:","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"@trait Iterable prefix Is,Not","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"Alternative, there are predefined trait prefixes from the BinaryTraits.Prefix sub-module. They are listed below for your convenience:","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"Trait prefixes as aliases of Positive:","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"Can\nHas\nIs","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"Traits prefixes as aliases of Negative:","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"Cannot\nNo\nNot\nIsNot","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"You may just import the pre-defined prefixes as you see fit.  The prefixes are","category":"page"},{"location":"guide/#Making-composite-traits-1","page":"User Guide","title":"Making composite traits","text":"","category":"section"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"Sometimes we really want to compose traits and use a single one directly for dispatch.  In that case, we can just use the with-clause like this:","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"@trait FlySwim with Can{Fly}, Can{Swim}","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"This above syntax would define a new trait where it assumes the positive side of the traits Fly and Swim.","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"A less common usage is to create trait types can is composed of both positive and negative traits.  Hence, you can define something like this:","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"@trait SeaCreature with Can{Swim},Cannot{Fly}","category":"page"},{"location":"guide/#Assigning-traits-to-types-1","page":"User Guide","title":"Assigning traits to types","text":"","category":"section"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"Once you define your favorite traits, you may assign any data type to any traits. The syntax of the assignment is as follows:","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"@assign <Type> with <Trait1>,<Trait2>,...","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"You can assign a data type with 1 or more positive (or negative) trait types in a single statement:","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"struct Crane end\n@assign Crane with Can{Fly},Can{Swim}","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"Doing such assignment allows us to enforce interface contracts as you will see in the next section.","category":"page"},{"location":"guide/#Specifying-interfaces-1","page":"User Guide","title":"Specifying interfaces","text":"","category":"section"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"A ver useful feature of BinaryTraits is to define formal interfaces.  Currently, Julia does not come with any facility to specify interface contracts.  The users are expected to look up interface definitions from documentations and make sure that they implement those contracts per documentation accordingly.","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"This package provides additional machinery for users to formally define interfaces. It also comes with a macro for verifying the validity of data type implementations.","category":"page"},{"location":"guide/#Formal-interface-contracts-1","page":"User Guide","title":"Formal interface contracts","text":"","category":"section"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"Once you have defined a trait, you may define a set of interface contracts that a data type must implement in order to exhibit that trait.  These contracts are registered in the BinaryTraits system using the @implement macro. The syntax of @implement is as follows:","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"@implement Positive{<Trait>} by <FunctionSignature>\n@implement Negative{<Trait>} by <FunctionSignature>","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"In general, the first form is what one normally use.  You are basically telling the system that a data type that exhibits the Trait must implement a function that is given the the <FunctionSignature>.","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"The words Positive and Negative are the standard parametric types for specifying the direction of the trait.  Alternatively, you may use the custom prefixes that you defined from the @trait macro.","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"Here are some examples:","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"@implement Can{Fly} by liftoff(_)\n@implement Can{Fly} by fly(_, direction::Float64, altitude::Float64)\n@implement Can{Fly} by speed(_)::Float64","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"The underscore _ is a special syntax where you can indicate which positional argument you want to pass an object to the function.  The object is expected to have a type that is assigned to the Fly trait.","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"When return type is not specified, it is default to Any.","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"note: Note\nThe underscore may be placed at any argument position although it is quite common to leave it as the first argument.","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"note: Note\nIf you have multiple underscores, then the semantic is such that they are all of the same type.  For example, two ducks may exhibits a Playful trait and a play(_, _) interface expects an implementation of play(::Duck, ::Duck).","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"Although not as common, it is also possible to use the negative part of the trait e.g. Cannot{Fly} for interface specification.","category":"page"},{"location":"guide/#Implementing-interface-contracts-1","page":"User Guide","title":"Implementing interface contracts","text":"","category":"section"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"A data type that is assigned to a trait should implement all interface contracts. From the previous section, we established three contracts for the Fly trait - liftoff, fly, and speed. To satisfy those contracts, we must implement those functions.","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"For example, let's say we are defining a Bird type that exhibits Fly trait, we can implement the following contracts:","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"abstract type Animal end\nstruct Bird <: Animal end\n@assign Bird with Can{Fly}\n\n# implmementation of Can{Fly} contracts\nliftoff(bird::Bird) = \"Hoo hoo!\"\nfly(bird::Bird, direction::Float64, altitude::Float64) = \"Getting there!\"\nspeed(bird::Bird) = 10.0","category":"page"},{"location":"guide/#Using-Holy-Traits-pattern-1","page":"User Guide","title":"Using Holy Traits pattern","text":"","category":"section"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"Here, we implement the contracts directly with the specific concrete type. What if you have multiple types that satisfy the same trait. Holy Trait comes to rescue:","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"liftoff(x::T) where {T <: Animal} = liftoff(trait(Fly, T), x)\nliftoff(::Can{Fly}, x) = \"Hi ho!\"\nliftoff(::Cannot{Fly}, x) = \"baaa!\"","category":"page"},{"location":"guide/#Variance-1","page":"User Guide","title":"Variance","text":"","category":"section"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"When you specify abstract types in the interface contracts, the argument types are contra-variant and return type is covariant.  In simple terms, a function that satisfies the contract may have:","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"argument types that are super-types of the types specified in the contract\nreturn type that is a subtype of the return type specified in the contract","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"For example, consider the following contract:","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"accelerate(_, ::AbstractFloat)::AbstractFloat","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"Then, the function below adheres to the contract because it can take any Number argument, which includes AbstractFloat.  Likewise, it returns a subtype of AbstractFloat and the caller of this interface should happily accept the result.","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"accelerate(::Bird, ::Number) = 4.5","category":"page"},{"location":"guide/#Validating-a-type-against-its-interfaces-1","page":"User Guide","title":"Validating a type against its interfaces","text":"","category":"section"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"The reason for spending so much effort in specifying interface contracts is so that we have a high confidence about our code.  Julia is a dynamic system and so generally speaking we do not have any static type checking in place. BinaryTraits now gives you that capability.","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"The @check macro can be used to verify whether your data type has fully implemented its assigned traits and respective interface contracts.  The usage is embarrassingly simple.  You can just call the @check macro with the data type:","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"julia> @check(Bird)\n✅ Bird has no interface contract requirements.","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"The @check macro returns an InterfaceReview object, which gives you the validation result.  The warnings are generated so that it comes up in the log file. The string representation of the InterfaceReview object is designed to clearly show you what has been implemented and what's not.","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"note: Note\nWhen you define composite traits, all contracts from the underlying traits must be implemented as well.  If you have a FlySwim trait, then all contracts specified for Can{Fly} and Can{Swim} are required even though you have not added any new contracts for Can{FlySwim}.","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"note: Note\nOne way to utilize the @check macro is to put that in your module's __init__ function so that it is verified before the package is used.  Another option is to do that in your test suite and so it will be run every single time.","category":"page"},{"location":"guide/#Notes-for-framework-providers-1","page":"User Guide","title":"Notes for framework providers","text":"","category":"section"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"BinaryTraits is designed to allow one module to define traits and interfaces and have other modules implementing them.  For example, it should be possible for Tables.jl to define traits for row-oriented tables and column-oriented tables and the respective required interface functions, and then have its integrations participate in the same traits system.","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"In order to facilitate interaction between modules, BinaryTraits requires the framework provider (e.g. Tables.jl in the example above) to add the following code in its __init__ function:","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"function __init__()\n    init_traits(@__MODULE__)\nend","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"This additional step allows framework provider to register their traits and interface contracts at a central location. The integration packages can then verify their implementation against the interface at this same location.","category":"page"},{"location":"guide/#Summary-1","page":"User Guide","title":"Summary","text":"","category":"section"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"BinaryTraits is designed to fill the language gap as related to the lack of a formal traits and interface system.","category":"page"},{"location":"guide/#","page":"User Guide","title":"User Guide","text":"The ability to design software with traits and interfaces and the ability to verify software for conformance to established interface contracts are highly desirable for professional software development projects.","category":"page"},{"location":"concepts/#Traits-1","page":"Concepts","title":"Traits","text":"","category":"section"},{"location":"concepts/#","page":"Concepts","title":"Concepts","text":"A trait is defined as an abstract type that is used in the parametric types BinaryTrait, Positive, and Negative. You may assign any data type to the positive/negative trait type.","category":"page"},{"location":"concepts/#","page":"Concepts","title":"Concepts","text":"For the sake of readability, there are predefined aliases to Positive and Negative types. For example, Can is the same type as Positive.  See Using custom prefixes for more information.","category":"page"},{"location":"concepts/#","page":"Concepts","title":"Concepts","text":"(Image: defining traits)","category":"page"},{"location":"concepts/#Interface-Contracts-1","page":"Concepts","title":"Interface Contracts","text":"","category":"section"},{"location":"concepts/#","page":"Concepts","title":"Concepts","text":"The positive side of a trait is usually associated with a set of interface contracts.","category":"page"},{"location":"concepts/#","page":"Concepts","title":"Concepts","text":"(Image: interface contracts)","category":"page"},{"location":"concepts/#Composite-Traits-1","page":"Concepts","title":"Composite Traits","text":"","category":"section"},{"location":"concepts/#","page":"Concepts","title":"Concepts","text":"A composite trait is one that exhibits the characteristics of all of its underlying traits.  The underlying interface contracts are applicable as well.","category":"page"},{"location":"concepts/#","page":"Concepts","title":"Concepts","text":"(Image: composite traits)","category":"page"},{"location":"design/#Basic-machinery-1","page":"Under the hood","title":"Basic machinery","text":"","category":"section"},{"location":"design/#","page":"Under the hood","title":"Under the hood","text":"The machinery is extremely simple. When you define a traits like @trait Fly, it literally expands to the following code:","category":"page"},{"location":"design/#","page":"Under the hood","title":"Under the hood","text":"abstract type Fly end\ntrait(::Type{Fly}, T::Type) = Negative{Fly}()\nis_trait(::Type{Fly}) = true","category":"page"},{"location":"design/#","page":"Under the hood","title":"Under the hood","text":"As you can see, a new abstract type called  Fly is automatically generated. By default, the trait function just returns an instance of Negative{Fly}.  Now, when you do @assign Duck with Can{Fly},Can{Swim}, it is expanded to the following:","category":"page"},{"location":"design/#","page":"Under the hood","title":"Under the hood","text":"trait(::Type{Fly}, ::Type{<:Duck}) = Can{Fly}()\ntrait(::Type{Swim}, ::Type{<:Duck}) = Can{Swim}()","category":"page"},{"location":"design/#","page":"Under the hood","title":"Under the hood","text":"note: Note\nThere are several aliases defined for the Positive parametric type e.g. Can, Has, and Is.  See BinaryTraits.Prefix sub-module for the complete list of aliases.  The aliases are not exported by default, and you are expected to import only the ones that you need.","category":"page"},{"location":"design/#Composite-traits-1","page":"Under the hood","title":"Composite traits","text":"","category":"section"},{"location":"design/#","page":"Under the hood","title":"Under the hood","text":"Making composite traits is slightly more interesting.  It creates a new trait by combining multiple traits together.  Having a composite trait is defined as one that exhibits all of the underlying traits.  Hence, @trait FlySwim with Can{Fly},Can{Swim} would be translated to the following:","category":"page"},{"location":"design/#","page":"Under the hood","title":"Under the hood","text":"abstract type FlySwim end\n\nfunction trait(::Type{FlySwim}, T::Type)\n    if trait(Fly,T) === Can{Fly}() && trait(Swim,T) === Can{Swim}()\n        Positive{FlySwim}()\n    else\n        Negative{FlySwim}()\n    end\nend\n\nis_trait(::Type{FlySwim}) = true","category":"page"},{"location":"design/#Turning-on-verbose-mode-1","page":"Under the hood","title":"Turning on verbose mode","text":"","category":"section"},{"location":"design/#","page":"Under the hood","title":"Under the hood","text":"If you feel this package is a little too magical, don't worry.  To make things more transparent, you can turn on verbose mode.  All macro expansions are then displayed automatically.","category":"page"},{"location":"design/#","page":"Under the hood","title":"Under the hood","text":"julia> BinaryTraits.set_verbose!(true)\ntrue\n\njulia> @trait Iterable\n┌ Info: Generated code\n│   code =\n│    quote\n│        abstract type Iterable <: Any end\n│        BinaryTraits.trait(::Type{Iterable}, T::Type) = begin\n│                Negative{Iterable}()\n│            end\n│        BinaryTraits.is_trait(::Type{Iterable}) = begin\n│                true\n│            end\n│        nothing\n└    end","category":"page"},{"location":"reference/#","page":"Reference","title":"Reference","text":"This page contains the most important macros, functions, and types that you should be aware of.","category":"page"},{"location":"reference/#Macros-1","page":"Reference","title":"Macros","text":"","category":"section"},{"location":"reference/#","page":"Reference","title":"Reference","text":"@trait\n@assign\n@implement\n@check","category":"page"},{"location":"reference/#BinaryTraits.@trait","page":"Reference","title":"BinaryTraits.@trait","text":"@trait <name> [as <category>] [prefix <positive>,<negative>] [with <trait1,trait2,...>]\n\nCreate a new trait type for name called $(name)Trait:\n\nIf the as clause is provided, then category (an abstract type) will be used as the super type of the trait type.\nIf the prefix clause is provided, then it allows the user to choose different prefixes than the default ones (Can and Cannot) e.g. prefix Is,Not or prefix Has,Not.\nIf the with clause is provided, then it defines a composite trait from existing traits.\n\nNote that you must specify at least 2 traits to make a composite trait.\n\n\n\n\n\n","category":"macro"},{"location":"reference/#BinaryTraits.@assign","page":"Reference","title":"BinaryTraits.@assign","text":"@assign <T> with <trait1, trait2, ...>\n\nAssign traits to the data type T.  The traits may be positive or negative e.g. Can{Fly} or Cannot{Swim}.\n\n\n\n\n\n","category":"macro"},{"location":"reference/#BinaryTraits.@implement","page":"Reference","title":"BinaryTraits.@implement","text":"@implement <trait> by <sig>\n\nRegister a new interface contract as specified by sig for the specified trait.\n\nYou can use the @check function to verify your implementation after these interface contracts are registered.  The signature may use an underscore to indicate a placeholder for the data type that exihibits the trait.  Return type is currently optional and unchecked.\n\n\n\n\n\n","category":"macro"},{"location":"reference/#BinaryTraits.@check","page":"Reference","title":"BinaryTraits.@check","text":"@check(T::Assignable)\ncheck(module::Module, T::Assignable)\n\nCheck if the data type T has fully implemented all trait functions that it was previously assigned. See also: @assign.\n\n\n\n\n\n","category":"macro"},{"location":"reference/#Functions-1","page":"Reference","title":"Functions","text":"","category":"section"},{"location":"reference/#","page":"Reference","title":"Reference","text":"traits\nis_trait\nrequired_contracts\ninit_traits\nBinaryTraits.set_verbose!","category":"page"},{"location":"reference/#BinaryTraits.traits","page":"Reference","title":"BinaryTraits.traits","text":"traits(m::Module, T::Assignable)\n\nReturns a set of traits that the data type T exhibits, including the ones that were assigned to any supertypes of T. See also @assign.\n\n\n\n\n\n","category":"function"},{"location":"reference/#BinaryTraits.is_trait","page":"Reference","title":"BinaryTraits.is_trait","text":"is_trait(x)\n\nReturn true if x is a trait type.\n\n\n\n\n\n","category":"function"},{"location":"reference/#BinaryTraits.required_contracts","page":"Reference","title":"BinaryTraits.required_contracts","text":"required_contracts(module::Module, T::Assignable)\n\nReturn a set of contracts that is required to be implemented for the provided type T.\n\n\n\n\n\n","category":"function"},{"location":"reference/#BinaryTraits.init_traits","page":"Reference","title":"BinaryTraits.init_traits","text":"init_traits(module::Module)\n\nThis function should be called like init_traits(@__MODULE__) inside the __init__()' method of each module usingBinaryTraits`.\n\nAlternatively it can be called outside the module this way: using Module; init_traits(Module), if Module missed to call it within its __init__ function.\n\nThis is required only if the traits/interfaces are expected to be shared across modules.\n\n\n\n\n\n","category":"function"},{"location":"reference/#BinaryTraits.set_verbose!","page":"Reference","title":"BinaryTraits.set_verbose!","text":"set_verbose!(flag::Bool)\n\nFor debugging - set flag to print macro expansions\n\n\n\n\n\n","category":"function"},{"location":"reference/#Types-1","page":"Reference","title":"Types","text":"","category":"section"},{"location":"reference/#","page":"Reference","title":"Reference","text":"BinaryTraits.Assignable\nBinaryTraits.Contract\nBinaryTraits.InterfaceReview","category":"page"},{"location":"reference/#BinaryTraits.Assignable","page":"Reference","title":"BinaryTraits.Assignable","text":"Assignable\n\nAssignable represents any data type that can be associated with traits. It essentially covers all data types including parametric types e.g. AbstractArray\n\n\n\n\n\n","category":"constant"},{"location":"reference/#BinaryTraits.Contract","page":"Reference","title":"BinaryTraits.Contract","text":"Contract{T <: DataType, F <: Function, N}\n\nA contract refers to a function defintion func that is required to satisfy a trait. The function func must accepts args and returns ret.\n\nFields\n\ntrait: a trait type e.g. Can{Fly} or Cannot{Fly}\nfunc: function that must be implemented to satisfy this trait\nargs: argument types of the function func\nkwargs: keyword argument names of the function func\nret: return type of the function func\n\n\n\n\n\n","category":"type"},{"location":"reference/#BinaryTraits.InterfaceReview","page":"Reference","title":"BinaryTraits.InterfaceReview","text":"InterfaceReview\n\nAn InterfaceReview object contains the validation results of an interface.\n\nFields\n\ndata_type: the type being checked\nresult: true if the type fully implements all required contracts\nimplemented: an array of implemented contracts\nmisses: an array of unimplemented contracts\n\n\n\n\n\n","category":"type"},{"location":"#","page":"Motivation","title":"Motivation","text":"The project home page is located at https://github.com/tk3369/BinaryTraits.jl.","category":"page"},{"location":"#","page":"Motivation","title":"Motivation","text":"Every motivation starts with an example.  In this page, we cover the following tasks:","category":"page"},{"location":"#","page":"Motivation","title":"Motivation","text":"Defining traits\nAssigning data types with traits\nSpecifying an interface for traits\nChecking if a data type fully implements all contracts from its traits\nApplying Holy Traits pattern","category":"page"},{"location":"#Example:-tickling-a-duck-and-a-dog-1","page":"Motivation","title":"Example: tickling a duck and a dog","text":"","category":"section"},{"location":"#","page":"Motivation","title":"Motivation","text":"Suppose that we are modeling the ability of animals.  So we can define traits as follows:","category":"page"},{"location":"#","page":"Motivation","title":"Motivation","text":"using BinaryTraits\nabstract type Ability end\n@trait Swim as Ability\n@trait Fly as Ability","category":"page"},{"location":"#","page":"Motivation","title":"Motivation","text":"Consider the following animal types. We can assign them traits quite easily:","category":"page"},{"location":"#","page":"Motivation","title":"Motivation","text":"using BinaryTraits.Prefix: Can, Cannot       # use custom trait prefixes\n\nstruct Dog end\nstruct Duck end\n@assign Dog with Can{Swim}\n@assign Duck with Can{Swim},Can{Fly}","category":"page"},{"location":"#","page":"Motivation","title":"Motivation","text":"Next, how do you dispatch by traits?  Just follow the Holy Trait pattern:","category":"page"},{"location":"#","page":"Motivation","title":"Motivation","text":"tickle(x::T) where T = tickle(trait(Fly, T), trait(Swim, T), x)\ntickle(::Can{Fly}, ::Can{Swim}, x) = \"Flying high and diving deep\"\ntickle(::Can{Fly}, ::Cannot{Swim}, x) = \"Flying away\"\ntickle(::BinaryTrait{Fly}, ::BinaryTrait{Swim}, x) = \"Stuck laughing\"","category":"page"},{"location":"#","page":"Motivation","title":"Motivation","text":"Voila!","category":"page"},{"location":"#","page":"Motivation","title":"Motivation","text":"julia> tickle(Dog())\n\"Stuck laughing\"\n\njulia> tickle(Duck())\n\"Flying high and diving deep\"","category":"page"},{"location":"#Working-with-interfaces-1","page":"Motivation","title":"Working with interfaces","text":"","category":"section"},{"location":"#","page":"Motivation","title":"Motivation","text":"What if we want to enforce an interface? e.g. animals that can fly must implement a fly method.  We can define that interface as follows:","category":"page"},{"location":"#","page":"Motivation","title":"Motivation","text":"@implement Can{Fly} by fly(_, direction::Float64, altitude::Float64)","category":"page"},{"location":"#","page":"Motivation","title":"Motivation","text":"The underscore character is used to indicate how an object should be passed to the fly function.","category":"page"},{"location":"#","page":"Motivation","title":"Motivation","text":"Then, to make sure that our implementation is correct, we can use the @check macro as shown below:","category":"page"},{"location":"#","page":"Motivation","title":"Motivation","text":"julia> @check(Duck)\n┌ Warning: Missing implementation\n│   contract = BinaryTrait{Fly}: Positive{Fly} ⇢ fly(🔹, ::Float64, ::Float64)::Any\n└ @ BinaryTraits ~/.julia/dev/BinaryTraits.jl/src/interface.jl:59\n❌ Duck is missing these implementations:\n1. BinaryTrait{Fly}: Positive{Fly} ⇢ fly(🔹, ::Float64, ::Float64)::Any","category":"page"},{"location":"#","page":"Motivation","title":"Motivation","text":"Now, let's implement the method and check again:","category":"page"},{"location":"#","page":"Motivation","title":"Motivation","text":"julia> fly(duck::Duck, direction::Float64, altitude::Float64) = \"Having fun!\"\n\njulia> @check(Duck)\n✅ Duck has implemented:\n1. BinaryTrait{Fly}: Positive{Fly} ⇢ fly(🔹, ::Float64, ::Float64)::Any","category":"page"},{"location":"#Applying-Holy-Traits-Pattern-1","page":"Motivation","title":"Applying Holy Traits Pattern","text":"","category":"section"},{"location":"#","page":"Motivation","title":"Motivation","text":"If we would just implement interface contracts directly on concrete types then it can be too specific for what it is worth.  If we have 100 flying animals, we shouldn't need to define 100 interface methods for the 100 concrete types.","category":"page"},{"location":"#","page":"Motivation","title":"Motivation","text":"That's how Holy Traits pattern kicks in.  Rather than implementing the fly method for Duck as shown in the previous section, we could have implemented the following functions instead:","category":"page"},{"location":"#","page":"Motivation","title":"Motivation","text":"fly(x::T, direction::Float64, altitude::Float64) where T = fly(trait(Fly, T), x, direction, altitude)\nfly(::Can{Fly}, x, direction::Float64, altitude::Float64) = \"Having fun!\"\nfly(::Cannot{Fly}, x, direction::Float64, altitude::Float64) = \"Too bad...\"","category":"page"},{"location":"#","page":"Motivation","title":"Motivation","text":"The first function determines whether the object exhibits Can{Fly} or Cannot{Fly} trait and dispatch to the proper function. We did not specify the type of the x argument but in reality if we are dealing with the animal kingdom only then we can define an abstract type Animal and qualify that in there where-clause as in where {T <: Animal>}.","category":"page"}]
}
