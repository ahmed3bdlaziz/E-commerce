import { FaFacebook, FaXTwitter, FaYoutube } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const Footer = () => {
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
              <h3 className="font-bold uppercase  pb-3">company</h3>
              <a href="#xxx" className="hover:underline">
                About
              </a>
              <a href="#xxx" className="hover:underline">
                Features
              </a>
              <a href="#xxx" className="hover:underline">
                Works
              </a>
              <a href="#xxx" className="hover:underline">
                Career
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-bold uppercase  pb-3">Help</h3>
              <a href="#xxx" className="hover:underline">
                Customer Support
              </a>
              <a href="#xxx" className="hover:underline">
                Delivery Details
              </a>
              <a href="#xxx" className="hover:underline">
                Terms & Conditions
              </a>
              <a href="#xxx" className="hover:underline">
                Privacy Policy
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-bold uppercase  pb-3">FAQ</h3>
              <a href="#xxx" className="hover:underline">
                Account
              </a>
              <a href="#xxx" className="hover:underline">
                Manage Deliveries
              </a>
              <a href="#xxx" className="hover:underline">
                Orders
              </a>
              <a href="#xxx" className="hover:underline">
                Payments
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-bold uppercase  pb-3">Resources</h3>
              <a href="#xxx" className="hover:underline">
                Free eBooks
              </a>
              <a href="#xxx" className="hover:underline">
                Development Tutorial
              </a>
              <a href="#xxx" className="hover:underline">
                How to - Blog
              </a>
              <a href="#xxx" className="hover:underline">
                Youtube Playlist
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="mt-12 mb-8">
        <div className="max-w-xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-center mb-4">
            STAY UP TO DATE ABOUT OUR LATEST OFFERS
          </h3>
          <form
            className="flex flex-col sm:flex-row gap-4"
            onSubmit={(e) => {
              e.preventDefault()
            }}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-black"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-lg cursor-pointer hover:bg-gray-800 transition-colors"
            >
              Subscribe to Newsletter
            </button>
          </form>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-200 mt-8 pt-8 text-center ">
        <p>© {new Date().getFullYear()} SHOPIFY.CO All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
