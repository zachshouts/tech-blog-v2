import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Homepage, Login } from './pages';
import { UserAuthProvider } from './context/UserAuth';


function App() {

  return (
    <UserAuthProvider>
      <BrowserRouter>
        <main>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </main>
      </BrowserRouter>
    </UserAuthProvider>
  )
}

export default App
