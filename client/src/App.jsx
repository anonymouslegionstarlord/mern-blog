import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  
        <Route path="/projects" element={<Projects />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  )
}

export default App
