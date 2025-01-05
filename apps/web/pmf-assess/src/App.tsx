import { Routes, Route, Navigate } from 'react-router';
import AuthLayout from './Layouts/AuthLayout';
import Dashboard from './pages/Dashboard';
import Templates from './pages/Templates/Templates';
import TemplateDetailedPage from './pages/Templates/TemplateDetails';
import CreateTemplate from './pages/Templates/CreateTemplate';
import Assignments from './pages/Assignments/Assignments';
import CreateAssignment from './pages/Assignments/CreateAssignment';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTemplates } from './redux/fetchTemplatesSlice';
import AssignmentDetails from './pages/Assignments/AssignmentDetails';
import GetStarted from './Layouts/GetStarted';
import Test from './pages/Test';

const App = () => {
  const dispatch = useDispatch();
  const role = localStorage.getItem('role');

  useEffect(() => {
    dispatch(fetchTemplates());
  }, [dispatch]);

  console.log("role",role)

  return (
    <>
      <Routes>
        <Route path='/get-started' element={<GetStarted />} />
        {role === null && <Route path='*' element={<Navigate to='/get-started' replace />} />}
      </Routes>
      {role !== null && (
        <div className='flex'>
          <AuthLayout />
          <div className='w-full'>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/templates' element={<Templates />} />
              <Route path='/templates/:id' element={<TemplateDetailedPage />} />
              <Route path='/templates/create-template/:id' element={<CreateTemplate />} />
              <Route path='/assignments' element={<Assignments />} />
              <Route path='/assignments/new/:id/:template' element={<CreateAssignment />} />
              <Route path='/assignments/:id' element={<AssignmentDetails />} />
              <Route path='/test/:id' element={<Test />} />
            </Routes>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
