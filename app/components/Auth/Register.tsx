import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);



 
  const handleRegister = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    // Check for empty fields
    if (!username || !password || !email) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/auth/register', {
        username,
        password,
        email,
      });

      toast.success("Registration successful");
      console.log('Registration successful:', response.data);
      setUsername("")
      setPassword("")
      setEmail("")
      // Optionally handle success response

    } catch (error:any) {
      toast.error("An error occurred during registration");
      console.log(error);
      
      setError(error);
    }
  };

  return (
    <form className="max-w-md mx-auto mt-4 p-4 bg-white shadow-md rounded-lg" onSubmit={handleRegister}>
  <div className="mb-4">
    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
    <input
      type="text"
      id="username"
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      required
    />
  </div>
  <div className="mb-4">
    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
    <input
      type="password"
      id="password"
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
  </div>
  <div className="mb-4">
    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
    <input
      type="email"
      id="email"
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
  </div>
  <button
    type="submit"
    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    Register
  </button>
  <Toaster position="bottom-center" />
</form>

  );
};

export default Register;
