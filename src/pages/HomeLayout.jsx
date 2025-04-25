import { Outlet } from 'react-router-dom'
import { Footer, Header, Navbar } from '../components'

const HomeLayout = () => {
  return (
    <>
      <Header />
      <Navbar />
      <section className=" ">
        <Outlet />

        <Footer />
      </section>
    </>
  )
}

export default HomeLayout
