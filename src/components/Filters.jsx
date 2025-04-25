import { GiSettingsKnobs } from 'react-icons/gi'
import { RiArrowDropRightLine } from 'react-icons/ri'

const Filters = () => {
  return (
    <div className="join join-vertical bg-base-100">
      <div className="collapse  border-gray-300 border-1 rounded-lg">
        <input type="checkbox" className="peer" />
        <div className="collapse-title text-lg p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl capitalize font-semibold ">filters</h3>
            <GiSettingsKnobs />
          </div>
        </div>
        <div className="collapse-content  ">
          <hr className="text-gray-400" />
          <div className="flex flex-col items-center justify-between cursor-pointer">
            {/* category */}
            <div className="category w-full">
              <div className="flex justify-between items-center">
                <h3 className="capitalize">t-shirts</h3>
                <RiArrowDropRightLine className="text-3xl" />
              </div>
              <div className="flex justify-between items-center">
                <h3 className="capitalize">shorts</h3>
                <RiArrowDropRightLine className="text-3xl" />
              </div>
              <div className="flex justify-between items-center">
                <h3 className="capitalize">shirts</h3>
                <RiArrowDropRightLine className="text-3xl" />
              </div>
              <div className="flex justify-between items-center">
                <h3 className="capitalize">hoodies</h3>
                <RiArrowDropRightLine className="text-3xl" />
              </div>
              <div className="flex justify-between items-center">
                <h3 className="capitalize">t-jeans</h3>
                <RiArrowDropRightLine className="text-3xl" />
              </div>
            </div>
            {/* price range */}
            <div className="range"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filters
