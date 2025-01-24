// pages/ForgetPassword.tsx
import React, { useState } from 'react';
import '../styles/forgetpassword.scss';
import API from '../utils/api.ts';


const ForgetPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await API.post("/users/forget-password", { email });
      alert(response.data); // Message from the backend
    } catch (error: any) {
      alert(error.response?.data || "Failed to send reset link. Try again.");
    }
  };
  

  return (
    <div className="forget-password">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgetPassword;


// import React, { useState } from 'react';
// import '../styles/forgetpassword.scss';

// const ForgetPassword: React.FC = () => {
//     const [email, setEmail] = useState<string>('');

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         // Call forget password service here
//     };

//     return (
//         <div className="forget-password">
//             <h2>Forgot Password</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label>Email</label>
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <button type="submit">Send Reset Link</button>
//             </form>
//         </div>
//     );
// };

// export default ForgetPassword;
