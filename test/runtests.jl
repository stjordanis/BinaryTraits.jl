# This test is done within a module to ensure proper namespace
module TestModule
    using BinaryTraits
    using Test

    abstract type Ability end
    @trait Swim as Ability
    @trait Fly as Ability

    struct Dog end
    struct Duck end

    @assign Dog with Swim
    @assign Duck with Swim, Fly

    # basic usage
    tickle(x) = tickle(flytrait(x), swimtrait(x), x)
    tickle(::CanFly, ::CanSwim, x) = "Flying high and diving deep"
    tickle(::CanFly, ::CannotSwim, x) = "Flying away"
    tickle(::Ability, ::Ability, x) = "Stuck laughing"

    # composite trait
    @traitgroup FlySwim with Fly,Swim
    spank(x) = spank(flyswimtrait(x), x)
    spank(::CanFlySwim, x) = "Flying high and diving deep"
    spank(::CannotFlySwim, x) = "Too bad"

    function check()
        let dog = Dog(), duck = Duck()
            @test flytrait(dog) === CannotFly()
            @test swimtrait(dog) === CanSwim()

            @test flytrait(duck) === CanFly()
            @test swimtrait(duck) === CanSwim()

            @test tickle(dog) == "Stuck laughing"
            @test tickle(duck) == "Flying high and diving deep"

            @test spank(dog) == "Too bad"
            @test spank(duck) == "Flying high and diving deep"
        end
    end
end # module

using Test
using .TestModule

@testset "BinaryTraits.jl" begin
    TestModule.check()
end
