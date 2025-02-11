import { useState } from "react";
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { Link } from "react-router-dom";

import { useAuthStore } from "../../services/api.js";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login,error} = useAuthStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log("Logging in with:", { email, password });
		await login(email, password);
	};

	
	return (
		<div 
		  className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
		  style={{
			backgroundImage: `url('https://res.cloudinary.com/dre9wtsg5/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1738259932/jubal-kenneth-bernal-uvdhVGaeem4-unsplash_a3make.jpg')`,
		}}
		>
		  <div className="bg-gray-700/90 p-8 rounded-lg shadow-xl backdrop-blur-sm w-full max-w-md mx-4">
			<h1 className="text-blue-400 text-2xl font-bold mb-6">Welcome Back</h1>
			
			<form onSubmit={handleSubmit} className="space-y-4">
			  <div className="relative">
				<EnvelopeIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
				<input
				  type="email"
				  placeholder="Email Address"
				  value={email}
				  onChange={(e) => setEmail(e.target.value)}
				  className="w-full bg-gray-600/50 text-white pl-10 pr-4 py-2 rounded-md 
						   focus:outline-none focus:ring-2 focus:ring-emerald-400"
				  required
				/>
			  </div>
	
			  <div className="relative">
				<LockClosedIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
				<input
				  type="password"
				  placeholder="Password"
				  value={password}
				  onChange={(e) => setPassword(e.target.value)}
				  className="w-full bg-gray-600/50 text-white pl-10 pr-4 py-2 rounded-md 
						   focus:outline-none focus:ring-2 focus:ring-emerald-400"
				  required
				/>
			  </div>
	
			  <div className='flex items-center mb-6'>
						<Link to='/forgot-password' className='text-sm text-blue-400 hover:underline'>
							Forgot password?
						</Link>
					</div>
	
			  <button
				type="submit"
				className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-emerald-600 
						 transition-colors duration-200"
			  >
				Login
			  </button>
			</form>
			{error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}

			<div className="mt-6 text-center text-gray-300">
			  Don't have an account?{' '}
			  <Link to={"/signup"} className="text-blue-400 hover:text-emerald-300">
				Sign up
			  </Link>
			</div>
		  </div>
		</div>
	  )
};
export default Login;