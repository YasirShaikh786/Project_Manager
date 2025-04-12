// // ResetPasswordPage.jsx
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { useAuthStore } from "../../services/api.js";
// import { useNavigate, useParams } from "react-router-dom";
// import Input from "../components/Input.jsx";
// import { Lock } from 'lucide-react';
// import toast from "react-hot-toast";

// const ResetPasswordPage = () => {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [backgroundImage, setBackgroundImage] = useState('your_cloudinary_image_id'); // Replace with your image ID
//   const { resetPassword, error, isLoading, message } = useAuthStore();

//   const { token } = useParams();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }
//     try {
//       await resetPassword(token, password);
//       toast.success("Password reset successfully, redirecting to login page...");
//       setTimeout(() => {
//         navigate("/login");
//       }, 2000);
//     } catch (error) {
//       console.error(error);
//       toast.error(error.message || "Error resetting password");
//     }
//   };

//   return (
//     <div 
//       className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
//       style={{
// 		backgroundImage: `url('https://res.cloudinary.com/dre9wtsg5/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1738259932/jubal-kenneth-bernal-uvdhVGaeem4-unsplash_a3make.jpg')`,
// 	}}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-md w-full bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
//       >
//         <div className="p-8">
//           <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
//             Reset Password
//           </h2>
//           {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//           {message && <p className="text-green-500 text-sm mb-4">{message}</p>}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <Input
//               icon={Lock}
//               type="password"
//               placeholder="New Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />

//             <Input
//               icon={Lock}
//               type="password"
//               placeholder="Confirm New Password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />

//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 
//                        text-white font-bold rounded-lg shadow-lg 
//                        hover:from-green-600 hover:to-emerald-700 
//                        focus:outline-none focus:ring-2 focus:ring-green-500 
//                        focus:ring-offset-2 focus:ring-offset-gray-900 
//                        transition duration-200"
//               type="submit"
//               disabled={isLoading}
//             >
//               {isLoading ? "Resetting..." : "Set New Password"}
//             </motion.button>
//           </form>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default ResetPasswordPage;