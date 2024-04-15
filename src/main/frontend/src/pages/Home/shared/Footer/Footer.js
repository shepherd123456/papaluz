import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../../../assets/images/papaluz_bile.jpeg';
import { useState } from 'react';

function Footer() {
  const navigate = useNavigate();

  const [inspectLinks, setInspectBtns] = useState(INSPECT_LINKS);
  const [actionLinks, setActionBtns] = useState(ACTION_LINKS);

  return (
    <div className='flex flex-col'>
      <div className='grid sm:grid-cols-4 grid-cols-2 gap-[8rem] items-start shadow-xl shadow-black px-[2rem] pb-[2rem]'>
        <div className="flex flex-col">
          <img src={Logo} alt="logo" className='w-[4rem]' />
          <span className='font-semibold'>Papaluz</span>
          {/* <div className="text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo, ad.</div> */}
        </div>
        <div className='hidden sm:flex flex-col gap-4 mt-4'>
          <span className='font-semibold'>Inspect</span>
          <ul>
            {inspectLinks.map((link, i) => (
              <li key={i} className='p-[0.25rem] hover:bg-gray-50 rounded'>
                <Link to={link.to} className='text-gray-600'>{link.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden sm:flex flex-col gap-4 mt-4">
          <span className='font-semibold'>Action</span>
          <ul>
            {actionLinks.map((link, i) => (
              <li key={i} className='p-[0.25rem] hover:bg-gray-100 rounded'>
                <Link to={link.to} className='text-gray-600 py-[2px]'>{link.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col mt-4">
          <span className='font-semibold'>Contact</span>
          <span>Contact us</span>
          <strong>+420 775 638 222</strong>
        </div>
      </div >
      <div className='h-full flex justify-between bg-gray-50 text-gray-700 px-[2rem] py-1'>
        <span className=''>© Papaluz</span>
        <Link to='/legal/terms-of-use' className='hover:bg-gray-100 px-2 rounded'>terms of use</Link>
      </div>
    </div>
  )
}

const INSPECT_LINKS = [
  {
    title: 'sign-in',
    to: '/sign-in'
  },
  {
    title: 'account',
    to: '/settings'
  }
];

const ACTION_LINKS = [
  {
    title: 'dashboard',
    to: '/dashboard'
  },
  {
    title: 'sell',
    to: '/seller'
  },
];

export default Footer