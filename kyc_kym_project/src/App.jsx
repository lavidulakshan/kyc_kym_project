import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import KYCRegistration from './Components/KYCRegistration'
import SectionWithBackground from './Components/SectionWithBackground'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserProfile from './Components/UserProfile'
import HomePage from './Components/HomePage'
import AdminPage from './pages/AdminPage'
import Header from './Components/Header'
import Footer from './Components/Footer'




function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="kyc" element={<KYCRegistration />} />
        <Route path="userprofile" element={<UserProfile />} />
        <Route path="adminprofile" element={<AdminPage />} />

      </Routes>
      <Footer/>

    </BrowserRouter>
   
    
    
  


  )
}

export default App
