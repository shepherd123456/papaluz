import { useState } from 'react'
import { useCtx } from '../../../hooks/context/useCtx';
import { useStore } from '../../../hooks/store/useStore';
import { Link, useNavigate } from 'react-router-dom';

const EMAIL_REGEX = /^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/;
const PHONE_REGEX = /^\+?(?:\d\s?){6,14}$/;

function Shipping() {
  const navigate = useNavigate();

  const { ctx } = useCtx();

  const setBuyerDetails_ = useStore(state => state.cart.setBuyerDetails);

  const [buyerDetails, setBuyerDetails] = useState({
    fullName: {
      firstName: '',
      middleName: '',
      lastName: ''
    },
    citizenship: '',
    address: {
      zip: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      country: ''
    },
    phone: '',
    email: ''
  });
  const [countries] = useState(COUNTRIES);
  const [errMsg, setErrMsg] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    const keys = name.split('.');
    const lastKey = keys[keys.length - 1];
    if (lastKey === 'email') {
      if (value !== '' && !EMAIL_REGEX.test(value)) {
        setErrMsg('email must be valid');
      } else {
        setErrMsg('');
      }
    } else if (lastKey === 'phone') {
      if (value !== '' && !PHONE_REGEX.test(value)) {
        setErrMsg('phone must be valid');
      } else {
        setErrMsg('');
      }
    }
    setBuyerDetails(prev => {
      let schema = { ...prev };
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!schema[key]) {
          schema[key] = {};
        }
        schema = schema[key];
      }
      schema[lastKey] = value;
      return { ...prev, ...schema };
    });
  }

  async function next() {
    await ctx.axios.post('/buyer', buyerDetails);
    setBuyerDetails_(buyerDetails);
    navigate('/cart/payment');
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className='flex flex-col items-center gap-[1rem] m-[2rem]'>
        <span className={errMsg ? 'w-full rounded bg-red-200 text-red-700 font-medium mb-2 p-2' : 'hidden'}>{errMsg}</span>
        <h1 className='self-start text-xl font-bold'>Customer Details</h1>
        <div className='flex flex-col gap-[1rem] shadow-2xl p-[2rem]'>
          <div className="grid grid-cols-3 gap-[2rem]">
            <div className="flex flex-col">
              <label htmlFor="firstName" className='font-medium'>First name</label>
              <input
                id='firstName'
                type='text'
                name='fullName.firstName'
                required
                value={buyerDetails.fullName.firstName}
                onChange={handleChange}
                className='w-full border px-3 py-2'
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="firstName" className='font-medium'>Middle name (optional)</label>
              <input
                id='firstName'
                type='text'
                name='fullName.middleName'
                required
                value={buyerDetails.fullName.middleName}
                onChange={handleChange}
                className='border px-3 py-2'
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="firstName" className='font-medium'>Last name</label>
              <input
                id='firstName'
                type='text'
                name='fullName.lastName'
                required
                value={buyerDetails.fullName.lastName}
                onChange={handleChange}
                className='border px-3 py-2'
              />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-x-[2rem] gap-y-[0.5rem]'>
            <div className='flex flex-col'>
              <label htmlFor="address" className='font-medium'>Residental Address</label>
              <input
                type='text'
                placeholder='ZIP / Postal code'
                name='address.zip'
                required
                value={buyerDetails.address.zip}
                onChange={handleChange}
                className='w-full border px-2 py-1'
              />
            </div>
            <div className='flex flex-col mt-[1.5rem]'>
              <input
                type='text'
                placeholder='Address Line 1'
                name='address.addressLine1'
                required
                value={buyerDetails.address.addressLine1}
                onChange={handleChange}
                className='w-full border px-2 py-1'
              />
            </div>
            <input
              type='text'
              placeholder='Address Line 2 (optional)'
              name='address.addressLine2'
              value={buyerDetails.address.addressLine2}
              onChange={handleChange}
              className='w-full border px-2 py-1'
            />
            <input
              type='text'
              placeholder='City / Town'
              name='address.city'
              required
              value={buyerDetails.address.city}
              onChange={handleChange}
              className='w-full border px-2 py-1'
            />
            <input
              type='text'
              placeholder='State / Province / Region'
              name='address.state'
              required
              value={buyerDetails.address.state}
              onChange={handleChange}
              className='w-full border px-2 py-1'
            />
            <div className='flex flex-col'>
              <select
                name='address.country'
                required
                value={buyerDetails.address.country}
                onChange={e => { handleChange(e); handleChange({ target: { name: 'citizenship', value: e.target.value } }) }}
                className='bg-white border border-gray-300 p-[0.5rem]'
              >
                <option value='' disabled>country</option>
                {countries.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className='flex flex-col'>
              <label htmlFor="phone" className='font-medium'>Phone</label>
              <input
                id='phone'
                type='text'
                placeholder='+420'
                name='phone'
                required
                value={buyerDetails.phone}
                onChange={handleChange}
                className='w-full border px-2 py-1'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="email" className='font-medium'>Email</label>
              <input
                id='email'
                type='text'
                placeholder='@'
                name='email'
                required={true}
                value={buyerDetails.email}
                onChange={handleChange}
                className='w-full border px-2 py-1'
              />
            </div>
          </div>
        </div>
        <div className="flex gap-[30rem] mt-[1rem]">
          <Link to='/cart' className="font-medium bg-blue-500 rounded text-gray-100 px-4 py-2">Back to Summary</Link>
          <button onClick={next} className="font-medium bg-yellow-500 rounded text-gray-100 px-4 py-2">Next to Payment</button>
        </div>
      </div>
    </div>
  )
}

const COUNTRIES = [
  'Argentina',
  'Burkina Faso',
  'Czech Republic',
  'Denmark',
  'El Salvador',
  'Fiji',
  'Germany',
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

export default Shipping;