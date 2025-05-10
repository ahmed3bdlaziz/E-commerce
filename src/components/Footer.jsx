import { FaFacebook, FaXTwitter, FaYoutube } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectTranslations } from '../features/language/languageSlice'

const Footer = () => {
  const translations = useSelector(selectTranslations)
  return (
    <footer className="w-full border-t-2  px-4 md:px-8 lg:px-14 py-8 md:py-14 relative">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 ">
        {/* Logo and Social Links Section */}
        <div className="flex flex-col gap-4 w-full lg:w-[35%]">
          <div className="flex items-center">
            <h2 className="text-4xl md:text-5xl font-bold uppercase">
              Shopify
            </h2>
          </div>
          <div className="flex gap-6 items-center">
            <Link to="#" className="hover:opacity-80 transition-opacity">
              <FaXTwitter className="text-2xl" />
            </Link>
            <Link to="#" className="hover:opacity-80 transition-opacity">
              <FaFacebook className="text-2xl text-blue-500" />
            </Link>
            <Link to="#" className="hover:opacity-80 transition-opacity">
              <FaYoutube className="text-2xl text-red-500" />
            </Link>
          </div>
        </div>

        {/* Links Section */}
        <div className="w-full lg:w-[65%]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
            <div className="flex flex-col gap-2">
              <h3 className="font-bold uppercase  pb-3">
                {translations.company}
              </h3>
              <a href="#xxx" className="hover:underline">
                {translations.about}
              </a>
              <a href="#xxx" className="hover:underline">
                {translations.Features}
              </a>
              <a href="#xxx" className="hover:underline">
                {translations.Works}
              </a>
              <a href="#xxx" className="hover:underline">
                {translations.Career}
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-bold uppercase  pb-3">{translations.Help}</h3>
              <a href="#xxx" className="hover:underline">
                {translations.CustomerSupport}
              </a>
              <a href="#xxx" className="hover:underline">
                {translations.DeliveryDetails}
              </a>
              <a href="#xxx" className="hover:underline">
                {translations.TermsConditions}
              </a>
              <a href="#xxx" className="hover:underline">
                {translations.PrivacyPolicy}
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-bold uppercase  pb-3">{translations.FAQ}</h3>
              <a href="#xxx" className="hover:underline">
                {translations.account}
              </a>
              <a href="#xxx" className="hover:underline">
                {translations.ManageDeliveries}
              </a>
              <a href="#xxx" className="hover:underline">
                {translations.orders}
              </a>
              <a href="#xxx" className="hover:underline">
                {translations.Payments}
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-bold uppercase  pb-3">
                {translations.resources}
              </h3>
              <a href="#xxx" className="hover:underline">
                {translations.FreeEBooks}
              </a>
              <a href="#xxx" className="hover:underline">
                {translations.DevelopmentTutorial}
              </a>
              <a href="#xxx" className="hover:underline">
                {translations.HowToBlog}
              </a>
              <a href="#xxx" className="hover:underline">
                {translations.YoutubePlaylist}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="mt-12 mb-8">
        <div className="max-w-xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-center mb-4">
            {translations.newsletterTitle}
          </h3>
          <form
            className="flex flex-col sm:flex-row gap-4"
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <input
              type="email"
              placeholder={translations.placeholder}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-black"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-lg cursor-pointer hover:bg-gray-800 transition-colors"
            >
              {translations.subscribe}
            </button>
          </form>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-200 mt-8 pt-8 text-center ">
        <p>
          SHOPIFY.CO {translations.Copyright} {translations.AllRightsReserved}-
          {new Date().getFullYear()}.
        </p>
      </div>
    </footer>
  )
}

export default Footer
