import React, { useEffect, useState } from 'react';
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
  const [testnets, setTestnets] = useState([]);

  useEffect(() => {
    const fetchTestnetData = async () => {
      const mainnetPromise = fetch(mainnetUrl)
        .then(response => response.text())
        .then(text => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(text, 'text/html');
          const preTag = doc.querySelector('pre');

          if (!preTag) {
            console.error(`No <pre> tag found in the response from ${mainnetUrl}`);
            return null;
          }

          const data = parseTestnetData(preTag.innerText);
          const testnetName = new URL(mainnetUrl).hostname.split('.')[0];
          const netInfoUrl = `https://${testnetName}.rpc.agoric.net/net_info`;
          return fetch(netInfoUrl)
            .then(netInfoResponse => netInfoResponse.json())
            .then(netInfoData => {
              const n_peers = netInfoData.result.n_peers;
              return { testnetName, url: mainnetUrl, n_peers, ...data };
            });
        })
        .catch(error => {
          console.error(`Error fetching data from ${mainnetUrl}:`, error);
          return null;
        });

      const results = await Promise.all([
        ...testnetUrls.map(async (url) => {
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
            const testnetName = new URL(url).hostname.split('.')[0];
            const netInfoUrl = `https://${testnetName}.rpc.agoric.net/net_info`;
            const netInfoResponse = await fetch(netInfoUrl);
            const netInfoData = await netInfoResponse.json();
            const n_peers = netInfoData.result.n_peers;
            return { testnetName, url, n_peers, ...data };
          } catch (error) {
            console.error(`Error fetching data from ${url}:`, error);
            return null;
          }
        }),
        mainnetPromise
      ]);
      setTestnets(results.filter(Boolean)); // Replace with new results
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
      if (line.startsWith('Purpose:')) {
        info.purpose = line.split('Purpose:')[1].trim();
      }
      if (line.startsWith('Faucet:')) {
        info.faucet = line.split('Faucet:')[1].trim();
      }
      if (line.startsWith('Logs:')) {
        const match = line.match(/Logs: <a href="([^"]+)"/);
        if (match && match[1]) {
          info.logs = match[1];
        }
      }
    });

    console.log('Parsed info object:', info); // Debug log to check final parsed info object
    return info;
  };

  return (
    <div className="dashboard">
      <h1>Instagoric Dashboard</h1>
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
                <th>Revision Link</th>
                <th>Endpoints</th>
                <th>Explorer</th>
                <th>Faucet</th>
                <th>Logs</th>
              </tr>
            </thead>
            <tbody>
              {testnets
                .filter(testnet => testnet.testnetName === 'followmain')
                .map((mainnet, index) => (
                  <TestnetRow key={index} testnet={mainnet} />
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
            <th>Revision Link</th>
            <th>Endpoints</th>
            <th>Explorer</th>
            <th>Faucet</th>
            <th>Logs</th>
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
