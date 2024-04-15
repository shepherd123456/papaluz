import { useCtx } from '../context/useCtx';

import axios from 'axios';

function useRefreshToken() {
  const { ctx, setCtx } = useCtx();

  async function refresh() {
    const res = await axios.get(`${ctx.baseURL}/refresh`, {
      withCredentials: true,
    });
    const accessToken = res.data;
    setCtx(prev => ({ ...prev, accessToken }));
    return accessToken;
  }

  return refresh;
}

export default useRefreshToken;