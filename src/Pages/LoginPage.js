import React, { useState } from 'react';
import { Box, Grid, TextField, Button, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import apiInstance from '../utils/apiInstance';
import login_img from "../Images/mobile_login.png";
import { useNavigate } from 'react-router-dom';
import logo from "../Images/dummy-logo.svg";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setEmailTouched(true);
    setPasswordTouched(true);
    setError('');

    if (!email || !password) {
      return;
    }

    try {
      const response = await apiInstance.post('/api/v1/users/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate("/dashboard");
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Grid container sx={{ maxWidth: 1200, boxShadow: 3, borderRadius: 2, overflow: 'hidden' }}>
        <Grid item xs={12} lg={6} sx={{ p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <img src={logo} alt="TaskTrack" height="40" width="150" style={{ marginBottom: '10px' }} />
          <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
            Login into your account
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '80%' }}>
            <FormControl margin="normal" fullWidth>
              <TextField
                id="outlined-email"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
                required
                error={emailTouched && !email}
                helperText={emailTouched && !email ? "Email is required" : ""}
              />
            </FormControl>

            <FormControl margin="normal" fullWidth>
              <TextField
                id="outlined-password"
                label="Password"
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setPasswordTouched(true)}
                required
                error={passwordTouched && !password}
                helperText={passwordTouched && !password ? "Password is required" : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}

            <div className='img-center'>
              <Button type="submit" variant="contained" color="primary" className='btn-primary' sx={{ mt: 3, alignSelf: 'center', width: '40%' }}>
                Log In
              </Button>
            </div>
          </form>
        </Grid>

        <Grid item xs={12} lg={6} sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', justifyContent: 'center'}} className='bg-gradient'>
          <Box sx={{ p: 3 }}>
            <img src={login_img} alt="Login" style={{ width: '100%', maxWidth: 400, height: 'auto' }} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
