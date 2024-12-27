
 import {Routes,Route,Navigate} from 'react-router' 

import AuthLayout from './Layouts/AuthLayout'
import Dashboard from './pages/Dashboard';
import Templates from './pages/Templates/Templates';
import TemplateDetailedPage from './pages/Templates/TemplateDetails';


const App = () => {
  return (
    <div className='flex'>
      <AuthLayout />
      <div className='w-full'>
        <Routes>
          <Route path='' element={<Dashboard />} />
        </Routes>
        <Routes>
          <Route path='/templates' element={<Templates />} />
          <Route path='/template/:id' element={<TemplateDetailedPage /> } />
        </Routes>
      </div>
    </div>
  )
}


export default App;