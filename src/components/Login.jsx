
 
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase"; // Import your Firebase app instance
import { collection, addDoc } from "firebase/firestore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate(); // Get the navigate function using useNavigate hook

  // const handleLogin = async () => {
  //   try {
  //     // Sign in with Firebase Authentication
  //     const emailPattern = /^[^\s@]+@(gmail\.com|yahoo\.com|orkut\.com|hotmail\.com)$/;
  
  //     if (!emailPattern.test(email)) {
  //       alert("Please enter a valid email address from allowed domains.");
  //       return; // Exit the function if email is not valid
  //     }
  //     await createUserWithEmailAndPassword(auth, email, password);

  //     // After successful login, save user data to Firestore
  //     const user = auth.currentUser;
  //     if (user) {
  //       const usersRef = collection(db, "your-collection-name"); // Replace with your actual collection name
  //       const userData = {
  //         email: user.email,
  //         // Add more user data fields as needed
  //       };
  //       await addDoc(usersRef, userData);

  //       // // Save user details in local storage
  //       // localStorage.setItem("email", user.email);
  //       // localStorage.setItem("loggedIn", "true");
  //       setLoggedIn(true);
  //       // Redirect to the home page after successful login
  //       navigate("/notifications"); // Use the navigate function to redirect to the homepage
  //     } else {
  //       alert("User not found.");
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     alert(`Login failed: ${error.message}`);
  //   }
  // };
  const handleLogin = async () => {
    try {
      // Disable the login button or show a loading indicator here
  
      // Sign in with Firebase Authentication
      const emailPattern = /^[^\s@]+@(gmail\.com|yahoo\.com|orkut\.com|hotmail\.com)$/;
  
      if (!emailPattern.test(email)) {
        alert("Please enter a valid email address from allowed domains.");
        return; // Exit the function if email is not valid
      }
  
      await createUserWithEmailAndPassword(auth, email, password);
  
      // Save user details in local storage (if needed)
      localStorage.setItem("email", email);
      localStorage.setItem("loggedIn", true);
      setLoggedIn(true);
      // Redirect to the home page after successful login
      navigate("/"); // Use the navigate function to redirect to the homepage
    } catch (error) {
      console.error("Login error:", error);
      alert(`Login failed: ${error.message}`);
      // Re-enable the login button or hide the loading indicator here
    }
  };
  

  const handleLogout = () => {
    // Clear user details from local storage
    localStorage.removeItem("email");
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
  };


  const renderLoginForm = () => {
  return (
    <div className="container">
      
        <div className="logo">
          {/* Your logo */}
          <img
          src="https://tse4.mm.bing.net/th?id=OIP.D6P-BO32wCApcPIIjt6p5wHaHa&pid=Api&P=0&h=180"
          alt="Google Logo"
        />
             <p>  sign in with Google</p>
             <div class="border-line"></div>
             </div>
             <div className="title">
             <h2>Sign In</h2>
             <h3>continue to You Tube</h3>
             </div>
             <div className="form">
               <div className="form-group">
                 <label>Email</label>
                 <input
                   type="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                 />
               </div>
               <div className="form-group">
                 <label>Password</label>
                 <input
                   type="password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                 />
               </div>
               <p id="term">To Continue Google will share Your  name ,email &<br/>
               address,language,preference and <br/>profile picture with You Tube </p>
               <button className="submit-btn" onClick={handleLogin}>
                 Login
               </button>
               <div className="link">
                 <Link to="/notifications">Forgot password?</Link>
               </div>
             </div>
             
             <div className="footer__details">
             <h4>English(united Kingdom)</h4>
             <div className=" footer right">
             <a href="#">Terms of Service | Privacy Policy</a><br/>© 
             {" "}
             All rights reserved
             
             </div>
             <div className="footter__terms">
             <div> Help</div><div>Privacy</div><div>Terms</div>
             </div>
             </div>
           </div>
         );
       };
     
     
       const handleBackToYouTube = () => {
         // Redirect back to the YouTube page
         navigate("/"); // Use the navigate function to redirect to the YouTube page
       };
     
       const renderLoggedInPage = () => {
         return (
           <div className="container">
            
             <div className="form">
               <div className="form-group">
                 <h2>Welcome, {localStorage.getItem("email")}!</h2>
               </div>
               <button className="submit-btn" onClick={handleBackToYouTube}>
                 Back to YouTube
               </button>
               <div className="logo">
               
               <img
                 src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" 
                 alt="Google Logo"
               
               />
               
               
             </div>
             </div>
           </div>
           
         );
       };
     
       return <div className="App">{loggedIn ? renderLoggedInPage() : renderLoginForm()}</div>;
     };
     
     export default LoginPage;