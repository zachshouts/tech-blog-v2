import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Homepage, Login } from './pages';
import { UserAuthProvider } from './context/UserAuth';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient} >
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
    </QueryClientProvider>
  );
}

export default App;
