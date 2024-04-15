import { Route, Routes } from 'react-router-dom'

import HomeLayout from './shared/HomeLayout'
import ViewProduct from '../Products/ViewProduct';

function Products() {
  return (
    <Routes>
      <Route path='/' element={<HomeLayout />}>
        <Route path='view' element={<ViewProduct />} />
      </Route>
    </Routes>
  )
}

export default Products