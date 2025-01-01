
 import {Routes,Route,Navigate} from 'react-router' 

import AuthLayout from './Layouts/AuthLayout'
import Dashboard from './pages/Dashboard';
import Templates from './pages/Templates/Templates';
import TemplateDetailedPage from './pages/Templates/TemplateDetails';
import CreateTemplate from './pages/Templates/CreateTemplate';
import Assignments from './pages/Assignments/Assignments';
import CreateAssignment from './pages/Assignments/CreateAssignment';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTemplates } from './redux/fetchTemplatesSlice';


const App = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchTemplates())
  })
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
          <Route path='/templates/create-template/:id' element={<CreateTemplate />} />
          <Route path='/assignments' element={<Assignments />} />
          <Route path='/assignments/new/:id/:template' element={<CreateAssignment />} />
        </Routes>
      </div>
    </div>
  )
}


export default App;