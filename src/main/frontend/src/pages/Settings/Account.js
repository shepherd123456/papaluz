import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCtx } from "../../hooks/context/useCtx";
import useLogout from "../../hooks/authentication/useLogout";

const EMAIL_REGEX = /^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Account() {
  const logout = useLogout();

  const { ctx } = useCtx();
  const oldEmail = ctx?.accessToken ? jwtDecode(ctx.accessToken).context.email : undefined;

  const [email, setEmail] = useState(oldEmail);
  const [validName, setValidName] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState('');

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
      await ctx.axios.put('/users', {
        email,
        password: pwd
      });
      logout();
    } catch (err) {
      console.log(err);
      if (!err.response) {
        setErrMsg('no server response');
      } else if (err.response.status === 400) {
        setErrMsg('missing email or password');
      } else if (err.response.status === 409) {
        setErrMsg('this email already registered')
      } else if (err.response.status === 500) {
        console.log(err.response.data.message);
      } else {
        setErrMsg('account update failure');
      }
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center m-[1rem]">
      <h1 className="text-2xl">Change Account</h1>
      <div className="w-[35rem] flex flex-col gap-[1rem] shadow-2xl p-[2rem]">
        <form onSubmit={handleSubmit} className='flex flex-col items-start'>
          <span className={errMsg ? 'w-full rounded bg-red-200 text-red-700 font-medium mb-2 p-2' : 'hidden'}>{errMsg}</span>
          <label className='font-light' htmlFor="email">
            New email:
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
            New password:
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
            Confirm new password:
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
            Update
          </button>
        </form>
      </div>
    </div>
  )
}

const instructionStyle = 'w-full relative top-1 text-sm rounded-lg bg-black text-white p-2';

export default Account