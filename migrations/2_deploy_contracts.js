var DeviceManager = artifacts.require("./DeviceManager.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(DeviceManager, { from: accounts[0]});
};
