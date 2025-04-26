import Title from '../components/Title'
import { Link } from 'react-router-dom'
import CountUp from 'react-countup'
import AboutImg from '../assets/images/about/about.avif'

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Title title="About Us" />

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Our Story</h2>
          <p className="text-gray-600 leading-relaxed">
            Welcome to our fashion haven, where style meets sophistication.
            Since our inception, we've been dedicated to bringing you the finest
            selection of clothing from renowned international brands. Our
            mission is to help every customer express their unique personality
            through fashion.
          </p>
          <Link
            to="/products"
            className="btn btn-neutral uppercase w-fit px-8 rounded-3xl mt-8"
          >
            Shop Now
          </Link>
        </div>
        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
          <img
            src={AboutImg}
            alt="About Us"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* our values */}
      <div className="my-10">
        <h2 className="text-3xl text-center font-bold">Our Values</h2>
        <ul className="timeline max-w-3xl  mx-auto">
          <li>
            <div className="timeline-start timeline-box">
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">Quality</h3>
                <p className="text-gray-600">
                  We ensure every product meets our high standards
                </p>
              </div>
            </div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-end timeline-box">
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">Style</h3>
                <p className="text-gray-600">
                  Curated collections that define modern fashion
                </p>
              </div>
            </div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-start timeline-box">
              {' '}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">Service</h3>
                <p className="text-gray-600">
                  Dedicated support for an exceptional experience
                </p>
              </div>
            </div>
            <hr />
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="text-center p-6 bg-base-100 rounded-lg shadow-lg">
          <CountUp
            start={0}
            end={200}
            duration={3}
            suffix="+"
            className="text-4xl font-bold block mb-3"
          />
          <p className="text-lg">International Brands</p>
        </div>
        <div className="text-center p-6 bg-base-100 rounded-lg shadow-lg">
          <CountUp
            start={0}
            end={2000}
            duration={2.75}
            suffix="+"
            className="text-4xl font-bold block mb-3"
          />
          <p className="text-lg">Quality Products</p>
        </div>
        <div className="text-center p-6 bg-base-100 rounded-lg shadow-lg">
          <CountUp
            start={0}
            end={30000}
            duration={2.1}
            suffix="+"
            className="text-4xl font-bold block mb-3"
          />
          <p className="text-lg">Happy Customers</p>
        </div>
      </div>
    </div>
  )
}

export default About
