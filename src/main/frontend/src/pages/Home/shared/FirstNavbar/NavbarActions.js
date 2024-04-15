import { faBasketShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useStore } from '../../../../hooks/store/useStore';

function NavbarActions() {
  const products = useStore(state => state.cart.products);

  const [actions, setActions] = useState(ACTIONS);

  return (
    <ul className='h-full flex'>
      {actions.map((action, i) => (
        <li key={i}>
          <Link to={action.to} className='h-full w-[8rem] flex gap-3 justify-center items-center hover:bg-sky-100'>
            <span className='text-sky-800'>{action.icon}</span>
            <span className='font-semibold'>{action.title}</span>
          </Link>
        </li>
      ))}
      <li>
        <Link to='/cart' className='h-full w-[8rem] flex gap-3 justify-center items-center hover:bg-sky-100'>
          <div className='relative text-sky-800'>
            <FontAwesomeIcon icon={faBasketShopping} />
            <div className='absolute text-red-600 text-xs bg-sky-200 rounded -top-3 -left-2 p-[2px]'>{Object.keys(products).length}</div>
          </div>
          <span className='font-semibold'>Cart</span>
        </Link>
      </li>
    </ul>
  )
}

const ACTIONS = [
  {
    icon: <FontAwesomeIcon icon={faUser} />,
    title: 'Sign in',
    to: '/sign-in'
  },
  // {
  //   icon: <FontAwesomeIcon icon={faBasketShopping} />,
  //   title: 'Cart',
  //   to: '/cart'
  // },
]

export default NavbarActions