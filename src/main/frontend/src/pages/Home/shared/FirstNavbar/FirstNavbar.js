import { Link } from 'react-router-dom'

import Logo from '../../../../assets/images/papaluz_bile.jpeg';

import ProductSearch from './ProductSearch';
import NavbarActions from './NavbarActions';

function FirstNavbar() {
  return (
    <header className='h-[5rem] sticky top-0 shadow-lg bg-white'>
      <nav className='h-full flex justify-between items-center mr-1.5'>
        <Link to='/'>
          <img src={Logo} className='w-[5rem]' />
        </Link>
        <ProductSearch />
        <NavbarActions />
      </nav>
    </header>
  )
}

export default FirstNavbar