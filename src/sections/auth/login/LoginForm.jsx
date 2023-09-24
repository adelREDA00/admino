import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";


export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const { loading, error, dispatch } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("https://apiblognode.onrender.com/api/auth/connexion", {
        username,
        password,
      }, {
        headers: {
          Authorization: localStorage.getItem("token") // Send the token in the request headers
        }
      });
      
      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        dispatch({ type: "SET_TOKEN", payload: res.data.token });
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "Vous n'êtes pas autorisé!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: { message: "Nom d'utilisateur ou mot de passe incorrect" } });
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="username" value={username} label="
Nom d'utilisateur " onChange={handleUsernameChange} />

        <TextField
          name="password"
          value={password}
          onChange={handlePasswordChange}
          label="Mot de passe"
          type={showPassword ? 'text' : 'password'}
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

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
        Mot de passe oublié ?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
      Connexion 
      </LoadingButton>

      {error && (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <span style={{ color: "red" }}>{error.message}</span>
        </div>
      )}
    </>
  );
}
