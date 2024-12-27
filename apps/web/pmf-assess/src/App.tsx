
 import {Routes,Route,Navigate} from 'react-router' 

import AuthLayout from './Layouts/AuthLayout'
import Dashboard from './pages/Dashboard';
import Templates from './pages/Templates/Templates';
import TemplateDetailedPage from './pages/Templates/TemplateDetails';
import CreateTemplate from './pages/Templates/CreateTemplate';


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
          <Route path='/templates/:id' element={<TemplateDetailedPage /> } />
          <Route path='/templates/create-template' element={<CreateTemplate />} />
        </Routes>
      </div>
    </div>
  )
}


export default App;