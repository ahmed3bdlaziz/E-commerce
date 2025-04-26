import { Products } from '../utils/data'

const Sorts = () => {
  const value = [...Products].length
  return (
    <div className="flex items-center justify-between ">
      <h4 className="text-lg w-full">Showing 1-10 of {value} Products</h4>
      <div className="flex items-center gap-2 w-full justify-end">
        <label>Sort by:</label>
        <select className="select select-bordered w-full  max-w-[200px] border-0 border-b-1">
          <option value="most-popular">Most Popular</option>
          <option value="lowest-price">Lowest Price</option>
          <option value="highest-price">Highest Price</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
        </select>
      </div>
    </div>
  )
}

export default Sorts
