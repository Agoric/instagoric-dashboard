import React from 'react';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Instagoric Dashboard
          </Typography>
          <Button
            variant="contained"
            color="primary"
            href="https://github.com/Agoric/instagoric-private/actions/workflows/deploy-namespace.yaml"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ borderRadius: '12px', marginLeft: 'auto', textTransform: 'none'}}
          >
            New Testnet
          </Button>
        </Toolbar>
      </AppBar>
      <Box className="App" sx={{ padding: 2, boxSizing: 'border-box' }}>
        <Dashboard showMainnet={true} />
      </Box>
    </Box>
  );
}

export default App;
