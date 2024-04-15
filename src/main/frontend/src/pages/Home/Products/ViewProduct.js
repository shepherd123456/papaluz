import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCtx } from '../../../hooks/context/useCtx';
import { useStore } from '../../../hooks/store/useStore';

function ViewProduct() {
  const location = useLocation();

  const { ctx } = useCtx();

  const addProduct = useStore(state => state.cart.addProduct);

  const [p] = useState(location.state);
  const [quantity, setQuantity] = useState("1");
  const [success, setSuccess] = useState(false);

  return (
    <div className="flex gap-[2rem] mx-[3rem] my-[2rem]">
      <div className="flex flex-col ">
        <img src={`${ctx.baseURL}/products/${p.uuid}/images/${p.primaryImageFilename}`} alt={p.title} className='w-[23rem] object-cover' />
      </div>
      <div className='flex flex-col'>
        <h1 className='font-medium text-[1.5rem]'>{p.title}</h1>
        <div
          className='prose prose-md'
          dangerouslySetInnerHTML={{ __html: p.description }}
        ></div>
      </div>
      <div className="flex flex-col gap-[0.5rem] w-[16%]">
        <div className='mb-[2rem]'>{formatter.format(p.price)}</div>

        <label htmlFor="quantity">Quantity</label>
        <select
          id='quantity'
          name='quantity'
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          className=' bg-gray-100 border rounded border-gray-300 p-[0.5rem]'
        >
          {Array(5).fill(0).map((_, i) => (
            <option key={i} value={i + 1}>{i + 1}</option>
          ))}
        </select>
        <button
          onClick={() => { addProduct(p, quantity); setSuccess(true); }}
          className='bg-yellow-500 rounded text-white px-4 py-2'
        >
          Add to cart
        </button>
        <div className={success ? 'visible' : 'hidden'}>
          The product was successfully added to cart. Go to
          <Link to='/cart' className='text-sky-600 underline'>Cart</Link> or
          <Link to='/' className='text-sky-600 underline'>Home</Link>
        </div>
      </div>
    </div>
  )
}

const formatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'CZK'
});

export default ViewProduct