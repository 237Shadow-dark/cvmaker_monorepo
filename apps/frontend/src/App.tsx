   import './App.css'
import { Routes,Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/login';
import SignUpPage from './pages/signup';
import Dashbord from './pages/dashbord';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';


function App() {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log('Authenticated User:', authUser);
   
  if(isCheckingAuth && !authUser){
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className = "animate-spin size-10"/>
      </div>
    );
  }
   return (
    <>
    <Routes>
      <Route path='/' element = { authUser ? <Dashbord/> : <Navigate to = "/login"/>}/>
      <Route path='/classFree' element = {null}/>
      <Route path='/login' element = { !authUser ? <LoginPage /> : <Navigate to = "/"/>}/>
      <Route path='/SignUp' element = { !authUser ? <SignUpPage /> : <Navigate to = "/"/>}/>
    </Routes>
    </>
  )
}

export default App;
