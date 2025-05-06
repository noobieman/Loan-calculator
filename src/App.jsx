import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './components/Home';

function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
     </Router>
    </>
  )
}

export default App
