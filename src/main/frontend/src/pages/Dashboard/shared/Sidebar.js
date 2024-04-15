import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../../assets/images/papaluz_cerne.jpeg';
import { faArrowRightFromBracket, faCartShopping, faCube, faGear, faQuestion, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useLogout from '../../../hooks/authentication/useLogout';

function Sidebar() {
  const logout = useLogout();

  const [managLinks, setManagLinks] = useState(MANAGEMENT_ACTIONS);
  const [buttomLinks, setButtomLinks] = useState(BOTTOM_ACTIONS);

  return (
    <div className="w-[15rem] flex flex-col bg-black text-white overflow-y-auto">
      <Link to='/'>
        <img src={Logo} className='w-[5rem]' />
      </Link>
      {/* <div className='flex-1 p-2'> */}
      <div className='flex-1 flex flex-col gap-[1rem] p-[0.5rem]'>
        {managLinks.map((link, i) => (
          <SidebarLink key={i} {...link} />
        ))}
      </div>
      <div className='flex flex-col gap-0.5 border-t border-gray-800 p-2'>
        {buttomLinks.map((link, i) => (
          <SidebarLink key={i} {...link} />
        ))}
        <button onClick={async () => await logout()} className='flex items-center gap-2 text-red-500 hover:bg-gray-800 rounded px-3 py-2'>
          <span><FontAwesomeIcon icon={faArrowRightFromBracket} /></span>
          <span>sign out</span>
        </button>
      </div>
    </div>
  )
}

function SidebarLink({ title, icon, to }) {
  const { pathname } = useLocation();
  return (
    <Link to={to} className={`flex flex-row items-center gap-2 hover:bg-gray-800 rounded ${pathname === to ? 'text-white' : 'text-gray-400'} px-3 py-2 font-light`}>
      <span><FontAwesomeIcon icon={icon} /></span>
      <span>{title}</span>
    </Link>
  )
}

const MANAGEMENT_ACTIONS = [
  {
    title: 'Products',
    icon: faCube,
    to: '/dashboard/products'
  },
  {
    title: 'Orders',
    icon: faCartShopping,
    to: '/dashboard/orders'
  },
  {
    title: 'Customers',
    icon: faUsers,
    to: '/dashboard/customers'
  }
];

const BOTTOM_ACTIONS = [
  {
    title: 'Settings',
    icon: faGear,
    to: '/dashboard/settings'
  },
  {
    title: 'Support',
    icon: faQuestion,
    to: '/legal',
  }
]

export default Sidebar