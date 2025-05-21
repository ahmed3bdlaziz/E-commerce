import {
  BrandsSection,
  CategoryStyle,
  CusRev,
  HeroSection,
  NewArrivalSection,
  TopSellingSection,
} from '../components'
import { customFetch } from '../utils/data'

const url = '/api/products'
export const landingLoader = async () => {
  const response = await customFetch(url, {
    params: {
      populate: '*',
    },
  })
  if (response.status === 200) {
    const products = response.data.data
    return { products }
  }
  throw new Error(response.data.message)
}
const Landing = () => {
  return (
    <>
      <HeroSection />
      <BrandsSection />
      <NewArrivalSection />
      <TopSellingSection />
      <CategoryStyle />
      <CusRev />
    </>
  )
}

export default Landing
