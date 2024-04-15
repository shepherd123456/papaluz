import { useEffect, useState } from 'react'
import { useCtx } from '../../../hooks/context/useCtx';
import { useNavigate } from 'react-router-dom';
import useLogout from '../../../hooks/authentication/useLogout';

function Register() {
  const navigate = useNavigate();

  const { ctx, setCtx } = useCtx();
  const logout = useLogout();

  const [userDetails, setUserDetails] = useState({
    fullName: {
      firstName: '',
      middleName: '',
      lastName: ''
    },
    birth: {
      day: '',
      month: '',
      year: ''
    },
    address: {
      zip: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      country: ''
    },
    phone: '',
    citizenship: '',
  });
  const [countries, setCountries] = useState(COUNTRIES);
  const [months, setMonths] = useState(MONTHS);

  useEffect(() => {
    async function loadUserDetail() {
      try {
        const res = await ctx.axios.get('/userdetail')
        const obj = res.data;
        for (let key in obj) {
          if (obj[key] === null && userDetails.hasOwnProperty(key)) {
            obj[key] = JSON.parse(JSON.stringify(userDetails[key]));
          }
        }
        setUserDetails(obj);
      } catch (err) {
        console.log(err);
        if (err.response?.status === 404) {
          console.log('no userDetails');
        } else {
          console.log(err);
        }
      }
    }
    loadUserDetail();
  }, [])

  const handleChange = e => {
    const { name, value } = e.target;
    const keys = name.split('.');
    setUserDetails(prev => {
      let schema = { ...prev };
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!schema[key]) {
          schema[key] = {};
        }
        schema = schema[key];
      }
      schema[keys[keys.length - 1]] = value;
      return { ...prev, ...schema };
    });
  }

  async function next() {
    console.log(userDetails);
    const res = await ctx.axios.post('/seller', userDetails);
    setCtx(prev => ({ ...prev, accessToken: res.data }));
    navigate('/dashboard');
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className='flex flex-col items-center gap-[1rem] m-[2rem]'>
        <h1 className='self-start text-xl font-bold'>Primary contact person information</h1>
        <div className='flex flex-col gap-[1rem] shadow-2xl p-[2rem]'>
          <div className="grid grid-cols-3 gap-[2rem]">
            <div className="flex flex-col">
              <label htmlFor="firstName" className='font-medium'>First name</label>
              <input
                id='firstName'
                type='text'
                name='fullName.firstName'
                value={userDetails.fullName.firstName}
                onChange={handleChange}
                className='w-full border px-3 py-2'
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="firstName" className='font-medium'>Middle name</label>
              <input
                id='firstName'
                type='text'
                name='fullName.middleName'
                value={userDetails.fullName.middleName}
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
                value={userDetails.fullName.lastName}
                onChange={handleChange}
                className='border px-3 py-2'
              />
            </div>
          </div>
          <p className='text-sm'>Enter you complete name, as it appears on the passport or ID</p>
          <div className='grid grid-cols-2 gap-x-[2rem] gap-y-[0.5rem]'>
            <div className='flex flex-col'>
              <label htmlFor="citizenship" className='font-medium'>Country of citizenship</label>
              <select
                id='citizenship'
                name='citizenship'
                value={userDetails.citizenship}
                onChange={handleChange}
                className='bg-white border border-gray-300 p-[0.5rem]'
              >
                <option value='' disabled>Select country</option>
                {countries.map((c, i) => (
                  <option key={i} value={c}>
                    {/* {c.replace(/_/g, ' ').replace(/(?: |\b)(\w)/g, f => f.toUpperCase())} */}
                    {c}
                  </option>
                ))}
              </select>
            </div>
            {/* <div></div> */}
            {/* <div className='flex flex-col'>
              <label htmlFor="birthCountry" className='font-medium'>Country of birth</label>
              <select
                id='birthCountry'
                name='birthCountry'
                value={sellerInfo.birthCountry}
                onChange={handleChange}
                className='bg-white border border-gray-300 p-[0.5rem]'
              >
                <option value='' disabled >Select country</option>
                {countries.map((c, i) => (
                  <option key={i} value={c}>
                    {c.replace(/_/g, ' ').replace(/(?: |\b)(\w)/g, f => f.toUpperCase())}
                  </option>
                ))}
              </select>
            </div> */}
            <div className='flex flex-col'>
              <label htmlFor="birth" className='font-medium'>Date of birth</label>
              <div className='grid grid-cols-3 gap-[0.25rem]'>
                <select
                  id='day'
                  name='birth.day'
                  value={userDetails.birth.day}
                  onChange={handleChange}
                  className=' bg-white border border-gray-300 p-[0.5rem]'
                >
                  <option value='' disabled >Day</option>
                  {Array(31).fill(0).map((_, i) => (
                    <option key={i} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
                <select
                  id='month'
                  name='birth.month'
                  value={userDetails.birth.month}
                  onChange={handleChange}
                  className=' bg-white border border-gray-300 p-[0.5rem]'
                >
                  <option value='' disabled >Month</option>
                  {months.map((m, i) => (
                    <option key={i} value={m}>{m}</option>
                  ))}
                </select>
                <select
                  id='year'
                  name='birth.year'
                  value={userDetails.birth.year}
                  onChange={handleChange}
                  className=' bg-white border border-gray-300 p-[0.5rem]'
                >
                  <option value='' disabled >Year</option>
                  {[...Array(60).keys()].map(i => (
                    <option key={i} value={1950 + i}>{1950 + i}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className='flex flex-col mt-[2rem]'>
              <label htmlFor="address" className='font-medium'>Residental Address</label>
              <input
                id='zip'
                type='text'
                placeholder='ZIP / Postal code'
                name='address.zip'
                value={userDetails.address.zip}
                onChange={handleChange}
                className='w-full border px-2 py-1'
              />
            </div>
            <div className='flex flex-col mt-[3.5rem]'>
              <input
                id='line1'
                type='text'
                placeholder='Address Line 1'
                name='address.addressLine1'
                value={userDetails.address.addressLine1}
                onChange={handleChange}
                className='w-full border px-2 py-1'
              />
            </div>
            <input
              id='line2'
              type='text'
              placeholder='Address Line 2'
              name='address.addressLine2'
              value={userDetails.address.addressLine2}
              onChange={handleChange}
              className='w-full border px-2 py-1'
            />
            <input
              id='city'
              type='text'
              placeholder='City / Town'
              name='address.city'
              value={userDetails.address.city}
              onChange={handleChange}
              className='w-full border px-2 py-1'
            />
            <input
              id='state'
              type='text'
              placeholder='State / Province / Region'
              name='address.state'
              value={userDetails.address.state}
              onChange={handleChange}
              className='w-full border px-2 py-1'
            />
            <div className='flex flex-col'>
              <select
                id='country'
                name='address.country'
                value={userDetails.address.country}
                onChange={handleChange}
                className='bg-white border border-gray-300 p-[0.5rem]'
              >
                <option value='' disabled></option>
                {countries.map((c, i) => (
                  <option key={i} value={c}>
                    {/* {c.replace(/_/g, ' ').replace(/(?: |\b)(\w)/g, f => f.toUpperCase())} */}
                    {c}
                  </option>
                ))}
              </select>
            </div>
            {/* <div></div> */}
            <div className='flex flex-col'>
              <label htmlFor="phone" className='font-medium'>Phone number for verification</label>
              <input
                id='phone'
                type='text'
                placeholder='+420'
                name='phone'
                value={userDetails.phone}
                onChange={handleChange}
                className='w-full border px-2 py-1'
              />
            </div>
            {/* <button onClick={onSmsSend} className='bg-sky-600 hover:bg-sky-800 text-white mt-[1.5rem]'>
              Send SMS
            </button> */}
          </div>
        </div>
        <button onClick={next} className='w-[50%] bg-sky-600 hover:bg-sky-800 text-white py-1 mt-[1rem]'>Next</button>
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

export default Register