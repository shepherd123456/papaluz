import { Outlet } from 'react-router-dom'

import Sidebar from './Sidebar'

function SettingsLayout() {
  return (
    <div className="w-full h-screen flex">
      <Sidebar />
      <div className="w-full flex flex-col bg-gray-100">
        {/* <Header /> */}
        <Outlet />
      </div>
    </div>
  )
}

export default SettingsLayout