import sha256 from 'crypto-js/sha256';
import axios from 'axios';
import { municipioApi } from '../../api';

export const StatisticsClientService = {

    async getStatisticsClient() {
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
            "networkId": 56797,
            "type": 1
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
        const networkListResponse = await axios.post(`https://www.gwn.cloud/oapi/v1.0.0/statistics/client?${payload}`, body, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 30000,
            validateStatus: (status) => {
                return status >= 200 && status < 300;
            }
        });

        const networkList = networkListResponse.data;

        //promedio de clientes
        var promedio = 0;
        var total = 0;
        var i = 0;
        for (i = 0; i < networkList['data']['clientCounts'].length; i++) {
            total = total + networkList['data']['clientCounts'][i];
        }
        promedio = total / networkList['data']['clientCounts'].length;
        promedio = Math.floor(promedio);
        //array con fecha y promedio
        var statisticsClient = {
            date: obtenerFechaActual(),
            numClients: promedio
        };
        const data = await municipioApi.post('http://localhost:3000/api/statisticsClients', statisticsClient);
        return data.data;
        //return networkList['data']['result'];
    }
}
function obtenerFechaActual() {
    var fecha = new Date();
    var dia = fecha.getDate();
    var mes = fecha.getMonth() + 1; // ¡Recuerda que los meses van de 0 a 11!
    var anio = fecha.getFullYear();

    // Asegurarse de que los valores tengan siempre dos dígitos
    if (dia < 10) {
        dia = '0' + dia;
    }
    if (mes < 10) {
        mes = '0' + mes;
    }

    var fechaActual = dia + '-' + mes + '-' + anio;
    return fechaActual;
}