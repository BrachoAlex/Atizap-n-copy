import React, { useState, useEffect } from 'react';
import { ApService } from '../../demo/service/ApService';
import { ApInfoService } from '../../demo/service/ApInfoService';
import { ClientListService } from '../../demo/service/ClientListService';
import { ClientInfoService } from '../../demo/service/ClientInfoService';
import { StatisticsClientService } from '../../demo/service/StatisticsClientService';
import { StatisticsBandwithService } from '../../demo/service/StatisticsBandwithService';

const NetworkListComponent = () => {
  const [networkList, setNetworkList] = useState([]);
  const [apInfo, setApInfo] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [clientInfo, setClientInfo] = useState([]);
  const [statisticsClient, setStatisticsClient] = useState([]);
  useEffect(() => {
    ApService.getApList().then(data => setNetworkList(data));
  }, []);
  useEffect(() => {
    ApInfoService.getApInfo("C0:74:AD:B0:E4:38").then(data => setApInfo(data));
  }, []);
  useEffect(() => {
    ClientListService.getClientList().then(data => setClientList(data));
  }, []);
  useEffect(() => {
    ClientInfoService.getClientInfo().then(data => setClientInfo(data));
  }, []);
  useEffect(() => {
    StatisticsClientService.getStatisticsClient().then(data => setStatisticsClient(data));
  }, []);
  useEffect(() => {
    StatisticsBandwithService.getStatisticsBandwith().then(data => setStatisticsClient(data));
  }, []);
  if (networkList.length === 0) {
    return <div>Loading...</div>;
  }
  // console.log("clienteList", clientList);
  // console.log("networkList", networkList);
  // console.log("apInfo", apInfo);

  // console.log("StatisticsClient", statisticsClient);
  return (
    <>

      {networkList.map((network) => (

        <div key={network.mac}>
          <h4>{network.mac}</h4>
          <div>{network.clients}</div>
          <div>{network.status}</div>
          <div>{network.type}</div>
        </div>

      )
      )}

    </>
  );



};
export default NetworkListComponent
