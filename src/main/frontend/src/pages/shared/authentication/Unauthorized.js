import { useNavigate } from 'react-router-dom'

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className=''>
      <h1>Unauthorized</h1>
      <span>You dont have access to the requested page.</span>
      <br />
      <button className='bg-yellow-500 rounded text-white px-2 py-1 m-1' onClick={() => navigate(-1)}>Go Back</button>
    </div>
  )
}

export default Unauthorized