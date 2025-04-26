import { FaRegTrashAlt } from 'react-icons/fa'
import Title from '../components/Title'
import { Products } from '../utils/data'
import { CiBookmarkPlus } from 'react-icons/ci'

const Cart = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Title title="your Cart" />
      <div className="grid grid-cols-1 md:grid-cols-[1fr_450px] gap-4">
        <div className="p-4 rounded-lg shadow-sm ">
          {Products.map((product, index) => {
            return (
              <div key={product.id}>
                <div className="flex justify-between items-center capitalize font-semibold w-full gap-4 my-4">
                  <div className="flex gap-3">
                    <img src={product.image} className="w-24 h-24" alt="name" />
                    <div className="flex flex-col">
                      <h3 className="text-2xl capitalize">{product.name}</h3>
                      <p className=" capitalize">
                        size : <span className="">{product.size}</span>
                      </p>
                      <p className=" capitalize">
                        color : <span className="">black</span>
                      </p>
                      <p className=" capitalize">
                        quantity : <span className="">1</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between items-center h-full gap-6">
                    <button className="text-red-500 cursor-pointer text-xl">
                      <FaRegTrashAlt />
                    </button>
                    <div className="">
                      <div className="flex items-center gap-3 dark:bg-gray-300 dark:text-white rounded-full px-4 py-1">
                        <button className="text-xl font-bold cursor-pointer">
                          -
                        </button>
                        <span className="w-8 text-center">1</span>
                        <button className="text-xl font-bold cursor-pointer">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {index !== Products.length - 1 && (
                  <hr className="border-t-gray-300 m-3" />
                )}
              </div>
            )
          })}
        </div>
        <div className="p-4 rounded-lg shadow-sm flex flex-col gap-8">
          <h1 className="text-4xl capitalize font-bold">order summary</h1>
          <div className="flex justify-between items-center capitalize font-semibold">
            <p> subtotal</p> <span className="font-bold">$265</span>
          </div>
          <div className="flex justify-between items-center capitalize font-semibold">
            <p> discount (-20%)</p>{' '}
            <span className="font-bold text-red-400">-$113</span>
          </div>
          <div className="flex justify-between items-center capitalize font-semibold">
            <p> delivery fee </p>
            <span className="font-bold ">-$15</span>
          </div>
          <hr />
          <div className="flex justify-between items-center capitalize font-semibold">
            <p> total </p>
            <span className="font-bold ">-$467</span>
          </div>
          <div className="flex justify-center items-center gap-2">
            <label className="input validator">
              <CiBookmarkPlus className="text-xl" />
              <input type="text" placeholder="Add Promo Code" required />
            </label>
            <div className="validator-hint hidden">add promo code</div>
            <button className="btn btn-neutral capitalize rounded-3xl">
              apply
            </button>
          </div>
          <button className="btn btn-neutral rounded-3xl">
            Go To Checkout{' '}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
