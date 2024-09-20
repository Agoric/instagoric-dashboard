import React from 'react';

const TestnetRow = ({ testnet }) => {
  return (
    <tr>
      <td>
        <a href={testnet.url} target="_blank" rel="noopener noreferrer">
          {testnet.testnetName}
        </a>
      </td>
      <td>
        {testnet.chain}
      </td>
      <td>{testnet.dockerImage}</td>
      <td>{testnet.purpose}</td>
      <td>
        {testnet.revisionLink && (
          <a href={testnet.revisionLink} target="_blank" rel="noopener noreferrer">
            Revision Link
          </a>
        )}
      </td>
      <td>
        {testnet.rpc && (
          <a href={testnet.rpc} target="_blank" rel="noopener noreferrer">
            RPC
          </a>
        )}
        &ensp;
        {testnet.grpc && (
          <a href={testnet.grpc} target="_blank" rel="noopener noreferrer">
            gRPC
          </a>
        )}
        &ensp;
        {testnet.api && (
          <a href={testnet.api} target="_blank" rel="noopener noreferrer">
            API
          </a>
        )}
      </td>
      <td>
        {testnet.explorer && (
          <a href={testnet.explorer} target="_blank" rel="noopener noreferrer">
            Explorer
          </a>
        )}
      </td>
      <td>
        <a href={testnet.logs} target="_blank" rel="noopener noreferrer">
            Logs
        </a>
      </td>
    </tr>
  );
};

export default TestnetRow;
