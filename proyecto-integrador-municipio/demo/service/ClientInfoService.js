import sha256 from 'crypto-js/sha256';
import axios from 'axios';

export const ClientInfoService = {

    async getClientInfo() {
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
            "clientId": "FE:BC:B6:F5:68:81",
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
        const networkListResponse = await axios.get(`https://www.gwn.cloud/oapi/v1.0.0/client/info?${payload}`, body, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 30000,
            validateStatus: (status) => {
                return status >= 200 && status < 300;
            }
        });

        const networkList = networkListResponse.data;
        console.log(networkList);
        return networkList['data']['result'];
    }
}