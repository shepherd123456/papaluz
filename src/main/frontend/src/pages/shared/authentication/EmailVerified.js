import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useCtx } from '../../../hooks/context/useCtx';

function EmailVerified() {
  const [params, setParams] = useSearchParams();
  const { ctx } = useCtx();

  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    async function verify(token) {
      try {
        const res = await ctx?.axios.get(`/email-verified?token=${token}`);
        if (res?.status === 200) {
          setSuccess(true);
        }
      } catch (err) {
        setSuccess(false);
        console.log(err);
        if (!err.response) {
          setErrMsg('no server response');
        } else if (err.response.status === 401 || err.response.status === 403) {
          setErrMsg('token is either expired or wrong. Try again');
        } else {
          setErrMsg('email verification error');
        }
      }
    }
    verify(params.get('token'));
  }, [ctx, params])

  return (
    <div className='h-screen w-screen flex justify-center items-center bg-sky-600'>
      <div className='min-w-[28rem] bg-sky-800 text-white text-2xl p-[1.5rem]'>
        {success ? (
          <div>
            You have been successfully registered. You can now <br /><Link to='/sign-in' className='text-sky-300'>Sign in</Link>
          </div>
        ) : (
          <div>
            {errMsg}
          </div>
        )}
      </div>
    </div>
  )
}

export default EmailVerified