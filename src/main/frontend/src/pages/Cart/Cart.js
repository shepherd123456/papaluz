import { Route, Routes } from 'react-router-dom'

import CartLayout from './shared/CartLayout';

import Shipping from './Shipping/Shipping';
import Summary from './Summary/Summary';
import Payment from './Payment/Payment';

function Cart() {
  return (
    <Routes>
      <Route path='/' element={<CartLayout />}>

        <Route index element={<Summary />} />

        <Route path='shipping' element={<Shipping />} />

        <Route path='payment' element={<Payment />} />

      </Route>
    </Routes>
  )
}

export default Cart