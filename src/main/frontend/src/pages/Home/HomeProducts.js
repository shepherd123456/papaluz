import { useEffect, useState } from 'react'
import { useCtx } from '../../hooks/context/useCtx'
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../hooks/store/useStore';

import axios from 'axios';
import config from '../../config.json';

function HomeProducts() {
  const navigate = useNavigate();

  const { ctx } = useCtx();

  const {
    search,
    products,
    selectedCat,
    setProducts,
    setSelectedCat
  } = useStore(state => state.home);

  const [searchedProducts, setSearchProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const res = await axios.get(`${config.baseURL}/products`);
      setProducts(res.data);
    }
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        console.log('you pressed fucking escape');
      }
    }
    getProducts();
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [])

  useEffect(() => {
    if (!search) {
      setSearchProducts([])
      return;
    }
    for (const category in products) {
      if (category.toLowerCase() == search?.toLowerCase()) {
        setSelectedCat(category);
        setSearchProducts([]);
        return;
      }
      const categoryProducts = products[category].filter(product => {
        const titleMatchs = product.title.toLowerCase().includes(search?.toLowerCase());
        const descriptionMatchs = product.description.toLowerCase().includes(search?.toLowerCase());
        return titleMatchs || descriptionMatchs;
      });
      if (categoryProducts.length > 0) {
        setSearchProducts(categoryProducts);
        return;
      }
    }
  }, [search]);

  if (!selectedCat) {
    setSelectedCat(Object.keys(products)[0]);
  }
  const productsToRender =
    searchedProducts?.length > 0 ?
      searchedProducts : products[selectedCat]?.length > 0 ?
        products[selectedCat] : [];

  return (
    <div className='px-[5rem] mt-[3rem] mb-[4rem]'>
      <h1 className='text-2xl font-bold uppercase'>{selectedCat}</h1>
      <div className='grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] border-t border-l border-gray-200 my-4'>
        {/* <div className='grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] my-4 pt-[1px] pl-[1px]'> */}
        {productsToRender.map((product, i) => (
          <div
            key={i}
            onClick={() => navigate('/products/view', { state: product })}
            // className='flex flex-col justify-between items-center cursor-pointer border border-gray-200 -ml-[1px] -mt-[1px]'
            className='flex flex-col justify-between items-center cursor-pointer border-r border-b border-gray-200'
          >
            <img src={`${ctx?.baseURL}/products/${product.uuid}/images/${product.primaryImageFilename}`} alt={product.title} className='w-[13rem]' />
            <div className="h-full flex flex-col p-[1rem]">
              <span className='font-semibold'>{product.title}</span>
              {/* <span className='h-[5rem] text-sm'>{product.description}</span> */}
              <div
                className='prose'
                style={{
                  height: '4rem',
                  lineHeight: '20px',
                  wordBreak: 'break-all',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  MozBoxOrient: 'vertical',
                  msBoxOrient: 'vertical',
                  boxOrient: 'vertical',
                  WebkitLineClamp: NUM_OF_DESC_LINES,
                  MozLineClamp: NUM_OF_DESC_LINES,
                  msLineClamp: NUM_OF_DESC_LINES,
                  lineClamp: NUM_OF_DESC_LINES,
                  overflow: 'hidden',
                }}
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
              <span className='mt-[1rem]'>{formatter.format(product.price)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const NUM_OF_DESC_LINES = 3;

const formatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'CZK'
});


export default HomeProducts