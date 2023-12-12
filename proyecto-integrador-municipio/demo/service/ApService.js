import getConfig from 'next/config';
import sha256 from 'crypto-js/sha256';
import axios from 'axios';
import { municipioApi } from '../../api';

export const ApService = {

    async getApList() {
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
            "type": "",
            "order": "",
            "search": "",
            "pageNum": 1,
            "pageSize": 125,
            "networkId": "56797",
            "filter": {
                "showType": "all"
            }
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
        const networkListResponse = await axios.post(`https://www.gwn.cloud/oapi/v1.0.0/ap/list?${payload}`, body, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 30000,
            validateStatus: (status) => {
                return status >= 200 && status < 300;
            }
        });

        const networkList = networkListResponse.data;

        const data = await municipioApi.post('http://localhost:3000/api/dispositivos', networkList['data']['result']);


        const data2 = [
            {
                "31-05-2023": {
                    "clients": 5,
                    "versionFirmware": "1.0.23.24",
                    "upload": 15111416952,
                    "ip": "189.139.53.141",
                    "usage": 102740122520,
                    "channel": 6,
                    "mac": "C0:74:AD:97:41:80",
                    "apType": "GWN7630LR",
                    "upTime": 1061424,
                    "download": 87628705568,
                    "ipv4": "192.168.1.67",
                    "channel5g": 44,
                    "ipv6": "2806:105e:c:8f09:c274:adff:fe97:4180",
                    "lastFwVersion": "1.0.23.24",
                    "name": "Espacio público UAM",
                    "networkId": 56797,
                    "id": "C0:74:AD:97:41:80",
                    "status": 0
                }
            },
            {
                "31-05-2023": {
                    "clients": 3,
                    "versionFirmware": "1.0.23.24",
                    "upload": 7329821561,
                    "ip": "187.236.102.247",
                    "usage": 83886980397,
                    "channel": 6,
                    "mac": "C0:74:AD:97:41:94",
                    "apType": "GWN7630LR",
                    "upTime": 2068853,
                    "download": 76557158836,
                    "ipv4": "192.168.1.64",
                    "channel5g": 40,
                    "ipv6": "2806:104e:1d:8b3:e0f5:3557:b99e:a75f",
                    "lastFwVersion": "1.0.23.24",
                    "name": "Parque de Hogares de Atizapán",
                    "networkId": 56797,
                    "id": "C0:74:AD:97:41:94",
                    "status": 0
                }
            },
            {
                "31-05-2023": {
                    "versionFirmware": "1.0.23.24",
                    "ip": "187.131.134.133",
                    "channel": 6,
                    "mac": "C0:74:AD:97:41:9C",
                    "apType": "GWN7630LR",
                    "ipv4": "192.168.1.64",
                    "channel5g": 44,
                    "ipv6": "2806:104e:11:7dc:c274:adff:fe97:419c",
                    "lastFwVersion": "1.0.23.24",
                    "name": "Kiosco Atizapán Centro",
                    "networkId": 56797,
                    "id": "C0:74:AD:97:41:9C",
                    "status": 1,
                    "upTime": 113849,
                    "download": 110560815543,
                    "upload": 8370937952,
                    "usage": 118931753495,
                    "clients": 5
                }
            },
            {
                "31-05-2023": {
                    "clients": 21,
                    "versionFirmware": "1.0.23.24",
                    "upload": 26446500179,
                    "ip": "187.131.199.47",
                    "usage": 318193267765,
                    "channel": 6,
                    "mac": "C0:74:AD:97:42:A8",
                    "apType": "GWN7630LR",
                    "upTime": 4398,
                    "download": 291746767586,
                    "ipv4": "192.168.1.65",
                    "channel5g": 157,
                    "ipv6": "2806:104e:11:6e23:2:2:2:2",
                    "lastFwVersion": "1.0.23.24",
                    "name": "Plaza Lic. Adolfo López Mateos",
                    "networkId": 56797,
                    "id": "C0:74:AD:97:42:A8",
                    "status": 0
                }
            },
            {
                "31-05-2023": {
                    "clients": 8,
                    "versionFirmware": "1.0.19.33",
                    "upload": 27159942625,
                    "ip": "201.110.142.90",
                    "usage": 370200327243,
                    "channel": 6,
                    "mac": "C0:74:AD:97:45:20",
                    "apType": "GWN7630LR",
                    "upTime": 1112060,
                    "download": 343040384618,
                    "ipv4": "192.168.1.72",
                    "channel5g": 36,
                    "ipv6": "2806:104e:17:93a7:2:2:2:0",
                    "lastFwVersion": "1.0.19.33",
                    "name": "Hospital General de Atizapán de Zaragoza Dr Salvador Gonzales He",
                    "networkId": 56797,
                    "id": "C0:74:AD:97:45:20",
                    "status": 0
                }
            },
            {
                "31-05-2023": {
                    "versionFirmware": "1.0.23.24",
                    "upload": 745337255,
                    "ip": "187.131.13.239",
                    "usage": 9112705499,
                    "channel": 6,
                    "mac": "C0:74:AD:97:45:6C",
                    "apType": "GWN7630LR",
                    "download": 8367368244,
                    "ipv4": "192.168.1.92",
                    "channel5g": 157,
                    "ipv6": "fdfc:79d:47ac:0:7f39:28fe:eaba:51de",
                    "lastFwVersion": "1.0.23.24",
                    "name": "Biblioteca Joaquin Arcadio",
                    "networkId": 56797,
                    "id": "C0:74:AD:97:45:6C",
                    "status": 1,
                    "upTime": 8580523,
                    "clients": 1
                }
            },
            {
                "31-05-2023": {
                    "versionFirmware": "1.0.23.24",
                    "ip": "187.236.106.171",
                    "channel": 11,
                    "mac": "C0:74:AD:97:48:80",
                    "apType": "GWN7630LR",
                    "ipv4": "192.168.1.65",
                    "channel5g": 44,
                    "ipv6": "2806:104e:1d:2391:c274:adff:fe97:4880",
                    "lastFwVersion": "1.0.23.24",
                    "name": "Monumento a Pedro Infante",
                    "networkId": 56797,
                    "id": "C0:74:AD:97:48:80",
                    "status": 1,
                    "upTime": 2452850,
                    "download": 235856324739,
                    "upload": 21065665390,
                    "usage": 256921990129,
                    "clients": 7
                }
            },
            {
                "31-05-2023": {
                    "versionFirmware": "1.0.23.24",
                    "ip": "187.131.219.204",
                    "channel": 1,
                    "mac": "C0:74:AD:97:52:8C",
                    "apType": "GWN7630LR",
                    "ipv4": "192.168.1.65",
                    "channel5g": 36,
                    "ipv6": "2806:104e:11:2687:c274:adff:fe97:528c",
                    "lastFwVersion": "1.0.23.24",
                    "name": "Deportivo México 86",
                    "networkId": 56797,
                    "id": "C0:74:AD:97:52:8C",
                    "status": 1,
                    "upTime": 8580225,
                    "download": 271510384346,
                    "upload": 29762460511,
                    "usage": 301272844857,
                    "clients": 5
                }
            }
        ]

        const newArray = [];
        data.data.forEach(item => {
            //*data2.forEach(item => {  //esta se comenta

            Object.entries(item).forEach(([date, values]) => {
                if (date !== 'date') {
                    values['fecha'] = date;
                    newArray.push(values);
                }
            });
        });


        return newArray;

    }
}