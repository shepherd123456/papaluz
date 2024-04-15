import { Outlet } from 'react-router-dom'

import FirstNavbar from '../../shared/FirstNavbar/FirstNavbar'
import SecondNavbar from '../../shared/SecondNavbar/SecondNavbar'
import Footer from '../../shared/Footer/Footer'

function HomeLayout() {
  return (
    <div className='flex flex-col'>
      <FirstNavbar />
      <SecondNavbar />
      <div className="h-screen flex flex-col justify-between">
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default HomeLayout