import React, { useEffect } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ApInfoService } from '../../../demo/service/ApInfoService';
import { DispositivosLayout } from '../../../layout/dispositivosLayout';
import Image from 'next/image';


const Informacion = ({ dispositivo }) => {

  useEffect(() => {
    console.log(dispositivo)
  }, [dispositivo])


  //Array de objetos donde guardaremos y obtendremos los valores a mostrar en la tabla Información RF.
  //* Checar el bssid
  const RFinformation = dispositivo.g24 !== '-' ? [
    { radio: '2.4G', canal: `${dispositivo.g24[0].value}`, potenciaInalambrica: `${dispositivo.g24[2].value} dbm`, numClientes: `${dispositivo.g24[1].value}`, ssid: 'Atizapán conectado', bssid: 'c0:74:ad:b0:e5:21' },
    { radio: '5G', canal: `${dispositivo.g5[0].value}`, potenciaInalambrica: `${dispositivo.g5[2].value} dbm`, numClientes: `${dispositivo.g5[1].value}`, ssid: 'Atizapán  conectado', bssid: 'c0:74:ad:b0:e5:22' }
  ] : []

  //Array de objetos donde guardaremos y obtendremos los valores a mostrar en la tabla Cliente Actual.
  //*Checar tabla con los datos, se necesita funcion para obtener los datos de los clientes
  const currentClient = [
    { hostname: 'android-7cb535a82f678340', mac: '06:A6:A2:0B:F0:9E', IPDireccion: '10.1.0.135', totalTraffic: '8.6 KB', upTraffic: '4.27 KB', downTraffic: '4.32 KB', canal: '2.4G:6', rssi: '-63' },
    { hostname: 'HONOR_9X-cb9602e2a123f1b', mac: '08:CC:27:5C:2E:C7', IPDireccion: '10.1.0.11', totalTraffic: '16.69 KB', upTraffic: '9 KB', downTraffic: '7.69 KB', canal: '2.4G:6', rssi: '-57' },
    { hostname: '--', mac: '26:4A:55:95:08:D8', IPDireccion: '10.1.0.112', totalTraffic: '3.6 KB', upTraffic: '2.52 KB', downTraffic: '1.08 KB', canal: '5G:44', rssi: '-89' },
    { hostname: '--', mac: '58:D9:C3:BD:87:B0', IPDireccion: '10.1.0.5', totalTraffic: '--', upTraffic: '--', downTraffic: '--', canal: '2.4G:6', rssi: '-89' }
  ]

  const convertBytesToGB = (bytes) => {
    const gigabytes = bytes / (1024 * 1024 * 1024);
    return gigabytes.toFixed(2) + ' GB';
  };

  const convertBytesToMB = (bytes) => {
    const megabytes = bytes / (1024 * 1024);
    return megabytes.toFixed(2) + ' MB';
  };

  //functión to convert bytes to GB or MB
  const convertBytes = (bytes) => {
    if (bytes >= 1024 * 1024 * 1024) {
      return convertBytesToGB(bytes);
    } else {
      return convertBytesToMB(bytes);
    }
  };

  const convertSecondsToMinutes = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return minutes + ' min';
  };

  const convertSecondsToHours = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const remainingSeconds = seconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const remainingSecondsFinal = remainingSeconds % 60;
    return hours + '.' + minutes + ' hr ';
  };

  const convertSecondsToDays = (seconds) => {
    const days = Math.floor(seconds / 86400);
    const remainingSeconds = seconds % 86400;
    const hours = Math.floor(remainingSeconds / 3600);
    const remainingSecondsFinal = remainingSeconds % 3600;
    const minutes = Math.floor(remainingSecondsFinal / 60);
    const remainingSecondsFinalFinal = remainingSecondsFinal % 60;
    return days + ' días ' + hours + '.' + minutes + ' hr ';
  };


  const convertTime = (seconds) => {
    if (seconds >= 86400) {
      return convertSecondsToDays(seconds);
    } else if (seconds >= 3600) {
      return convertSecondsToHours(seconds);
    } else {
      return convertSecondsToMinutes(seconds);
    }
  };

  return (
    <DispositivosLayout>
      <div className="card">
        <h3><strong>Información del dispositivo</strong></h3>
        <table>
          <tr>
            <td style={{ padding: "10px 0" }}><strong>Nombre del equipo&nbsp;&nbsp;</strong></td>
            <td>{dispositivo.name}</td>
          </tr>
          <tr>
            <td><strong>Modelo</strong></td>
            <td>{dispositivo.apType}</td>
          </tr>
          <tr>
            <td style={{ padding: "10px 0" }}><strong>Velocidad de enlace</strong></td>
            <td style={{ padding: "0 15px" }}>NET/POE</td>
            <td style={{ padding: "0 15px" }}>{dispositivo.linkSpeed[0].value1} M/FD</td>
            <td style={{ padding: "0 15px" }}>NET {dispositivo.linkSpeed[0].status == "connected" ? "Conectado" : "Desconectado"}</td>
          </tr>
          <tr>
            <td><strong>Velocidad actual: </strong></td>
            <Image src={`/demo/images/dispositivos/up.png`} alt="logo" width={15} height={15} />
            <span style={{ paddingRight: "30px" }}>{dispositivo.upload} KB/s</span>
            <Image src={`/demo/images/dispositivos/down.png`} alt="logo" width={15} height={15} />
            <td >{dispositivo.download} KB/s</td>
          </tr>
        </table>
        <details>
          <summary style={{ padding: "10px 0" }}>Mostrar más información</summary>
          <table>
            <tr>
              <td style={{ padding: "10px 0" }}><strong>Tiempo corriendo</strong></td>
              <td>{convertTime(dispositivo.upTime)}</td>
            </tr>
            <tr>
              <td style={{ padding: "10px 0" }}><strong>Hora del sistema del dispositivo</strong></td>
              <td>&nbsp;{new Date().toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: '2-digit', hour12: true })}</td>
            </tr>
            <tr>
              <td style={{ padding: "10px 0" }}><strong>Dirección IP</strong></td>
              <td>{dispositivo.ip}</td>
            </tr>
            <tr>
              <td style={{ padding: "10px 0" }}><strong>Dirección IPv6</strong></td>
              <td>{dispositivo.ipv6}</td>
            </tr>
            <tr>
              <td style={{ padding: "10px 0" }}><strong>Numero de parte</strong></td>
              <td>{dispositivo.partNumber}</td>
            </tr>
            <tr>
              <td style={{ padding: "10px 0" }}><strong>Versión de Firmware</strong></td>
              <td>{dispositivo.versionFirmware}</td>
            </tr>
            <tr>
              <td style={{ padding: "10px 0" }}><strong>Versión de arranque</strong></td>
              <td>{dispositivo.bootVersion}</td>
            </tr>
            <tr>
              <td style={{ padding: "10px 0" }}><strong>Promedio de carga</strong></td>
              <td><strong>1 min: </strong>{convertBytes(dispositivo.loadAverage[0])}</td>
              <td><strong>5 min: </strong>{convertBytes(dispositivo.loadAverage[1])}</td>
              <td style={{ padding: "0 55px" }}><strong>15 min: </strong>{convertBytes(dispositivo.loadAverage[2])}</td>
            </tr>
            <tr>
              <td style={{ padding: "10px 0" }}><strong>Temperatura de la CPU</strong></td>
              <td>&nbsp;&nbsp;{dispositivo.temperature}</td>
            </tr>
            <tr>
              <td style={{ padding: "10px 0" }}><strong>Memoria Usada</strong></td>
              <td>&nbsp;&nbsp;{dispositivo.usedMemory}</td>
            </tr>
          </table>
        </details>
      </div>
      {RFinformation.length > 0 && (
        <div className="card">
          <h3><strong>Información RF</strong></h3>
          <DataTable
            value={RFinformation}
            className="p-datatable-striped"
            showGridlines
            rows={2}
            filterDisplay='menu'
            //loading={loading1}
            responsiveLayout='scroll'
            emptyMessage='No existen registros.'
          //header={header1}
          >
            <Column field="radio" header="Dispositivo" />
            <Column field="canal" header="Canal" />
            <Column field="potenciaInalambrica" header="Potencia Inalámbrica" />
            <Column field="numClientes" header="Número de Clientes" />
            <Column field="ssid" header="SSID" />
            <Column field="bssid" header="BSSID" />
          </DataTable>
        </div>
      )}

      {/* <div className="card">
        <h3><strong>Cliente actual</strong></h3>
        <DataTable
          value={currentClient}
          className="p-datatable-striped"
          showGridlines
          rows={4}
          filterDisplay='menu'
          //loading={loading1}
          responsiveLayout='scroll'
          emptyMessage='No existen registros.'
        //header={header1}
        >
          <Column field="hostname" header="Hostname" body={currentClient => (
            <>
              {currentClient.hostname + '\n'}
              <br />
              <span style={{ color: 'grey', }}><strong>{currentClient.mac}</strong></span>
            </>
          )}
          />
          <Column field="IPDireccion" header="IP Dirección" />
          <Column field="totalTraffic" header="Total" body={currentClient => (
            <>
              {currentClient.totalTraffic + '\n'}
              <img src='../../demo/images/dispositivos/up.png' />
              {currentClient.upTraffic + '\n'}
              <img src='../../demo/images/dispositivos/down.png' />
              {currentClient.downTraffic}
            </>
          )}
          />
          <Column field="canal" header="Canal" />
          <Column field="rssi" header="RSSI" sortable />
        </DataTable>
      </div> */}
    </DispositivosLayout>
  );
};

export const getServerSideProps = async ({ params }) => {
  const { mac = "" } = params;


  const dispositivo = await ApInfoService.getApInfo(mac);

  if (!dispositivo) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      dispositivo,
    },
  };
};


export default Informacion