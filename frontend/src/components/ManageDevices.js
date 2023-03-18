import DeviceManager, { getDefaultAccount, getWeb3Provider} from '../DeviceManager';

import React, { Component } from 'react';
import { Spin, List, message } from 'antd';
import { Link } from 'react-router-dom';

class ManageDevices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      instance: null,
      devices: []
    }
  }

  async componentDidMount() {

    function getDevices(instance, deviceId){
      const getDevs = new Promise(function(resolve, reject){
        let devicePromise = instance.devices(deviceId, function(error, result){
          if(!error){
            resolve(result)
            
          }else{
            reject(error)
          }
        })
      })
      return getDevs
    }

    try {
      let instance = await DeviceManager;
      const web3 = getWeb3Provider()
      const account = web3.eth.accounts[0]
      let devicePromises = [];
      if(account){
        let devs = await instance.getDevicesByOwner(account, async function(error, results){
          if(!error){
            results.map(el => el.toNumber());
            for (let deviceId of results) {
              const devices = await getDevices(instance, deviceId)
              devicePromises.push(devices)
            }
            const devices = devicePromises
            const deviceIds = results;
            this.setState({
              instance,
              deviceIds,
              devices,
              loading: false
            });
          }else{
            console.log("ERROR")
          }
        }.bind(this))
      }
    } catch (error) {
      console.log(error);
      message.error(error.message);
    }
  }
  
  render() {
    const { devices, loading, deviceIds } = this.state;

    return (
      <div>
        <Spin spinning={loading} className="loading-spin">
          {devices.length > 0 && !loading &&
            <div>
              <p>
                Below you can find your devices. Click to see more details and manage.
              </p>
              <List
                bordered={true}
                itemLayout="horizontal"
                dataSource={devices}
                renderItem={(device, index) => (
                  <List.Item>
                    <List.Item.Meta
                      /*avatar={<Icon type="profile" style={{ fontSize: 36 }} />}*/
                      title={<Link to={`/manage-device/${this.state.deviceIds[index]}`}>{`Device ID ${this.state.deviceIds[index]}`}</Link>}
                      description={`Identifier ${device[1]}`}
                    />
                  </List.Item>
                )}
              />
            </div>
          }
          {devices.length === 0 && !loading &&
            <p>You don't have any devices registered.</p>
          }
        </Spin>
      </div>
    )
  }
}

export default ManageDevices;