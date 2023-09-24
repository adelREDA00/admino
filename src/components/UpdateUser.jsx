import React, { FC,useEffect, useContext,useState } from "react";
import Dialog from '@mui/material/Dialog';
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";


export default function UpdateUser({openUpdate,handleCloseUpdate,currentId}) {
    const { token} = useContext(AuthContext);

    const [data,setData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const key = token; // Replace with your actual authentication token
        const config = {
          headers: {
            Authorization: `Bearer ${key}`,
          },
        };
  
        const res = await axios.get(`https://apiblognode.onrender.com/api/users/${currentId}`, config);
        // Handle success or any additional logic
        setData(res.data)
        
       
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };
  
    fetchData();

  }, [currentId]);

  const [firstName, setFirstName] = useState(data && data.username ? data.username : "");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState(data && data.email ? data.email : "");
  const [isAdmin, setIsAdmin] = useState(data && data.isAdmin);

  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    if (data && data.username) {
      setFirstName(data.username);
    }
    if (data && data.email) {
      setEmail(data.email);
    }
    if (data && data.isAdmin) {
        setIsAdmin(data.isAdmin);
      }
  }, [data]);

 


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

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setNewPassword(newPassword)
    validatePassword(newPassword);
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
      const res = await axios.put(`https://apiblognode.onrender.com/api/users/${currentId}`, {
        username: firstName,
        email: email,
        password: newPassword,
        isAdmin: isAdmin, // Include the isAdmin value in the request
      }, config);
  
    
    } catch (err) {
      console.error(err); // Handle the error as needed
    }
  };
  





  return (
    <div>
 
      <Dialog
        open={openUpdate}
        onClose={handleCloseUpdate}
        aria-labelledby="responsive-dialog-title"
        className='suc_model2'
      >

<form className="form" onSubmit={handleSubmit} >
    {data && data.username && (
        <>
   <p className="title"> {data.username } </p>
   <p className="message">Update user </p>
        </>

    )}

{data && data.email && data.username && (
  <div>
       <div className="flex">
       <label>
           <input required="" placeholder={"username"}   value={firstName}
            onChange={(e) => setFirstName(e.target.value)}  type="text" className="input" />
           <span>Username</span>
       </label>

       <label>
           <input required="" placeholder={data.email}  value={email}
               onChange={handleEmailChange} type="text" className="input"/>
           <span>Email</span>
       </label>

   </div> 
          <span className="validation" > {emailError} </span>
  </div>



    )}
 
   
            
 
        
    <label>
        <input required="" placeholder="*********"  value={newPassword}
            onChange={handlePasswordChange} type="password" className="input"/>
        <span>Password</span>
    </label>
    <span className="validation" > {passwordError} </span>


    <label className='radio'>
   

    <div className="mydict">
  <span className="role">Rôle</span>
  {data && (
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
)}



</div>

<br />

    </label> 

    <button onClick={()=>{
            handleCloseUpdate()
       
    }} className="submit">Edit profile</button>
   
</form>




      </Dialog>
    </div>
  );
}
