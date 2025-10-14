//@ts-ignore
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import CreateUser from './CreatingUser/CreateUser';

export default function App() {
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Home" element={<HomePage  />} />
          <Route path="/CreateUser" element={<CreateUser  />} />
          {/* Add more routes as needed */} 
        </Routes>
      </BrowserRouter>
    </>
  )
}