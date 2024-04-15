import { useState } from "react";
import { useCtx } from "../../../hooks/context/useCtx";
import { useStore } from '../../../hooks/store/useStore';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

function Summary() {
  const navigate = useNavigate();
  const { ctx } = useCtx();

  const products = useStore(state => state.cart.products)
  const setProductQuantity = useStore(state => state.cart.setProductQuantity);
  const deleteProduct = useStore(state => state.cart.deleteProduct);

  const [uuids] = useState(Object.keys(products));

  const subtotal = uuids.reduce((a, c) => a + products[c].price * products[c].quantity, 0);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-[1rem] bg-gray-200 p-[1.5rem] border border-gray-300 rounded">
        <span className="self-center">Cart Summary</span>
        <span className="text-sm text-gray-500">({uuids.length} items)</span>
        {uuids.map((u, i) => {
          const p = products[u];
          return (
            <div key={i} className="flex items-start gap-[2rem] border-b border-black py-[1rem]">
              <img src={`${ctx?.baseURL}/products/${u}/images/${p.primaryImageFilename}`} className='w-[14rem] object-cover' />
              <div className="flex flex-col">
                <span className="font-bold">{p.title}</span>
                <span>{formatter.format(p.price)}</span>
              </div>
              <select
                id='quantity'
                name='quantity'
                value={p.quantity}
                onChange={e => setProductQuantity(u, e.target.value)}
                className=' bg-gray-100 border rounded border-gray-300 p-[0.5rem]'
              >
                {Array(5).fill(0).map((_, i) => (
                  <option key={i} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <span className="text-bold">{formatter.format(p.price * p.quantity)}</span>
              <button onClick={() => { deleteProduct(u); navigate('/') }}>
                <FontAwesomeIcon icon={faTimes} className="text-gray-400 border border-gray-400 rounded-full p-[2px]" />
              </button>
            </div>
          )
        })}
        {/* <div className="grid grid-cols-2 gap-y-[0.5rem] border-b border-gray-500 mx-[8rem] pb-[0.5rem]">
          <span className="">Subtotal</span>
          <span className="">{formatter.format(subtotal)}</span>
        </div> */}
        {/* <div className="grid grid-cols-2 gap-y-[0.5rem] mx-[8rem]">
          <span className="font-bold">Total</span>
          <span className="font-bold">{formatter.format(123)}</span>
        </div> */}
        {/* <div className="grid grid-cols-2 gap-y-[0.5rem] mx-[8rem] pb-[0.5rem]"> */}
        <div className="flex justify-around font-bold pb-[0.5rem]">
          <span>Total</span>
          <span>{formatter.format(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <Link to='/' className="font-medium bg-blue-500 rounded text-gray-100 px-4 py-2">Back to shopping</Link>
          <Link to='/cart/shipping' className="font-medium bg-yellow-500 rounded text-gray-100 px-4 py-2">Next to shipping</Link>
        </div>
      </div>
    </div >
  )
}

const formatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'CZK'
});

export default Summary
