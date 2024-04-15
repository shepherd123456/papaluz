import { faMagnifyingGlass, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react'
import { useStore } from '../../../../hooks/store/useStore';

function ProductSearch() {
  const { selectedCat, products, search, setSearch, setSelectedCat } = useStore(state => state.home);
  const categories = Object.keys(products);

  const [showCatsMenu, setShowCatsMenu] = useState(false);

  function searchSubmitted(e) {
    e.preventDefault();
    console.log(search);
  }

  return (
    <div className='relative w-[60%] flex border rounded'>
      <div className='whitespace-nowrap flex items-center bg-gray-200 border text-sm'>
        <button
          onClick={() => setShowCatsMenu(prev => !prev)}
          className='w-full flex gap-2 p-2'
        >
          {selectedCat}
          <FontAwesomeIcon icon={faSortDown} />
        </button>
        <div className={`absolute ${showCatsMenu ? 'left-0' : '-left-full'} top-[100%] min-w-[25%] flex flex-col bg-gray-50 border rounded shadow`}>
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => { setSelectedCat(categories[i]); setShowCatsMenu(false); setSearch('') }}
              className='text-start whitespace-nowrap p-1 m-0.5 rounded hover:bg-gray-200'
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <form onSubmit={searchSubmitted} className='flex w-full'>
        <input
          type='search'
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder='Search'
          className='w-full p-2 focus:outline-none'
        />
        <button className='bg-yellow-400 border-yellow-400 hover:bg-yellow-500 px-5 py-2'>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
    </div>
  )
}

const PRODUCT_CATEGORIES = [
  {
    title: 'All',
  },
  {
    title: 'Books',
  },
  {
    title: 'Craft & Art'
  }
]

export default ProductSearch