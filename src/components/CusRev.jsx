import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io'
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineVerified,
} from 'react-icons/md'

const CusRev = () => {
  const reviews = [
    {
      id: 1,
      name: 'Sarah M.',
      rating: 5,
      text: '"I\'m really impressed with the quality and style of the clothes I received. The high-end casual wear for budget-minded women, every item has exceeded my expectations!"',
      verified: true,
    },
    {
      id: 2,
      name: 'Alex K.',
      rating: 5,
      text: '"Finding stylish plus-size fashion pieces used to be a challenge until I discovered ShopZo. The range of options they offer is truly remarkable."',
      verified: true,
    },
    {
      id: 3,
      name: 'James L.',
      rating: 5,
      text: '"As someone who loves to shop for unique fashion pieces, I\'m thrilled to have stumbled upon ShopZo. The selection of clothes is not only diverse."',
      verified: true,
    },
    {
      id: 4,
      name: 'James L.',
      rating: 5,
      text: '"As someone who loves to shop for unique fashion pieces, I\'m thrilled to have stumbled upon ShopZo. The selection of clothes is not only diverse."',
      verified: true,
    },
    {
      id: 5,
      name: 'James L.',
      rating: 5,
      text: '"As someone who loves to shop for unique fashion pieces, I\'m thrilled to have stumbled upon ShopZo. The selection of clothes is not only diverse."',
      verified: true,
    },
  ]

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">OUR HAPPY CUSTOMERS</h2>
          <div className="flex gap-2">
            <button className="review-prev bg-gray-100 p-2 cursor-pointer  rounded-full hover:bg-gray-200 transition  ">
              <MdKeyboardArrowLeft className="text-3xl" />
            </button>
            <button className="review-next bg-gray-100 p-2 cursor-pointer  rounded-full hover:bg-gray-200 transition">
              <MdKeyboardArrowRight className="text-3xl" />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          navigation={{
            prevEl: '.review-prev',
            nextEl: '.review-next',
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="bg-white p-6 rounded-lg shadow-sm border-1 border-gray-200">
                <div className="text-yellow-400 text-lg mb-2">
                  {renderStars(review.rating)}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">{review.name}</span>
                  {review.verified && (
                    <span className="text-green-500 text-sm flex items-center gap-1">
                      <MdOutlineVerified />
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-4">{review.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default CusRev
