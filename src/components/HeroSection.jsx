import React from 'react'
import CountUp from 'react-countup'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <main className="grid grid-cols-1 gap-2 place-items-center min-h-[80vh] text-black heroImg px-4 py-8">
      <div className="container mx-auto lg:max-w-7xl w-full">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-7 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold lg:text-6xl lg:font-extrabold leading-tight">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </h1>

            <p className="text-base sm:text-lg max-w-2xl mx-auto md:mx-0">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </p>
            <div className="flex justify-center md:justify-start">
              <Link
                to="/products"
                className="btn btn-neutral uppercase w-full sm:w-fit px-6 sm:px-8 rounded-3xl"
              >
                shop now
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-4">
              <div className="text-center">
                <CountUp
                  start={0}
                  end={200}
                  duration={3}
                  suffix="+"
                  className="text-3xl sm:text-4xl font-bold flex flex-col"
                />
                <p className="text-base sm:text-lg">International Brands</p>
              </div>
              <div className="text-center">
                <CountUp
                  start={0}
                  end={2000}
                  duration={2.75}
                  suffix="+"
                  className="text-3xl sm:text-4xl font-bold flex flex-col"
                />
                <p className="text-base sm:text-lg">High-Quality Products</p>
              </div>
              <div className="text-center">
                <CountUp
                  start={0}
                  end={30000}
                  duration={2.1}
                  suffix="+"
                  className="text-3xl sm:text-4xl font-bold flex flex-col"
                />
                <p className="text-base sm:text-lg">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default HeroSection
