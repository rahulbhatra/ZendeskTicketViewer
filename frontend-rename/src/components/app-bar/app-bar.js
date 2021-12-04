import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Typography, IconButton } from '@mui/material';
import { orange } from '@mui/material/colors';
import HomeIcon from '@mui/icons-material/Home';


export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{background: orange[500]}} position="static">
        <Toolbar>
          <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              href="/"
            >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Zendesk Ticket Viewer
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
