import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import config from './config.json';
import { useCtx } from "./hooks/context/useCtx";
import useAxios from "./hooks/authentication/useAxios";

import Layout from './pages/shared/Layout';

import Unauthorized from "./pages/shared/authentication/Unauthorized";
import RequireAuth from "./pages/shared/authentication/RequireAuth";
import SignUp from "./pages/shared/authentication/SignUp";
import EmailVerified from "./pages/shared/authentication/EmailVerified";
import SignIn from "./pages/shared/authentication/SignIn";

import Home from './pages/Home/Home';
import Products from "./pages/Home/Products/Products";
import Dashboard from './pages/Dashboard/Dashboard';
import Seller from './pages/Seller/Seller';
import Settings from './pages/Settings/Settings';
import Cart from "./pages/Cart/Cart";
import Legal from './pages/Legal/Legal';

function App() {
  const { setCtx } = useCtx();
  const axios = useAxios(config);

  useEffect(() => {
    setCtx({
      ...config,
      axios
    });
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route path='/' element={<Home />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="email-verified" element={<EmailVerified />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path='unauthorized' element={<Unauthorized />} />

        <Route path='products/*' element={<Products />} />

        <Route element={<RequireAuth atleastRoles={['SELLER']} />}>
          <Route path="dashboard/*" element={<Dashboard />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="seller/*" element={<Seller />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path='settings/*' element={<Settings />} />
        </Route>

        <Route path='cart/*' element={<Cart />} />

        <Route path='legal/*' element={<Legal />} />

      </Route>
    </Routes>
  );
}

export default App;
