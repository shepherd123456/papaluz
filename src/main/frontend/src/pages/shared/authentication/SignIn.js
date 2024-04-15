import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useCtx } from '../../../hooks/context/useCtx';
import { useLocallyStoredInput, useLocallyStoredCheckbox } from '../../../hooks/localStorage/useLocalStorage';

function SignIn() {
  const { ctx, setCtx } = useCtx();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || '/';

  const [email, resetEmail, inputAttrs] = useLocallyStoredInput('email');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  // const checkboxAttrs = useLocallyStoredCheckbox('persist'); // TRUST THIS DEVICE - in case you want to remember email even after refresh, not needed for now

  useEffect(() => {
    setErrMsg('');
  }, [email, pwd]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // const res = await axios.post(`${ctx.baseURL}/sign-in`, {
      const res = await ctx.axios.post('/sign-in', {
        email,
        password: pwd
      });
      setCtx(prev => ({ ...prev, accessToken: res.data }));
      resetEmail();
      setPwd('');
      navigate(from, { replace: true });
    } catch (err) {
      if (!err.response) {
        setErrMsg('No Server Response');
        console.log(err);
      } else if (err.response.status === 401 || err.response.status === 403) {
        setErrMsg('unauthorized');
      } else {
        setErrMsg('login failure');
      }
    }
  }

  return (
    <div className='h-screen w-screen flex justify-center items-center bg-sky-600'>
      <div className='min-w-[28rem] bg-sky-800 text-white text-2xl p-[1.5rem]'>
        <form onSubmit={handleSubmit} className='flex flex-col items-start'>
          <span className={errMsg ? 'w-full rounded bg-red-200 text-red-700 font-medium mb-2 p-2' : 'hidden'}>{errMsg}</span>
          <span className='text-[2rem]'>Sign In</span>
          <label className=' mt-[1.5rem] font-light' htmlFor="email">Email:</label>
          <input
            type='text'
            id='email'
            autoComplete='off'
            {...inputAttrs}
            required
            className='w-full text-black rounded-lg focus:outline-none p-1'
          />
          <label className='mt-[1.5rem] font-light' htmlFor="password">Password:</label>
          <input
            type='password'
            id='password'
            autoComplete='off'
            onChange={e => setPwd(e.target.value)}
            value={pwd}
            required
            className='w-full text-black rounded-lg focus:outline-none p-1'
          />
          <button className='w-full bg-gray-100 hover:bg-gray-300 rounded-lg text-black font-light mt-[1.5rem] p-1.5'>Sign In</button>
          {/* <div className='flex items-center gap-2 mt-[1rem]'>
            <input
              type='checkbox'
              id='persist'
              {...checkboxAttrs}
              className='w-[1.5rem] h-[1.5rem]'
            />
            <label htmlFor="persist" className='text-sm'>Trust This Device</label>
          </div> */}
        </form>
        <div className='flex flex-col text-[1.2rem] mt-[1rem]'>
          <span>Need an Account?</span>
          <Link to='/sign-up' className='underline'>Sing up</Link>
        </div>
      </div>
    </div>
  )
}

export default SignIn