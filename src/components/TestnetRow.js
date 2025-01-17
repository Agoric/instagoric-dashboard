import React from 'react';
import { Button } from '@mui/material';
import '../App.css';

const TestnetRow = ({ testnet }) => {
  return (
    <tr>
      <td>
        <a href={testnet.url} target="_blank" rel="noopener noreferrer">
          {testnet.testnetName === 'followmain' ? 'mainnet' : testnet.testnetName}
        </a>
      </td>
      <td>
        {testnet.chain}
      </td>
      <td>{testnet.dockerImage}</td>
      <td>{testnet.purpose}</td>
      <td>
        {testnet.revision}
      </td>
      <td>
        <Button
          variant="contained"
          color="primary"
          href="https://github.com/Agoric/instagoric-private/actions/workflows/deploy-namespace.yaml"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ borderRadius: '16px', textTransform: 'none' }}
        >
          Redeploy
        </Button>
      </td>
    </tr>
  );
};

export default TestnetRow;
