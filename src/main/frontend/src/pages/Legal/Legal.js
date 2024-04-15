import { Route, Routes } from "react-router-dom"

import LegalLayout from "./shared/LegalLayout"

import CustomerService from './CustomerService';
import TermsOfUse from "./TermsOfUse";

function Legal() {
  return (
    <Routes>
      <Route path='/' element={<LegalLayout />}>
        <Route index element={<CustomerService />} />
        <Route path='terms-of-use' element={<TermsOfUse />} />
      </Route>
    </Routes>
  )
}

export default Legal