import { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone";
import { useCtx } from "../../hooks/context/useCtx";
import { Link } from "react-router-dom";

function Personal() {
  const { ctx } = useCtx();

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
      region: ''
    },
    phone: '',
    citizenship: ''
  });
  const [profileImg, setProfileImg] = useState(null);
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [countries] = useState(COUNTRIES);
  const [months] = useState(MONTHS);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setProfileImg(acceptedFiles[0]);
      uploadProfileImg(acceptedFiles[0]);
    }
  });

  useEffect(() => {
    async function loadUserDetail() {
      try {
        const res = await ctx.axios.get('/userdetail')
        const obj = res.data;
        console.log(obj);
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
    async function loadProfileImage() {
      try {
        const res = await ctx.axios.get('/settings/personal/profileImage', {
          responseType: 'arraybuffer'
        });
        const contentType = res.headers['content-type'];
        setProfileImg(new Blob([res.data], { type: contentType }));
      } catch (err) {
        if (!err.response) {
          setErrMsg('No server response');
        } else if (err.response.status === 404) {
          return; // good, new product
        } else {
          setErrMsg('receiving product primary image failed');
        }
      }
    }
    loadUserDetail();
    loadProfileImage();
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

  async function uploadProfileImg(file) {
    const formData = new FormData();
    formData.append("profileImage", file);
    const res = await ctx.axios.post('/settings/personal/profileImage', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log(res.data);
    return res.data;
  }

  async function save() {
    console.log(userDetails);
    await ctx.axios.post('/userdetail', userDetails);
    setSuccess(true);
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-end m-[2rem]">
        <div {...getRootProps()} className="w-[5rem] h-[5rem] rounded-full cursor-pointer">
          <input {...getInputProps()} />
          {profileImg ? (
            <img src={URL.createObjectURL(profileImg)} />
          ) : (
            <span>profile image</span>
          )}
        </div>
      </div>
      <div className="self-center flex flex-col gap-[1rem] m-[1rem]">
        <span className={errMsg ? 'w-full rounded bg-red-200 text-red-700 font-medium mb-2 p-2' : 'hidden'}>{errMsg}</span>
        <h1 className="text-2xl">Personal Details</h1>
        <div className="flex justify-between">
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
                    <option key={i} value={c}>{c}</option>
                  ))}
                </select>
              </div>
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
                  <option value='' disabled>Select Country</option>
                  {countries.map((c, i) => (
                    <option key={i} value={c}>{c}</option>
                  ))}
                </select>
              </div>
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
            </div>
          </div>
        </div>
        <div className="self-end">
          <button onClick={save} className='bg-yellow-500 rounded text-white px-4 py-2'>Save</button>
        </div>
        <div className={`${success ? 'visible' : 'hidden'} self-center  rounded bg-green-200 text-green-700 font-medium mb-2 p-2`}>
          Personal Details updated successfully. return <Link to='/' className="font-medium underline text-blue-500">Home</Link>
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

export default Personal