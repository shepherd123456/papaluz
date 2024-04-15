import { faCommentDots, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useStore } from '../../../hooks/store/useStore';
import useLogout from '../../../hooks/authentication/useLogout';

function Header() {
  const logout = useLogout();

  const search = useStore(state => state.dashboard.search);
  const setSearch = useStore(state => state.dashboard.setSearch);

  const [profileLinks, setProfileLinks] = useState(PROFILE_LINKS);
  const [showProfileLinks, setShowProfileLinks] = useState(false);
  const [message, setMessage] = useState('the message');
  const [showMessages, setShowMessages] = useState(false);
  const [reply, setReply] = useState('');

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setShowMessages(false);
        setShowProfileLinks(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  async function replySubmitted(e) {
    e.preventDefault();
    console.log(reply);
    setShowMessages(false);
    setReply('');
  }

  return (
    <div className="h-[4rem] w-full flex items-center justify-between bg-white border-b p-[1rem]">
      <div className='border'>
        <FontAwesomeIcon icon={faMagnifyingGlass} className='text-gray-400 mx-[1rem]' />
        <input
          type='search'
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder='Search'
          className='h-[2.5rem] w-[22rem] focus:outline-none text-sm'
        />
      </div>
      <div className='flex items-center gap-[2rem] p-[0.5rem]'>
        <button onClick={() => setShowMessages(prev => !prev)}>
          <FontAwesomeIcon icon={faCommentDots} className='text-gray-600 h-[1.5rem]' />
        </button>
        <div onClick={() => setShowMessages(false)} className={`fixed top-0 right-0 w-full h-full bg-black/10 ${!showMessages ? 'invisible' : ''}`}>
          <div onClick={e => e.stopPropagation()} className={`absolute top-[4.5rem] ${showMessages ? 'right-[0.5rem]' : '-translate-x-full'} w-[18rem] bg-white rounded-sm border border-gray-300 p-[0.5rem]`}>
            <span className='font-medium'>Message</span>
            <form onSubmit={replySubmitted} className='flex flex-col items-start'>
              <label htmlFor='reply' className='text-sm my-[0.5rem]'>{message}</label>
              <textarea
                id='reply'
                value={reply}
                onChange={e => setReply(e.target.value)}
                placeholder='reply'
                className='w-full border rounded focus:outline-none p-1 text-sm'
              />
              <button className='w-full border rounded hover:bg-gray-50 text-xs p-1 mt-[0.5rem]'>Send</button>
            </form>
          </div>
        </div>
        <div onClick={() => setShowProfileLinks(false)} className={`fixed top-0 right-0 w-full h-full bg-black/10 ${!showProfileLinks ? 'invisible' : ''}`}>
          <div onClick={e => e.stopPropagation()} className={`absolute top-[4.5rem] ${showProfileLinks ? 'right-[0.5rem]' : '-translate-x-full'} w-[15rem] flex flex-col gap-2 items-center bg-white rounded-sm border border-gray-300 p-[0.5rem]`}>
            {profileLinks.map((link, i) => (
              <Link key={i} to={link.to} className='w-full text-center hover:bg-gray-100 rounded p-1'>
                {link.title}
              </Link>
            ))}
            <button onClick={async () => await logout()} className='w-full text-center hover:bg-gray-100 rounded p-1'>sign out</button>
          </div>
        </div>
      </div >
    </div >
  )
}

const PROFILE_LINKS = [
  {
    title: 'your profile',
    to: 'settings'
  },
]

export default Header