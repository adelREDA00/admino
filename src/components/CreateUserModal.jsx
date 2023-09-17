import React, { FC,useEffect, useContext,useState } from "react";
import Dialog from '@mui/material/Dialog';
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";


export default function CreateUserModal({openCreate,logName,setOpenE,handleCloseCreate}) {
    const { token} = useContext(AuthContext);





  const [firstName, setFirstName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  const [emailError, setEmailError] = useState('');

  


  const [passwordError, setPasswordError] = useState('');

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (password.length === 0) {
      setPasswordError('Mot de passe requis');
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        'Le mot de passe doit contenir au moins 8 caractères, dont une lettre majuscule et un chiffre.'
      );
    } else {
      setPasswordError('');
    }
  };



  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setNewPassword(newPassword)
    validatePassword(newPassword);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
    validateEmail();
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
      setEmailError('Email is required');
    } else if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const key = token;
    const config = {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    };
  
    try {
      const res = await axios.post("/api/auth/register", {
        username: firstName,
        email: email,
        password: newPassword,
        //isAdmin: isAdmin,  Include the isAdmin value in the request
      }, config);
      logName(firstName)
      setOpenE(true)
    } catch (err) {
      console.error(err); // Handle the error as needed
    }
  };
  




  return (
    <div>
 
      <Dialog
        open={openCreate}
        onClose={handleCloseCreate}
        aria-labelledby="responsive-dialog-title"
        className='suc_model2'
      >

<form className="form" onSubmit={handleSubmit} >
    
        <>
   <p className="title">  nouveau compte </p>
   <p className="message"> Ajouter un nouvel utilisateur </p>
        </>

 


       <div className="flex">
       <label>
           <input required="" placeholder={"username"}   value={firstName}
            onChange={(e) => setFirstName(e.target.value)}  type="text" className="input" />
           <span>Username</span>
       </label>

       <label>
           <input required="" placeholder={"Email"}  value={email}
            onChange={handleEmailChange}  type="text" className="input"/>
           <span>Email</span>
       </label>
    
   </div> 
   <span className="validation" > {emailError} </span>
  
 
   <br />
            
 
        
    <label>
        <input required="" placeholder="*********"  value={newPassword}
            onChange={handlePasswordChange} type="password" className="input"/>
        <span>Password</span>
    </label>
    <span className="validation" > {passwordError} </span>
{/*   <label className='radio'>
   

    <div className="mydict">
  <span className="role">Rôle</span>
  
  <div>
    <label>
      <input
        type="radio"
        name="radio"
        checked={isAdmin}
        onChange={() => setIsAdmin(true)}
      />
      <span>ADMIN</span>
    </label>
    <label>
      <input
        type="radio"
        name="radio"
        checked={!isAdmin}
        onChange={() => setIsAdmin(false)}
      />
      <span>USER</span>
    </label>
  </div>



</div>

<br />

    </label>  */}
 
<br />
 
    <button onClick={()=>{
            handleCloseCreate()
       
    }} className="submit">Register</button>
   
</form>




      </Dialog>
    </div>
  );
}
