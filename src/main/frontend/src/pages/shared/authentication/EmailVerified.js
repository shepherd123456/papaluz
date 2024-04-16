import { useEffect, useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { useCtx } from '../../../hooks/context/useCtx';

function EmailVerified() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const { ctx } = useCtx();

  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    async function verify(token) {
      try {
        await ctx?.axios.get(`/email-verified?token=${token}`);
        navigate('/');
      } catch (err) {
        if (err?.response) {
          console.log(err);
          if (err.response.status === 401 || err.response.status === 403) {
            setErrMsg('token is either expired or wrong. Try again');
          } else {
            setErrMsg('email verification error');
          }
        }
      }
    }
    verify(params.get('token'));
  }, [ctx, params])

  return (
    <div className='h-screen w-screen flex justify-center items-center bg-sky-600'>
      <div className='min-w-[28rem] bg-sky-800 text-white text-2xl p-[1.5rem]'>
        {errMsg ? (
          <div>
            {errMsg}
          </div>
        ) : (
          <div>
            You have been successfully registered. You can now <br /><Link to='/sign-in' className='text-sky-300'>Sign in</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmailVerified