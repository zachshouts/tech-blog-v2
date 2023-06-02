import { useState, useCallback } from 'react';
import { Input } from '../components';

interface FormDataState {
  name: string;
  email: string;
  password: string;
}

const Login = () => {
  const [ variant, setVariant ] = useState<'login' | 'register'>('login');
  const [ formData, setFormData ] = useState<FormDataState>({name: '', email: '', password: ''});


  const handleInputChange = ((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  })

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
  }, []);

  const login = () => {
    console.log('login');
  };

  const register = () => {
    console.log('register');
  };

  return (
    <div className="relative h-full w-full">
      <div className="w-full h-screen bg-gray-200 bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" className="h-12" alt="Logo" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-white bg-opacity-90 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-xl w-full drop-shadow-xl">
            <h2 className="text-4xl mb-8 font-semibold">
              {variant === 'login' ? 'Sign in' : 'Register'}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === 'register' && (
                <Input
                  id="name"
                  type="text"
                  label="Full Name"
                  value={formData.name}
                  onChange={handleInputChange} 
                />
              )}
              <Input
                id="email"
                type="email"
                label="Email"
                value={formData.email}
                onChange={handleInputChange} 
              />
              <Input
                type="password" 
                id="password" 
                label="Password" 
                value={formData.password}
                onChange={handleInputChange} 
              />
            </div>
            <button onClick={ variant === 'login' ?  () => login() : () => register() } className="bg-primary py-3 text-white rounded-md w-full mt-10 hover:bg-primary-darker transition font-semibold">
              {variant === 'login' ? 'Login' : 'Sign up'}
            </button>
            <p className="text-neutral-700 mt-12">
              {variant === 'login' ? 'First time using SocioMatrix?' : 'Already have an account?'}
              <span onClick={toggleVariant} className="text-primary-darker font-semibold ml-1 hover:underline cursor-pointer">
                {variant === 'login' ? 'Sign up' : 'Sign In'}
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Login;