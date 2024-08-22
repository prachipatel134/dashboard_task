import React from 'react';
import {AppBar,Box,Toolbar,IconButton,Typography,Menu,Container,Avatar,Button,Tooltip,MenuItem} from '@mui/material';
import logo from "../Images/dummy-logo.svg"
import MenuIcon from '@mui/icons-material/Menu';

import AdbIcon from '@mui/icons-material/Adb';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useQuery } from 'react-query';
import { User } from '../utils/api'; 


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {

  const [anchorElUser, setAnchorElUser] = React.useState(null);

 

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

 
  const { data: user, error, isLoading } = useQuery('user', User);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching user data</div>;

  const userNameInitial = user ? user.name.charAt(0) : 'U'; 

  return (
    <AppBar position="static" className='bg-gr navbar'>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a href="/dashboard">
     <img src={logo} alt="TaskTrack" height="40" width="150" />
     </a>
      
  <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ mr: 1 ,backgroundColor:"#1e2772"}}>{userNameInitial}</Avatar>
                <Typography variant="body1">{user?.name}</Typography>
                <ExpandMoreIcon sx={{ ml: 1 }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
