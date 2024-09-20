import React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Application
          </Typography>
        </Toolbar>
      </AppBar>
      <Box className="App" sx={{ padding: 2, boxSizing: 'border-box' }}>
        <Dashboard showMainnet={true} />
      </Box>
    </Box>
  );
}

export default App;
