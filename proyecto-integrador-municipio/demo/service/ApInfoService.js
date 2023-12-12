import sha256 from 'crypto-js/sha256';
import axios from 'axios';
import { municipioApi } from '../../api';
export const ApInfoService = {

    async getApInfo(mac) {
        // app info
        const clientId = "101083";
        const clientSecret = "dV1BbP6z7f77m8WFOx1LROAnqGkZ13YY";
        const resource = 'https://url/callback';

        // get access token
        const accessTokenResponse = await axios.post('https://www.gwn.cloud/oauth/token', {
            resource,
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'client_credentials'
        }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

        const accessToken = accessTokenResponse.data.access_token;

        // Add Signature Computation code
        const timestamp = Date.now();
        const publicParams = {
            access_token: accessToken,
            appID: clientId,
            secretKey: clientSecret,
            timestamp
        };
        const bodyData = {
            "mac": [
                mac
            ]
        };
        const params = new URLSearchParams(publicParams).toString();
        const body = JSON.stringify(bodyData);
        const bodySignature = sha256(body);
        const signature = sha256(`&${params}&${bodySignature}&`);
        const payloadData = {
            access_token: accessToken,
            appID: clientId,
            timestamp,
            signature
        };
        const payload = new URLSearchParams(payloadData).toString();

        // get network list
        const networkListResponse = await axios.post(`https://www.gwn.cloud/oapi/v2.0.0/ap/info?${payload}`, body, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 30000,
            validateStatus: (status) => {
                return status >= 200 && status < 300;
            }
        });

        const networkList = networkListResponse.data;

        //* Cambiar el localhost por la ip del servidor
        const data = await axios.post(`http://localhost:3000/api/dispositivos/${mac}`, networkList.data);

        const data3 = {
            "31-05-2023": {
                "versionFirmware": "1.0.23.24",
                "ip": "187.208.197.144",
                "channel": 6,
                "mac": "C0:74:AD:B0:E4:38",
                "apType": "GWN7630LR",
                "ipv4": "192.168.1.66",
                "channel5g": 36,
                "ipv6": "2806:105e:c:179b:2:2:2:2",
                "lastFwVersion": "1.0.23.24",
                "name": "Villas de la Hacienda",
                "networkId": 56797,
                "id": "C0:74:AD:B0:E4:38",
                "status": 1,
                "bootVersion": "0.0.0.1",
                "usedMemory": "137 MB",
                "linkSpeed": [
                    {
                        "key1": "port0_speed",
                        "key2": "port0_full_duplex",
                        "value2": "1",
                        "value1": "1000",
                        "type": 0,
                        "status": "connected"
                    },
                    {
                        "key1": "port1_speed",
                        "key2": "port1_full_duplex",
                        "value2": "0",
                        "value1": "0",
                        "type": 0,
                        "status": "disconnected"
                    }
                ],
                "network": "default",
                "clientBridgeMode": -1,
                "partNumber": "9640001821A",
                "firmwareVersion": "1.0.23.24",
                "cpuUsage": "65.2%",
                "channelload_2g4": 61,
                "temperature": "43℃",
                "g24": [
                    {
                        "value": "6",
                        "key": "channel"
                    },
                    {
                        "value": "8",
                        "key": "clients"
                    },
                    {
                        "value": "27",
                        "key": "power"
                    }
                ],
                "SNR_2g4": "-13",
                "channelload_5g": 17,
                "loadAverage": [
                    284512,
                    273952,
                    259520
                ],
                "throughput": 7116,
                "ssid": [
                    {
                        "Atizapán conectado": {
                            "5g": [
                                {
                                    "rssi": -91,
                                    "clientMac": "023255caa684"
                                },
                                {
                                    "rssi": -84,
                                    "clientMac": "0ccb85e4d59d"
                                },
                                {
                                    "rssi": -89,
                                    "clientMac": "12b4ddf36a21"
                                },
                                {
                                    "rssi": -69,
                                    "clientMac": "304b075d93a7"
                                },
                                {
                                    "rssi": -79,
                                    "clientMac": "4ac727763f99"
                                },
                                {
                                    "rssi": -86,
                                    "clientMac": "56e54e9cc437"
                                },
                                {
                                    "rssi": -76,
                                    "clientMac": "5ac81b6794ac"
                                },
                                {
                                    "rssi": -80,
                                    "clientMac": "ca789cb79ad2"
                                },
                                {
                                    "rssi": -84,
                                    "clientMac": "de645d75d345"
                                },
                                {
                                    "rssi": -88,
                                    "clientMac": "fa0772cecfe1"
                                }
                            ],
                            "2g4": [
                                {
                                    "rssi": -60,
                                    "clientMac": "0008220a09fc"
                                },
                                {
                                    "rssi": -72,
                                    "clientMac": "0ebf70f6f794"
                                },
                                {
                                    "rssi": -64,
                                    "clientMac": "2411457b84d1"
                                },
                                {
                                    "rssi": -61,
                                    "clientMac": "2adfed0c7049"
                                },
                                {
                                    "rssi": -69,
                                    "clientMac": "3a6d5087fdd7"
                                },
                                {
                                    "rssi": -63,
                                    "clientMac": "56d45d3894cf"
                                },
                                {
                                    "rssi": -68,
                                    "clientMac": "d648a1fbb4e9"
                                },
                                {
                                    "rssi": -61,
                                    "clientMac": "f8c39e6cdb49"
                                }
                            ]
                        }
                    }
                ],
                "SNR_5g": "5",
                "g5": [
                    {
                        "value": "36",
                        "key": "channel"
                    },
                    {
                        "value": "10",
                        "key": "clients"
                    },
                    {
                        "value": "24",
                        "key": "power"
                    }
                ],
                "download": 132797602643,
                "clients": 14,
                "upload": 12117907998,
                "usage": 144915510641,
                "upTime": "695216",
                "fecha": "31-05-2023"
            }
        }
        const data2 = {
            "31-05-2023": {
                "versionFirmware": "1.0.23.24",
                "ip": "187.208.197.144",
                "channel": 6,
                "mac": "C0:74:AD:B0:E4:38",
                "apType": "GWN7630LR",
                "ipv4": "192.168.1.66",
                "channel5g": 36,
                "ipv6": "2806:105e:c:179b:2:2:2:2",
                "lastFwVersion": "1.0.23.24",
                "name": "Villas de la Hacienda",
                "networkId": 56797,
                "id": "C0:74:AD:B0:E4:38",
                "status": 1,
                "bootVersion": "0.0.0.1",
                "linkSpeed": [
                    {
                        "key1": "port0_speed",
                        "key2": "port0_full_duplex",
                        "value2": "1",
                        "value1": "1000",
                        "type": 0,
                        "status": "connected"
                    },
                    {
                        "key1": "port1_speed",
                        "key2": "port1_full_duplex",
                        "value2": "0",
                        "value1": "0",
                        "type": 0,
                        "status": "disconnected"
                    }
                ],
                "network": "default",
                "clientBridgeMode": -1,
                "partNumber": "9640001821A",
                "firmwareVersion": "1.0.23.24",
                "clients": 8,
                "download": 132791562261,
                "upload": 12113466570,
                "usage": 144905028831,
                "cpuUsage": "11.5%",
                "usedMemory": "135 MB",
                "g24": [
                    {
                        "value": "6",
                        "key": "channel"
                    },
                    {
                        "value": "5",
                        "key": "clients"
                    },
                    {
                        "value": "27",
                        "key": "power"
                    }
                ],
                "ssid": [
                    {
                        "Atizapán conectado": {
                            "5g": [
                                {
                                    "rssi": -71,
                                    "clientMac": "1a8f8a8b9900"
                                },
                                {
                                    "rssi": -90,
                                    "clientMac": "1ac97ac2dd93"
                                },
                                {
                                    "rssi": -81,
                                    "clientMac": "304b075d93a7"
                                },
                                {
                                    "rssi": -71,
                                    "clientMac": "4ac727763f99"
                                },
                                {
                                    "rssi": -71,
                                    "clientMac": "7e06b106989b"
                                },
                                {
                                    "rssi": -83,
                                    "clientMac": "de259a5726e8"
                                }
                            ],
                            "2g4": [
                                {
                                    "rssi": -58,
                                    "clientMac": "601466702088"
                                },
                                {
                                    "rssi": -73,
                                    "clientMac": "f0e4a2456e66"
                                },
                                {
                                    "rssi": -59,
                                    "clientMac": "f68a18dc3df3"
                                },
                                {
                                    "rssi": -69,
                                    "clientMac": "fa0772cecfe1"
                                }
                            ]
                        }
                    }
                ],
                "SNR_5g": "6",
                "g5": [
                    {
                        "value": "36",
                        "key": "channel"
                    },
                    {
                        "value": "8",
                        "key": "clients"
                    },
                    {
                        "value": "24",
                        "key": "power"
                    }
                ],
                "upTime": "694016",
                "channelload_2g4": 52,
                "temperature": "43℃",
                "SNR_2g4": "3",
                "channelload_5g": 17,
                "loadAverage": [
                    216800,
                    232800,
                    239520
                ],
                "throughput": 1247,
                "fecha": "31-05-2023"
            }
        };


        return data.data[obtenerFechaHoy()];
        // *return data2["31-05-2023"];

    }
}
function obtenerFechaHoy() {
    var hoy = new Date();
    var dia = hoy.getDate();
    var mes = hoy.getMonth() + 1; // Los meses comienzan desde 0
    var anio = hoy.getFullYear();

    // Formatear el día y el mes con ceros iniciales si tienen un solo dígito
    if (dia < 10) {
        dia = '0' + dia;
    }
    if (mes < 10) {
        mes = '0' + mes;
    }

    var fechaHoy = dia + '-' + mes + '-' + anio;
    return fechaHoy;
}