import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Home } from './components/home/home';
import { Login } from './components/Login/login';
import { SignUp } from './components/Signup/signup';
import {Navbar} from './components/navbar/navbar'
import './App.css';

function App() {
  return (
    <body className='App'>
      <Navbar/>
      <Home/>
    </body>
        
    
  );
}

export default App;
