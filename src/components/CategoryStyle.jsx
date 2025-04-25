import { Link } from 'react-router-dom'
import casual from '../assets/images/styles/casual.png'
import formal from '../assets/images/styles/formal.png'
import party from '../assets/images/styles/party.png'
import gym from '../assets/images/styles/gym.png'

const CategoryStyle = () => {
  const categories = [
    {
      name: 'Casual',
      image: casual,
      link: '/category/casual',
    },
    {
      name: 'Formal',
      image: formal,
      link: '/category/formal',
    },
    {
      name: 'Party',
      image: party,
      link: '/category/party',
    },
    {
      name: 'Gym',
      image: gym,
      link: '/category/gym',
    },
  ]

  return (
    <section className="py-12 px-4 ">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-3xl font-bold mb-8">
          BROWSE BY DRESS STYLE
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((category, index) => (
            <Link
              to={category.link}
              key={index}
              className="relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group"
            >
              <div className="aspect-[4/3] sm:aspect-[3/2] relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-semibold text-black bg-white/90 px-6 py-2 rounded-full shadow-sm">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryStyle
