// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { firestore } from '../../../firebase/admin';



export default function handler(
    req,
    res
) {
    switch (req.method) {
        case 'POST':
            return postClients(req, res);
        case 'GET':
            return getClientes(req, res);

        default:
            res.status(400).json({ name: 'John Doe' });
    }
}
const postClients = async (req, res) => {

    const allClients = req.body.map((cliente) => {
        return {
            id: cliente.id ? cliente.id != "" ? cliente.id : '-' : '-',
            networkId: cliente.networkId,
            clientId: cliente.clientId,
            name: cliente.name ? cliente.name != "" ? cliente.name : '-' : '-',
            ipv4: cliente.ipv4 ? cliente.ipv4 != "" ? cliente.ipv4 : '-' : '-',
            ipv6: cliente.ipv6 ? cliente.ipv6 != "" ? cliente.ipv6 : '-' : '-',
            channel: cliente.channel ? cliente.channel != "" ? cliente.channel : '-' : '-',
            channelClass: cliente.channelClass ? cliente.channelClass != "" ? cliente.channelClass : '-' : '-',
            totalBytes: cliente.totalBytes ? cliente.totalBytes != "" ? cliente.totalBytes : '-' : '-',
            txBytes: cliente.txBytes ? cliente.txBytes != "" ? cliente.txBytes : '-' : '-',
            rxBytes: cliente.rxBytes ? cliente.rxBytes != "" ? cliente.rxBytes : '-' : '-',
            rssi: cliente.rssi ? cliente.rssi != "" ? cliente.rssi : '-' : '-',
            txRate: cliente.txRate ? cliente.txRate != "" ? cliente.txRate : '-' : '-',
            rxRate: cliente.rxRate ? cliente.rxRate != "" ? cliente.rxRate : '-' : '-',
            apId: cliente.apId ? cliente.apId != "" ? cliente.apId : '-' : '-',
            ssidId: cliente.ssidId ? cliente.ssidId != "" ? cliente.ssidId : '-' : '-',
            ssid: cliente.ssid ? cliente.ssid != "" ? cliente.ssid : '-' : '-',
            portalEnable: cliente.portalEnable ? cliente.portalEnable != "" ? cliente.portalEnable : '-' : '-',
            assoctime: cliente.assoctime ? cliente.assoctime != "" ? cliente.assoctime : '-' : '-',
            dhcpManufacture: cliente.dhcpManufacture ? cliente.dhcpManufacture != "" ? cliente.dhcpManufacture : '-' : '-',
            dhcpOs: cliente.dhcpOs ? cliente.dhcpOs != "" ? cliente.dhcpOs : '-' : '-',
            block: cliente.block ? cliente.block != "" ? cliente.block : '-' : '-',
            wired: cliente.wired ? cliente.wired != "" ? cliente.wired : '-' : '-',
            isbridge: cliente.isbridge ? cliente.isbridge != "" ? cliente.isbridge : '-' : '-',
        };
    });


    try {

        await Promise.all(allClients.map(async (cliente) => {
            await firestore.collection('Clientes').doc(cliente.clientId).set({ [obtenerFechaHoy()]: cliente }, { merge: true });
        }));



        const allClientsDB = await firestore.collection('Clientes').get();
        return res.status(200).json(allClientsDB.docs.map((doc) => doc.data()));
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }

};
const getClientes = async (req, res) => {
    try {
        const allClientsDB = await firestore.collection('Clientes').get();

        return res.status(200).json(allClientsDB.docs.map((doc) => doc.data()));
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error });
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
