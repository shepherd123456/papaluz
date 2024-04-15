import { Route, Routes } from 'react-router-dom'

import SellerLayout from './shared/SellerLayout';
import RequireAuth from '../../pages/shared/authentication/RequireAuth';

import Register from './Register/Register';

function Seller() {
  return (
    <Routes>
      <Route path='/' element={<SellerLayout />}>

        <Route element={<RequireAuth forbiddenRoles={['SELLER']} />} >
          <Route index element={<Register />} />
        </Route>

      </Route>
    </Routes>
  )
}

export default Seller