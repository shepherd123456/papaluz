import { useNavigate } from 'react-router-dom';
import { useCtx } from '../context/useCtx';

function useLogout() {
  const navigate = useNavigate();
  const { ctx, setCtx } = useCtx();

  async function logout() {
    setCtx(prev => ({ ...prev, accessToken: '' }));
    try {
      await ctx.axios.get('/logout');
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }

  return logout;
}

export default useLogout;