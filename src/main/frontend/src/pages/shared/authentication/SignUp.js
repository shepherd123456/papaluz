import React, { useEffect, useState } from 'react'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import { useCtx } from '../../../hooks/context/useCtx';

const EMAIL_REGEX = /^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function SignUp() {
  const { ctx } = useCtx();

  const [email, setEmail] = useState('');
  const [validName, setValidName] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setValidName(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [email, pwd, matchPwd]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await ctx.axios.post('/sign-up', {
        email,
        password: pwd
      });
      if (res.status === 200) {
        setSuccess(true);
      }
    } catch (err) {
      setSuccess(false);
      console.log(err);
      if (!err.response) {
        setErrMsg('no server response');
      } else if (err.response.status === 400) {
        setErrMsg('missing email or password');
      } else if (err.response.status === 409) {
        setErrMsg('email already taken')
      } else if (err.response.status === 500) {
        console.log(err.response.data.message);
      } else {
        setErrMsg('registration failure');
      }
    }
  }

  return (
    <div className='h-screen w-screen flex justify-center items-center bg-sky-600'>
      <div className='min-w-[28rem] bg-sky-800 text-white text-2xl p-[1.5rem]'>
        {success ? (
          <div className='flex justify-center items-center'>
            <div className='p-[1rem]'>Email verification link send to <span className='underline'>{email}</span></div>
          </div>
        ) : (
          <div>
            <form onSubmit={handleSubmit} className='flex flex-col items-start'>
              <span className={errMsg ? 'w-full rounded bg-red-200 text-red-700 font-medium mb-2 p-2' : 'hidden'}>{errMsg}</span>
              <span className='text-[2rem]'>Sign Up</span>
              <label className=' mt-[1.5rem] font-light' htmlFor="email">
                Email:
                <span className={`ml-1 ${validName ? 'text-green-500' : 'hidden'}`}><FontAwesomeIcon icon={faCheck} /></span>
                <span className={`ml-1 ${validName || !email ? 'hidden' : 'text-red-500'}`}><FontAwesomeIcon icon={faTimes} /></span>
              </label>
              <input
                type='text'
                onChange={e => setEmail(e.target.value)}
                value={email}
                id='email'
                autoComplete='off'
                required
                className='w-full text-black rounded-lg focus:outline-none p-1'
              />
              <span className={email && !validName ? instructionStyle : 'hidden'}>
                <FontAwesomeIcon icon={faInfoCircle} />
                {/* 4 to 24 characters. <br />
                Must begin with a letter. <br />
                Letters, numbers, underscores, hyphens allowed. */}
                Must be valid email
              </span>
              <label className='mt-[1.5rem] font-light' htmlFor="password">
                Password:
                <span className={`ml-1 ${validPwd ? 'text-green-500' : 'hidden'}`}><FontAwesomeIcon icon={faCheck} /></span>
                <span className={`ml-1 ${validPwd || !pwd ? 'hidden' : 'text-red-500'}`}><FontAwesomeIcon icon={faTimes} /></span>
              </label>
              <input
                type='password'
                value={pwd}
                onChange={e => setPwd(e.target.value)}
                id='password'
                autoComplete='off'
                required
                className='w-full text-black rounded-lg focus:outline-none p-1'
              />
              <span className={pwd && !validPwd ? instructionStyle : 'hidden'}>
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters. <br />
                Must include uppercase and lowercase letters. <br />
                a number and a special character: !,@,#,$,% <br />
              </span>
              <label className='mt-[1.5rem] font-light' htmlFor="confirm">
                Confirm Password:
                <span className={`ml-1 ${validMatch && matchPwd ? 'text-green-500' : 'hidden'}`}><FontAwesomeIcon icon={faCheck} /></span>
                <span className={`ml-1 ${validMatch || !matchPwd ? 'hidden' : 'text-red-500'}`}><FontAwesomeIcon icon={faTimes} /></span>
              </label>
              <input
                type='password'
                value={matchPwd}
                onChange={e => setMatchPwd(e.target.value)}
                id='confirm'
                autoComplete='off'
                required
                className='w-full text-black rounded-lg focus:outline-none p-1'
              />
              <span className={!validMatch ? instructionStyle : 'hidden'}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field
              </span>
              <button
                disabled={!validName || !validPwd || !validMatch ? true : false}
                className='w-full bg-gray-100 hover:bg-gray-300 disabled:bg-white/60 rounded-lg text-black font-light mt-[1.5rem] p-1.5'>
                Sign Up
              </button>
            </form>
            <div className='flex flex-col text-[1.2rem] mt-[1rem]'>
              <span>Already registered?</span>
              <Link to='/sign-in' className='underline'>Sing in</Link>
            </div>
          </div>
        )}
      </div>
    </div >
  )
}

const instructionStyle = 'w-full relative top-1 text-sm rounded-lg bg-black text-white p-2';

export default SignUp