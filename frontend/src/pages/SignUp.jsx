import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { useAuthStore } from "../../services/api.js";
const SignUp = () => {

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { signup,error } = useAuthStore();
	const navigate = useNavigate();


	const handleSignUp = async (e) => {
		e.preventDefault();
		
		// Debugging: Check values before sending
		// console.log("Signing up with:", { email, password, username });
	
		try {
			await signup(email, password, username);
			// console.log("just sending", { email, password, username });

			navigate("/verify-email");
		} catch (error) {
			console.log("Here is the error:", error.response?.data || error);
		}
	};
	


	return (
		    <div
		      className="min-h-screen flex items-center justify-center bg-cover bg-center"
		      style={{
		        backgroundImage: `url('https://res.cloudinary.com/dre9wtsg5/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1738259932/jubal-kenneth-bernal-uvdhVGaeem4-unsplash_a3make.jpg')`,
		      }}
		    >
		  <div className="bg-gray-700/90 p-8 rounded-lg shadow-xl backdrop-blur-sm w-full max-w-md mx-4">
		  <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
		        <form onSubmit={handleSignUp}>
		          <div className="mb-4">
		            <label className="block text-sm font-medium mb-2">Username</label>
		            <input
		              type="text"
		              value={username}
		              onChange={(e) => setUsername(e.target.value)}
		              className="w-full px-3 py-2 border rounded-lg"
		              required
		            />
		          </div>
		          <div className="mb-4">
		            <label className="block text-sm font-medium mb-2">Email</label>
		            <input
		              type="email"
		              value={email}
		              onChange={(e) => setEmail(e.target.value)}
		              className="w-full px-3 py-2 border rounded-lg"
		              required
		            />
		          </div>
		          <div className="mb-6">
		            <label className="block text-sm font-medium mb-2">Password</label>
		            <input
		              type="password"
		              value={password}
		              onChange={(e) => setPassword(e.target.value)}
		              className="w-full px-3 py-2 border rounded-lg"
		              required
		            />
		          </div>
		          <button
		            type="submit"
		            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
		          >
		            Sign Up
		          </button>
				  {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
		        </form>
		        <p className="mt-4 text-center">
		          Already have an account?{" "}
				  <Link to={"/login"} className="text-blue-500 hover:underline">
		            Login
		          </Link>
		        </p>
		      </div>
		    </div>
		  );

		
};
export default SignUp;