import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../components/iconify';
import axios from "axios";

import SingCard from "../components/SingCard"


export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMsg, setErrorMsg] = useState('Une erreur s est produite. Vérifiez que vous n utilisez pas déjà une adresse e-mail ou un nom d utilisateur utilisé auparavant.');

    //alert card
    const [openE, setOpenE] = useState(false);
    const handleCloseE = () => {
      setOpenE(!openE)
    };

    const handlePushToLogin = ()=>{
      navigate('/');
  } 

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const validatePassword = (newPassword) => {
    // Password strength requirements
    const hasUppercase = /[A-Z]/.test(newPassword);
    const hasLowercase = /[a-z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);

    if (newPassword.length < 8 || !hasUppercase || !hasLowercase || !hasNumber ) {
      setPasswordError('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number.');
    } else {
      setPasswordError('');
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();



    try {
      const res = await axios.post("https://api-blog-ten.vercel.app'/api/auth/register", {
        username,
        email,
        password,
      });
      setError(false)
      setOpenE(!openE)
   
    } catch (err) {
    setError(true)
    setErrorMsg(err.request.response)
    }
  };

  return (
    <>
      <Stack spacing={3}>
   
        <TextField name="username" value={username} label="Nom d'utilisateur" onChange={handleUsernameChange} />

        <TextField name="email" value={email} label="Email" onChange={handleEmailChange} />

        <TextField
          name="password"
          value={password}
          onChange={handlePasswordChange}
          label="Mot de passe  "
          type={showPassword ? 'text' : 'password'}
          error={Boolean(passwordError)}
          helperText={passwordError}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <SingCard text={"Votre compte a été ouvert avec succès."} btn={"Se connecter"}  desc={"Bienvenue sur notre Blog ! "} openE={openE} handleCloseE={handleCloseE} handlePushToLogin={handlePushToLogin}  username={username} />

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
        Déjà inscrit(e) ? 
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Register
      </LoadingButton>

      {error && (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <span style={{ color: 'red' }}> {errorMsg} </span>
        </div>
      )}

      {success && (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <span style={{ color: 'green' }}>user Created</span>
      </div>
      )}
    </>
  );
}
export { Register };
