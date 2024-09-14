import React, { useEffect, useState } from 'react';
import TestnetRow from './TestnetRow';

const testnetUrls = [
  'https://devnet.agoric.net',
  'https://emerynet.agoric.net',
  'https://xnet.agoric.net',
  'https://ollinet.agoric.net',
  'https://axlenet.agoric.net',
];

const Dashboard = () => {
  const [testnets, setTestnets] = useState([]);

  useEffect(() => {
    const fetchTestnetData = async () => {
      const results = await Promise.all(
        testnetUrls.map(async (url) => {
          try {
            const response = await fetch(url);
            const text = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            const preTag = doc.querySelector('pre');

            if (!preTag) {
              console.error(`No <pre> tag found in the response from ${url}`);
              return null;
            }

            // Parse necessary data
            const data = parseTestnetData(preTag.innerText);
            console.log(`Parsed data for ${url}:`, data); // Debug log to check parsed data
            return { url, ...data };
          } catch (error) {
            console.error(`Error fetching data from ${url}:`, error);
            return null;
          }
        })
      );
      setTestnets(results.filter(Boolean)); // Filter out any null values due to errors
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
      if (line.startsWith('Revision Link:')) {
        info.revisionLink = line.split('Revision Link:')[1].trim();
      }
      if (line.startsWith('Network Config:')) {
        info.networkConfig = line.split('Network Config:')[1].trim();
      }
      if (line.startsWith('RPC:')) {
        info.rpc = line.split('RPC:')[1].trim();
      }
      if (line.startsWith('gRPC:')) {
        info.grpc = line.split('gRPC:')[1].trim();
      }
      if (line.startsWith('API:')) {
        info.api = line.split('API:')[1].trim();
      }
      if (line.startsWith('Explorer:')) {
        info.explorer = line.split('Explorer:')[1].trim();
      }
      if (line.startsWith('Faucet:')) {
        info.faucet = line.split('Faucet:')[1].trim();
      }
    });

    console.log('Parsed info object:', info); // Debug log to check final parsed info object
    return info;
  };

  return (
    <div className="dashboard">
      <h1>Testnet Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Chain</th>
            <th>Docker Image</th>
            <th>Revision Link</th>
            <th>Network Config</th>
            <th>Endpoints</th>
            <th>Explorer</th>
            <th>Faucet</th>
          </tr>
        </thead>
        <tbody>
          {testnets.map((testnet, index) => (
            <TestnetRow key={index} testnet={testnet} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
