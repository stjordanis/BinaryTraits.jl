# used for display purpose only
const TYPE_PLACEHOLDER = "::<Type>"

"""
    traits_map

The `traits_map` maps a data type to the Can-type of the asigned traits.

For example, the `Duck` and `Dog` types and then assign them with `Fly`
and `Swim` traits.  The map would look like this:

```julia
julia> BinaryTraits.traits_map
Dict{Union{DataType, UnionAll},Set{DataType}} with 2 entries:
  Dog  => Set(DataType[CanSwim])
  Duck => Set(DataType[CanSwim, CanFly])
```
"""
const traits_map = Dict{Assignable,Set{DataType}}()

"""
    traits(T::Assignable)

Returns a set of Can-types that the data type `T` exhibits.
See also [`@assign`](@ref).
"""
function traits(T::Assignable)
    return get!(traits_map, T, Set{DataType}())
end


"""
    assign(T::Assignable, can_type::DataType)

Assign data type `T` with the specified Can-type of a trait.
"""
function assign(T::Assignable, can_type::DataType)
    traits_set = get!(traits_map, T, Set{DataType}())
    push!(traits_set, can_type)
    return nothing
end

# Managing interface contracts

"""
    Contract{T <: DataType, F <: Function, N}

A contract refers to a function defintion `func` that is required to satisfy
the Can-type of a trait. The function `func` must accepts `args` and returns `ret`.

# Fields
- `can_type`: can-type of a trait e.g. `CanFly`
- `func`: function that must be implemented to satisfy this trait
- `args`: arguments of the function `func`
- `ret`: return type of the function `func`
"""
struct Contract{T <: DataType, F <: Function, N}
    can_type::T
    func::F
    args::NTuple{N, DataType}
    ret::Union{DataType,Nothing}
end

function Base.show(io::IO, c::Contract)
    type = Symbol(TYPE_PLACEHOLDER)
    args = "(" * join([type, c.args...], ", ::") * ")"
    trait = supertype(c.can_type)
    print(io, "$(trait): $(c.can_type) ⇢ $(c.func)$(args)")
    c.ret !== nothing && print(io, "::$(c.ret)")
end

"""
    interface_map

The `interface_map` maps a data type to a set of Contracts.
"""
const interface_map = Dict{DataType,Set{Contract}}()

"""
    register(can_type::DataType, func::Function, args::NTuple{N,DataType}, ret::DataType) where N

Register a function `func` with the specified `can_type` type.
The `func` is expected to take arguments `args` and return
a value of type `ret`.
"""
function register(can_type::DataType,
                  func::Function,
                  args::NTuple{N,DataType},
                  ret::Union{DataType,Nothing} = nothing) where N
    contracts = get!(interface_map, can_type, Set{Contract}())
    push!(contracts, Contract(can_type, func, args, ret))
    return nothing
end

"""
    contracts(can_type::DataType)

Returns a set of Contracts that are required to be implemented
for `can_type`.
"""
function contracts(can_type::DataType)
    current_contracts = get(interface_map, can_type, Set{Contract}())
    if haskey(composite_traits, can_type)
        contracts_array = contracts.(composite_traits[can_type])
        @debug "after recusion" contracts_array
        underlying_contracts = union(contracts_array...)
        @debug "combining" current_contracts underlying_contracts
        return union(current_contracts, underlying_contracts)
    else
        @debug "returning" current_contracts
        return current_contracts
    end
end

"""
    InterfaceReview

An InterfaceReview object contains the validation results of an interface.

# Fields
- `type`: the type being checked
- `result`: true if the type fully implements all required contracts
- `implemented`: an array of implemented contracts
- `misses`: an array of unimplemented contracts
"""
@Base.kwdef struct InterfaceReview
    type::Assignable
    result::Bool
    implemented::Vector{Contract}
    misses::Vector{Contract}
end

function Base.show(io::IO, ir::InterfaceReview)
    T = InterfaceReview
    if length(ir.implemented) == length(ir.misses) == 0
        print(io, "✅ $(ir.type) has no interface contract requirements.")
    end
    if length(ir.implemented) > 0
        println(io, "✅ $(ir.type) has implemented:")
        for (i, c) in enumerate(ir.implemented)
            println(io, "$(i). $c")
        end
    end
    if length(ir.misses) > 0
        println(io, "❌ $(ir.type) is missing these implementations:")
        for (i, c) in enumerate(ir.misses)
            println(io, "$(i). $c")
        end
    end
end

"""
    check(T::Assignable)

Check if the data type `T` has fully implemented all trait functions that it was
previously assigned.  See also: [`@assign`](@ref).
"""
function check(T::Assignable)
    all_good = true
    implemented_contracts = Contract[]
    missing_contracts = Contract[]
    for can_type in traits(T)
        for c in contracts(can_type)
            tuple_type = Tuple{T, c.args...}
            method_exists = hasmethod(c.func, tuple_type)
            sig = replace("$c", TYPE_PLACEHOLDER => "::$T")
            if method_exists
                push!(implemented_contracts, c)
            else
                @warn "Missing implementation: $sig"
                all_good = false
                push!(missing_contracts, c)
            end
        end
    end
    return InterfaceReview(type = T, result = all_good,
                implemented = implemented_contracts,
                misses = missing_contracts)
end

"""
    required_contracts(T::Assignable)

Return a set of contracts that is required to be implemented for
the provided type `T`.
"""
function required_contracts(T::Assignable)
    c = [contracts(t) for t in traits(T)]  # returns array of set of contracts
    return union(c...)
end

"""
    @implement <CanType> by <FunctionSignature>

Register function signature for the specified `CanType` of a trait.
You can use the [`check`](@ref) macro to verify your implementation
after these interface contracts are registered.  The function
signature only needs to specify required arguments other than
the object itself.  Also, return type is optional and in that case
it will be ignored by the interface checker.

For examples:
```julia
@implement CanFly by fly(direction::Direction, speed::Float64)
@implement CanFly by has_wings()::Bool
```

The data types that exhibit those `CanFly` traits must implement
the function signature with the addition of an object as first
argument i.e.

```julia
fly(duck::Duck, direction::Direction, speed::Float64)
has_wings(duck::Duck)::Bool
```
"""
macro implement(can_type, by, sig)

    func_name, func_arg_names, func_arg_types, return_type =
        parse_implement(can_type, by, sig)
    # @info "sig" func_name func_arg_names func_arg_types

    # generate code
    expr = quote
        function $func_name end
        BinaryTraits.register($can_type, $func_name,
            ($(func_arg_types...),), $return_type)
    end
    display_expanded_code(expr)
    return esc(expr)
end

# Parsing function for @implement macro
function parse_implement(can_type, by, sig)
    usage = "Invalid @implement usage."
    if !(can_type isa Symbol) || by !== :by || !(sig isa Expr)
        throw(SyntaxError(usage))
    end

    # Is return type specified?
    has_return_type = sig.head == Symbol("::")
    if has_return_type
        return_type = sig.args[2]
        sig = sig.args[1]
    else
        return_type = :Any
    end

    # TODO should we use @assert here?
    @assert sig isa Expr
    @assert sig.head === :call

    # parse signature
    func_name = sig.args[1]   # must be Symbol
    func_arg_names = Symbol[]
    func_arg_types = Symbol[]
    for (idx, x) in enumerate(sig.args[2:end])  # x must be Expr of 1 or 2 symbols
        @assert x isa Expr
        @assert x.head == Symbol("::")
        @assert x.args |> length in [1,2]
        if length(x.args) == 1
            push!(func_arg_names, Symbol("x$idx"))
            push!(func_arg_types, x.args[1])
        else
            push!(func_arg_names, x.args[1])
            push!(func_arg_types, x.args[2])
        end
    end

    return (func_name, func_arg_names, func_arg_types, return_type)
end