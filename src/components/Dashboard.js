import React, { useEffect, useState } from 'react';
import '../App.css';
import { Box } from '@mui/material';
import TestnetRow from './TestnetRow';

const testnetUrls = [
  'https://devnet.agoric.net',
  'https://emerynet.agoric.net',
  'https://xnet.agoric.net',
  'https://ollinet.agoric.net',
  'https://axlenet.agoric.net',
];

const mainnetUrl = 'https://followmain.agoric.net/';

const Dashboard = ({ showMainnet }) => {
  const [testnets, setTestnets] = useState({});

  useEffect(() => {
    const fetchTestnetData = () => {
      const fetchSingleTestnet = async (url) => {
        try {
          const response = await fetch(url);
          const text = await response.text();
          const data = parseTestnetData(text);
          const testnetName = new URL(url).hostname.split('.')[0];
          
          setTestnets(prev => ({
            ...prev,
            [testnetName]: { testnetName, url, ...data }
          }));
        } catch (error) {
          console.error(`Error fetching data from ${url}:`, error);
        }
      };

      [...testnetUrls, mainnetUrl].forEach(url => {
        fetchSingleTestnet(url);
      });
    };

    fetchTestnetData();
  }, []);

  const parseTestnetData = (data) => {
    const lines = data.split('\n');
    const info = {};

    lines.forEach((line) => {
      console.log('Parsing line:', line); // Debug log to check each line being parsed

      if (line.startsWith('Chain:')) {
        info.chain = line.split('Chain:')[1].trim();
      }
      if (line.startsWith('Docker Image:')) {
        info.dockerImage = line.split('Docker Image:')[1].trim();
      }
      if (line.startsWith('Revision:')) {
        info.revision = line.split('Revision:')[1].trim();
      }
      if (line.startsWith('Network Config:')) {
        info.networkConfig = line.split('Network Config:')[1].trim();
      }
      if (line.startsWith('Purpose:')) {
        info.purpose = line.split('Purpose:')[1].trim();
      }
    });

    console.log('Parsed info object:', info); // Debug log to check final parsed info object
    return info;
  };

  const testnetArray = Object.values(testnets);

  return (
    <Box className="dashboard" sx={{ width: '100%', margin: '20px auto', padding: '20px', backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px', boxSizing: 'border-box' }}>
      {showMainnet && (
        <div className="mainnet-section">
          <h2>Mainnet</h2>
          <table>
            <thead>
              <tr>
                <th>Chain</th>
                <th>Chain Id</th>
                <th>Docker Image</th>
                <th>Purpose</th>
                <th>Revision</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {testnetArray
                .filter(testnet => testnet?.testnetName === 'followmain')
                .map((mainnet, index) => (
                  <TestnetRow key={mainnet.testnetName} testnet={mainnet} />
                ))}
            </tbody>
          </table>
        </div>
      )}
      <h2>Testnets</h2>
      <table>
        <thead>
          <tr>
            <th>Chain</th>
            <th>Chain Id</th>
            <th>Docker Image</th>
            <th>Purpose</th>
            <th>Revision</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {testnetArray
            .filter(testnet => testnet?.testnetName !== 'followmain')
            .map((testnet, index) => (
              <TestnetRow key={testnet.testnetName} testnet={testnet} />
            ))}
        </tbody>
      </table>
    </Box>
  );
};

export default Dashboard;
