import { Link, useLocation } from 'react-router-dom';
import Logo from '../../../assets/images/papaluz_bile.jpeg';
import { faArrowRightFromBracket, faQuestion, faUserCircle, faUserEdit, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useLogout from '../../../hooks/authentication/useLogout';

function Sidebar() {
  const logout = useLogout();

  const [managLinks] = useState(MANAGEMENT_ACTIONS);
  const [buttomLinks] = useState(BOTTOM_ACTIONS);

  return (
    <div className="w-[15rem] flex flex-col overflow-y-auto">
      <Link to='/'>
        <img src={Logo} className='w-[5rem]' />
      </Link>
      <div className='flex-1 flex flex-col gap-[1rem] p-[0.5rem]'>
        {managLinks.map((link, i) => (
          <SidebarLink key={i} {...link} />
        ))}
      </div>
      <div className='flex flex-col gap-0.5 border-t border-gray-800 p-2'>
        {buttomLinks.map((link, i) => (
          <SidebarLink key={i} {...link} />
        ))}
        <button onClick={async () => await logout()} className='flex items-center gap-2 text-red-500 hover:bg-gray-200 rounded px-3 py-2'>
          <span><FontAwesomeIcon icon={faArrowRightFromBracket} /></span>
          <span>sign out</span>
        </button>
      </div>
    </div>
  )
}

function SidebarLink({ title, icon, to }) {
  return (
    <Link to={to} className={`flex flex-row items-center gap-2 hover:bg-gray-200 text-gray-600 rounded px-3 py-2 font-light`}>
      <span><FontAwesomeIcon icon={icon} /></span>
      <span>{title}</span>
    </Link>
  )
}

const MANAGEMENT_ACTIONS = [
  {
    title: 'Account',
    icon: faUserCircle,
    to: '/settings/'
  },
  {
    title: 'Personal',
    icon: faUserEdit,
    to: '/settings/personal'
  },
];

const BOTTOM_ACTIONS = [
  {
    title: 'Support',
    icon: faQuestion,
    to: '/legal'
  }
]

export default Sidebar