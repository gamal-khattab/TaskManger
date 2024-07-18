import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/slices/authSlice';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    if ( !password || !email) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      const response = await axios.post('http://localhost:4000/auth/login', {
        email,
        password,
      });
      if (response.data.success) {
        console.log(response);
        toast.success("Login successful");
        console.log('Login successful:', response.data);
        const { user, token } = response.data.data;
        dispatch(loginSuccess({ user, token }));
        console.log(user);;
        console.log(token);;
        
        router.push('/dashboard'); // Navigate to the dashboard on success
        console.log('Login successful22222:', response.data);

      } else {
        console.log(response);
        console.log("error");
        toast.error("Wrong Password or Email");
      } } 
      catch (error:any) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
        console.log(error);
        console.log("error");
      } else {
        console.log(error);
        toast.error("An error occurred during login");
      }
    }
  };



  return (
    <div className="flex justify-center items-center h-screen 	">
    <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2 ">
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
          Email
        </label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign In
        </button>
      </div>
    </form>
    <Toaster position="bottom-center" />
  </div>
  );
};

export default Login;
