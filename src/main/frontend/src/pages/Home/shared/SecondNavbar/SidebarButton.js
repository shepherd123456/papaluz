import { faAngleRight, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../../../hooks/store/useStore';

function SidebarButton({ children, className }) {
  const navigate = useNavigate();

  const { products, setSelectedCat } = useStore(state => state.home);

  const sidebarLinksRef = useRef(SIDEBAR_SECTIONS);
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [])

  function toggleSidebar() {
    setIsOpen(prev => !prev);
  }

  const categories = Object.keys(products);
  const catsToLinks = categories.map(c => ({
    title: c,
    onClick: () => setSelectedCat(c)
  }));
  sidebarLinksRef.current[0].links = catsToLinks.slice(0, 5);
  for (let i = 1; i < sidebarLinksRef.current.length; i++) {
    sidebarLinksRef.current[i] = {
      title: sidebarLinksRef.current[i].title,
      links: sidebarLinksRef.current[i].links.map(l => ({
        title: l.title,
        onClick: () => l.onClick ? l.onClick() : l.to ? navigate(l.to) : navigate(l.title.toLowerCase().replace(/ /g, '-'))
      }))
    }
  }

  return (
    <>
      <button onClick={toggleSidebar} className={className}>{children}</button>
      <div onClick={() => setIsOpen(false)} className={`fixed top-0 left-0 w-full h-full bg-black/60 duration-500 ${!isOpen ? 'invisible' : ''}`}>
        <div onClick={e => e.stopPropagation()} className={`fixed top-0 ${isOpen ? 'left-0' : '-translate-x-full'} w-full flex items-start duration-500 ease-in-out`}>
          <div className='w-[22rem] h-screen flex flex-col items-start bg-white'>
            <Link to='/sign-in' className='h-[3rem] w-full flex gap-3 items-center bg-sky-950 pl-[2rem]'>
              <span className='text-white'><FontAwesomeIcon icon={faUser} /></span>
              <span className='text-white text-lg font-bold'>Sign in</span>
            </Link>
            {sidebarLinksRef.current.map((section, i) => (
              <div key={i} className='w-full mt-[1rem] border-b'>
                <span className='text-xl font-medium pl-[2rem]'>{section.title}</span>
                <ul className='my-[0.5rem]'>
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <button className='w-full flex justify-between hover:bg-gray-100 text-start text-sm pl-[2rem] my-1 py-3' onClick={() => { link.onClick(); setIsOpen(false); }}>
                        <span>{link.title}</span>
                        <span className='text-gray-400 px-3'><FontAwesomeIcon icon={faAngleRight} className='h-[1rem]' /></span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <button onClick={toggleSidebar} className='mx-3 my-1'>
            <FontAwesomeIcon icon={faTimes} className='h-[2rem] text-white' />
          </button>
        </div>
      </div>
    </>
  )
}

const SIDEBAR_SECTIONS = [
  // {
  //   title: 'Ditial Content & Devices',
  //   links: [
  //     {
  //       title: 'Amazon Music',
  //     },
  //     {
  //       title: 'Kindle E-readers & Books'
  //     },
  //   ]
  // },
  {
    title: 'Shop by Department',
    links: [
      {
        title: 'Electronics'
      },
      {
        title: 'Computers'
      }
    ]
  },
  // {
  //   title: 'Programs & Features',
  //   links: [
  //     {
  //       title: 'Gift Cards',
  //     },
  //     {
  //       title: 'Shop By Interest'
  //     }
  //   ]
  // },
  {
    title: 'Help & Settings',
    links: [
      {
        title: 'Your profile',
        to: '/settings'
      },
      {
        title: 'Customer Service',
        to: '/legal'
      },
      {
        title: 'Sign In',
      }
    ]
  }
];

export default SidebarButton