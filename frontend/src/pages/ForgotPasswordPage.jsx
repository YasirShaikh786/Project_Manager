import { useState } from "react";
import { useAuthStore } from "../../services/api.js";
import { EnvelopeIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { forgotPassword } = useAuthStore(); // Calling API function

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dre9wtsg5/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1738259932/jubal-kenneth-bernal-uvdhVGaeem4-unsplash_a3make.jpg')`,
      }}
    >
      <div className="bg-gray-700/90 p-8 rounded-lg shadow-xl backdrop-blur-sm w-full max-w-md mx-4">
        <h1 className="text-blue-400 text-2xl font-bold mb-4">Forgot Password</h1>

        <p className="text-gray-300 text-center mb-6">
          Enter your email address and we'll send you a link to reset your password.
        </p>

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

          <button
            type="submit"
            className="w-full bg-blue-400 text-white py-2 rounded-md hover:bg-emerald-600 
                     transition-colors duration-200"
          >
            Send Reset Link
          </button>
        </form>

        <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
          <Link to={"/login"} className="text-sm text-blue-400 hover:underline flex items-center">
            <ArrowLeftIcon className="h-4 w-4 mr-2" /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
