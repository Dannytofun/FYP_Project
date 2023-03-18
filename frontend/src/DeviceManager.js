import getWeb3 from './utils/web3';
import DeviceManagerArtifact from './artifacts/DeviceManager.json';

let web3;
let DeviceManager = new Promise(function (resolve, reject) {
  getWeb3.then(results => {
    web3 = results.web3
    const deviceManager = web3.eth.contract(DeviceManagerArtifact.abi).at(process.env.REACT_APP_DEVICE_CONTRACT);
    resolve(deviceManager)
  }).catch(error => {
    reject(error);
  });
});

export function getDefaultAccount() {
  console.log("HERE", web3.eth)
  console.log("HERE", web3.eth.accounts[0])
  return web3.eth.accounts[0];
}

export function getWeb3Provider() {
  return web3;
}


export default DeviceManager;