import Title from '../components/Title'
import { Link } from 'react-router-dom'
import CountUp from 'react-countup'
import AboutImg from '../assets/images/about/about.avif'
import Breadcrumbs from '../components/Breadcrumbs'
import { useSelector } from 'react-redux'
import { selectTranslations } from '../features/language/languageSlice'

const About = () => {
  const translations = useSelector(selectTranslations)

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs title={translations.AboutUs} />
      <Title title={translations.AboutUs} />
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">{translations.AboutUs}</h2>
          <p className="not-dark:text-gray-600 leading-relaxed">
            {translations.AboutUsSubtitle}
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
