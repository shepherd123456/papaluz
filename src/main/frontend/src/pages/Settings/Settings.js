import { Route, Routes } from 'react-router-dom'

import SettingsLayout from './shared/SettingsLayout';

import Account from './Account';
import Personal from './Personal';

function Settings() {
  return (
    <Routes>
      <Route path='/' element={<SettingsLayout />}>

        <Route index element={<Account />} />

        <Route path='personal' element={<Personal />} />

      </Route>
    </Routes>
  )
}

export default Settings