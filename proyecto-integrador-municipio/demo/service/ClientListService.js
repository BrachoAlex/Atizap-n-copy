import sha256 from 'crypto-js/sha256';
import axios from 'axios';
import { municipioApi } from '../../api';

export const ClientListService = {

    async getClientList() {
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
            "order": "",
            "search": "",
            "pageNum": 1,
            "pageSize": 700,
            "filter": {
                "ssidId": "all_ssid"
            },
            "networkId": 56797
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
        const networkListResponse = await axios.post(`https://www.gwn.cloud/oapi/v1.0.0/client/list?${payload}`, body, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 30000,
            validateStatus: (status) => {
                return status >= 200 && status < 300;
            }
        });

        const networkList = networkListResponse.data;

        const data = await municipioApi.post('http://localhost:3000/api/clientes', networkList['data']['result']);

        const data2 = [
            {
                "30-05-2023": {
                    "wired": "-",
                    "rssi": -74,
                    "clientId": "00:08:22:F0:FE:00",
                    "rxBytes": 435512191,
                    "apId": "C0:74:AD:97:5D:A0(Museo Lic. Adolfo López Mateos)",
                    "channel": 1,
                    "isbridge": "-",
                    "portalEnable": 1,
                    "rxRate": 6,
                    "ssid": "Atizapán conectado",
                    "channelClass": 2,
                    "ipv4": "10.1.0.110",
                    "txBytes": 27434011,
                    "ssidId": 141870,
                    "ipv6": "-",
                    "assoctime": "00:06:37",
                    "txRate": 28,
                    "name": "Redmi-10A",
                    "dhcpOs": "Windows",
                    "totalBytes": 462946202,
                    "block": 1,
                    "networkId": 56797,
                    "id": 10917391,
                    "dhcpManufacture": "-"
                },
                "29-05-2023": {
                    "wired": "-",
                    "rssi": -74,
                    "clientId": "00:08:22:F0:FE:00",
                    "rxBytes": 435512191,
                    "apId": "C0:74:AD:97:5D:A0(Museo Lic. Adolfo López Mateos)",
                    "channel": 1,
                    "isbridge": "-",
                    "portalEnable": 1,
                    "rxRate": 6,
                    "ssid": "Atizapán conectado",
                    "channelClass": 2,
                    "ipv4": "10.1.0.110",
                    "txBytes": 27434011,
                    "ssidId": 141870,
                    "ipv6": "-",
                    "assoctime": "00:06:37",
                    "txRate": 28,
                    "name": "Redmi-10A",
                    "dhcpOs": "IOS",
                    "totalBytes": 462946202,
                    "block": 1,
                    "networkId": 56797,
                    "id": 10917391,
                    "dhcpManufacture": "-"
                },
                "date": null
            },
            {
                "30-05-2023": {
                    "wired": "-",
                    "rssi": -71,
                    "clientId": "00:0A:F5:7F:B2:94",
                    "rxBytes": 903049,
                    "apId": "C0:74:AD:97:7A:E0(SAPASA)",
                    "channel": 1,
                    "isbridge": "-",
                    "portalEnable": 1,
                    "rxRate": 1,
                    "ssid": "Atizapán conectado",
                    "channelClass": 2,
                    "ipv4": "10.1.0.97",
                    "txBytes": 1206262,
                    "ssidId": 141870,
                    "ipv6": "-",
                    "assoctime": "00:46:55",
                    "txRate": 2,
                    "name": "android-2851306d64415853",
                    "dhcpOs": "IOS",
                    "totalBytes": 2109311,
                    "block": 1,
                    "networkId": 56797,
                    "id": 10917527,
                    "dhcpManufacture": "-"
                },
                "27-05-2023": {
                    "wired": "-",
                    "rssi": -71,
                    "clientId": "00:0A:F5:7F:B2:94",
                    "rxBytes": 903049,
                    "apId": "C0:74:AD:97:7A:E0(SAPASA)",
                    "channel": 1,
                    "isbridge": "-",
                    "portalEnable": 1,
                    "rxRate": 1,
                    "ssid": "Atizapán conectado",
                    "channelClass": 2,
                    "ipv4": "10.1.0.97",
                    "txBytes": 1206262,
                    "ssidId": 141870,
                    "ipv6": "-",
                    "assoctime": "00:46:55",
                    "txRate": 2,
                    "name": "android-2851306d64415853",
                    "dhcpOs": "IOS",
                    "totalBytes": 2109311,
                    "block": 1,
                    "networkId": 56797,
                    "id": 10917527,
                    "dhcpManufacture": "-"
                },
                "date": null
            },
            {
                "30-05-2023": {
                    "wired": "-",
                    "rssi": -73,
                    "clientId": "00:87:01:3D:F2:7A",
                    "rxBytes": 6687,
                    "apId": "C0:74:AD:97:5B:48(Del Parque)",
                    "channel": 1,
                    "isbridge": "-",
                    "portalEnable": 1,
                    "rxRate": 1,
                    "ssid": "Atizapán conectado",
                    "channelClass": 2,
                    "ipv4": "10.1.0.87",
                    "txBytes": 5838,
                    "ssidId": 141870,
                    "ipv6": "-",
                    "assoctime": "00:01:34",
                    "txRate": 65,
                    "name": "Galaxy-J5-2016",
                    "dhcpOs": "Mac",
                    "totalBytes": 12525,
                    "block": 1,
                    "networkId": 56797,
                    "id": 10918104,
                    "dhcpManufacture": "SAMSUNG"
                },
                "29-05-2023": {
                    "wired": "-",
                    "rssi": -73,
                    "clientId": "00:87:01:3D:F2:7A",
                    "rxBytes": 6687,
                    "apId": "C0:74:AD:97:5B:48(Del Parque)",
                    "channel": 1,
                    "isbridge": "-",
                    "portalEnable": 1,
                    "rxRate": 1,
                    "ssid": "Atizapán conectado",
                    "channelClass": 2,
                    "ipv4": "10.1.0.87",
                    "txBytes": 5838,
                    "ssidId": 141870,
                    "ipv6": "-",
                    "assoctime": "00:01:34",
                    "txRate": 65,
                    "name": "Galaxy-J5-2016",
                    "dhcpOs": "Linux",
                    "totalBytes": 12525,
                    "block": 1,
                    "networkId": 56797,
                    "id": 10918104,
                    "dhcpManufacture": "SAMSUNG"
                },
                "26-05-2023": {
                    "wired": "-",
                    "rssi": -73,
                    "clientId": "00:87:01:3D:F2:7A",
                    "rxBytes": 6687,
                    "apId": "C0:74:AD:97:5B:48(Del Parque)",
                    "channel": 1,
                    "isbridge": "-",
                    "portalEnable": 1,
                    "rxRate": 1,
                    "ssid": "Atizapán conectado",
                    "channelClass": 2,
                    "ipv4": "10.1.0.87",
                    "txBytes": 5838,
                    "ssidId": 141870,
                    "ipv6": "-",
                    "assoctime": "00:01:34",
                    "txRate": 65,
                    "name": "Galaxy-J5-2016",
                    "dhcpOs": "Android",
                    "totalBytes": 12525,
                    "block": 1,
                    "networkId": 56797,
                    "id": 10918104,
                    "dhcpManufacture": "SAMSUNG"
                },
                "date": null
            },
            {
                "30-05-2023": {
                    "wired": "-",
                    "rssi": -68,
                    "clientId": "00:B8:B6:AA:3D:10",
                    "rxBytes": 2113106,
                    "apId": "C0:74:AD:97:45:34(Cancha Frida Kahlo)",
                    "channel": 11,
                    "isbridge": "-",
                    "portalEnable": 1,
                    "rxRate": 39,
                    "ssid": "Atizapán conectado",
                    "channelClass": 2,
                    "ipv4": "10.1.0.185",
                    "txBytes": 342802,
                    "ssidId": 141870,
                    "ipv6": "-",
                    "assoctime": "00:02:12",
                    "txRate": 65,
                    "name": "-",
                    "dhcpOs": "Linux",
                    "totalBytes": 2455908,
                    "block": 1,
                    "networkId": 56797,
                    "id": 10917842,
                    "dhcpManufacture": "MOTOROLA"
                },
                "date": null
            },
            {
                "30-05-2023": {
                    "wired": "-",
                    "rssi": -72,
                    "clientId": "00:C3:0A:63:75:8F",
                    "rxBytes": 37153,
                    "apId": "C0:74:AD:97:45:34(Cancha Frida Kahlo)",
                    "channel": 11,
                    "isbridge": "-",
                    "portalEnable": 1,
                    "rxRate": 6,
                    "ssid": "Atizapán conectado",
                    "channelClass": 2,
                    "ipv4": "10.1.0.126",
                    "txBytes": 24198,
                    "ssidId": 141870,
                    "ipv6": "-",
                    "assoctime": "00:01:40",
                    "txRate": 65,
                    "name": "Redmi-10A",
                    "dhcpOs": "Android",
                    "totalBytes": 61351,
                    "block": 1,
                    "networkId": 56797,
                    "id": 10918223,
                    "dhcpManufacture": "-"
                },
                "date": null
            },
            {
                "30-05-2023": {
                    "wired": "-",
                    "rssi": -76,
                    "clientId": "00:C3:0A:68:65:D3",
                    "rxBytes": 347021,
                    "apId": "C0:74:AD:97:5B:58(Puente Centenario Atizapán DIF)",
                    "channel": 1,
                    "isbridge": "-",
                    "portalEnable": 1,
                    "rxRate": 6,
                    "ssid": "Atizapán conectado",
                    "channelClass": 2,
                    "ipv4": "10.1.0.16",
                    "txBytes": 418768,
                    "ssidId": 141870,
                    "ipv6": "-",
                    "assoctime": "00:22:24",
                    "txRate": 2,
                    "name": "M2006C3MG-Redmi9C",
                    "dhcpOs": "Windows",
                    "totalBytes": 765789,
                    "block": 1,
                    "networkId": 56797,
                    "id": 10917438,
                    "dhcpManufacture": "-"
                },
                "date": null
            },
            {
                "30-05-2023": {
                    "wired": "-",
                    "rssi": "-",
                    "clientId": "02:54:BE:BD:C9:96",
                    "rxBytes": "-",
                    "apId": "C0:74:AD:97:5A:C0(Biblioteca Pública Municipal José Vasconcelos)",
                    "channel": 6,
                    "isbridge": "-",
                    "portalEnable": "-",
                    "rxRate": "-",
                    "ssid": "Atizapán conectado",
                    "channelClass": 2,
                    "ipv4": "-",
                    "txBytes": "-",
                    "ssidId": "-",
                    "ipv6": "-",
                    "assoctime": "-",
                    "txRate": "-",
                    "name": "-",
                    "dhcpOs": "Mac",
                    "totalBytes": "-",
                    "block": 1,
                    "networkId": 56797,
                    "id": "-",
                    "dhcpManufacture": "-"
                },
                "date": null
            },
            {
                "30-05-2023": {
                    "wired": "-",
                    "rssi": "-",
                    "clientId": "02:82:34:5C:63:2E",
                    "rxBytes": "-",
                    "apId": "C0:74:AD:97:5B:38(Central de Abastos)",
                    "channel": 1,
                    "isbridge": "-",
                    "portalEnable": "-",
                    "rxRate": "-",
                    "ssid": "Atizapán conectado",
                    "channelClass": 2,
                    "ipv4": "-",
                    "txBytes": "-",
                    "ssidId": "-",
                    "ipv6": "-",
                    "assoctime": "-",
                    "txRate": "-",
                    "name": "-",
                    "dhcpOs": "IOS",
                    "totalBytes": "-",
                    "block": 1,
                    "networkId": 56797,
                    "id": "-",
                    "dhcpManufacture": "-"
                },
                "date": null
            },
            {
                "30-05-2023": {
                    "wired": "-",
                    "rssi": -88,
                    "clientId": "02:ED:1A:28:D4:6F",
                    "rxBytes": "-",
                    "apId": "C0:74:AD:97:48:80(Monumento a Pedro Infante)",
                    "channel": 44,
                    "isbridge": "-",
                    "portalEnable": 1,
                    "rxRate": 29,
                    "ssid": "Atizapán conectado",
                    "channelClass": 5,
                    "ipv4": "10.1.0.70",
                    "txBytes": "-",
                    "ssidId": 141870,
                    "ipv6": "-",
                    "assoctime": "00:03:27",
                    "txRate": 121,
                    "name": "BT-SPEAKER",
                    "dhcpOs": "Android",
                    "totalBytes": "-",
                    "block": 1,
                    "networkId": 56797,
                    "id": 10917431,
                    "dhcpManufacture": "-"
                },
                "date": null
            }

        ]

        // Crear un nuevo arreglo con el formato deseado
        const newArray = [];
        data.data.forEach(item => {
            //* data2.forEach(item => {

            Object.entries(item).forEach(([date, values]) => {
                if (date !== 'date') {
                    values['fecha'] = date;
                    newArray.push(values);
                }
            });
        });

        // Imprimir el JSON de salida
        //console.log("nuevo array: ", newArray);
        return newArray;
        //* return data.data;
        //return networkList['data']['result'];

    }
}