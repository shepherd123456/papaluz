import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SidebarButton from './SidebarButton';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function SecondNavbar() {
  const [links, setLinks] = useState(LINKS);

  return (
    <ul className='flex items-center bg-sky-50'>
      <li>
        <SidebarButton className='flex gap-1 items-center hover:bg-sky-100 rounded text-sm m-[0.5rem] p-[0.5rem]'>
          <FontAwesomeIcon icon={faBars} />
          <span>All</span>
        </SidebarButton>
      </li>
      {links.map((link, i) => (
        <li key={i}>
          <Link to={link.to} className='hover:bg-sky-100 rounded text-sm m-[0.3rem] p-[0.5rem]'>
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}

const LINKS = [
  {
    title: 'Customer Service',
    to: '/legal'
  },
  {
    title: 'Sell',
    to: '/seller'
  },
  {
    title: 'Dashboard',
    to: '/dashboard'
  }
]

export default SecondNavbar