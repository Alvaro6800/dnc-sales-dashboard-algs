import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<>Login</>} />
        <Route path="/cadastro" element={<>Cadastro</>} />
        <Route path="/home" element={<>Home</>} />
        <Route path="/leads" element={<>Leads</>} />
        <Route path="/perfil" element={<>Perfil</>} />
      </Routes>
    </Router>
  )
}

export default App
