import { createContext, useContext, useState } from "react";
import config from '../../config.json';

const Ctx = createContext();

export function useCtx() {
  return useContext(Ctx);
}

export function CtxProvider({ children }) {
  const [ctx, setCtx] = useState(config);

  return (
    <Ctx.Provider value={{
      ctx,
      setCtx
    }}>
      {children}
    </Ctx.Provider>
  )
}