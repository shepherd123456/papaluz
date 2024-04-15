import { Route, Routes } from 'react-router-dom'

import DashboardLayout from './shared/DashboardLayout';

import Products from './Products/Products';
import Wysiwyg from './Products/Wysiwyg/Wysiwyg';

import Orders from './Orders/Orders';
import Customers from './Customers/Customers';

function Dashboard() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>

        <Route path='products'>
          <Route index element={<Products />} />
          <Route path="create-update" element={<Wysiwyg />} />
        </Route>

        <Route path="orders" element={<Orders />} />

        <Route path="customers" element={<Customers />} />

      </Route>
    </Routes>
  )
}

export default Dashboard