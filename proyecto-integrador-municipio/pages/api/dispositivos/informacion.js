// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { firestore } from '../../../firebase/admin';



export default function handler(
    req,
    res
) {
    switch (req.method) {
        case 'POST':
            return postInfoDispositivo(req, res);
        case 'GET':
            return getInfoDispositivo(req, res);

        default:
            res.status(400).json({ name: 'John Doe' });
    }
}
const postInfoDispositivo = async (req, res) => {
    const { mac: mac } = req.body;

    const dispositivo = req.body;


    const Dispositivo = {
        mac: dispositivo.mac,
        network: dispositivo.network ? dispositivo.network != "" ? dispositivo.network : '-' : '-',
        upTime: dispositivo.upTime ? dispositivo.upTime != "" ? dispositivo.upTime : '-' : '-',
        apType: dispositivo.apType ? dispositivo.apType != "" ? dispositivo.apType : '-' : '-',
        partNumber: dispositivo.partNumber ? dispositivo.partNumber != "" ? dispositivo.partNumber : '-' : '-',
        bootVersion: dispositivo.bootVersion ? dispositivo.bootVersion != "" ? dispositivo.bootVersion : '-' : '-',
        firmwareVersion: dispositivo.firmwareVersion ? dispositivo.firmwareVersion != "" ? dispositivo.firmwareVersion : '-' : '-',
        ip: dispositivo.ip ? dispositivo.ip != "" ? dispositivo.ip : '-' : '-',
        ipv4: dispositivo.ipv4 ? dispositivo.ipv4 != "" ? dispositivo.ipv4 : '-' : '-',
        ipv6: dispositivo.ipv6 ? dispositivo.ipv6 != "" ? dispositivo.ipv6 : '-' : '-',
        clientBridgeMode: dispositivo.clientBridgeMode ? dispositivo.clientBridgeMode != "" ? dispositivo.clientBridgeMode : '-' : '-',
        linkSpeed: dispositivo.linkSpeed ? dispositivo.linkSpeed != "" ? dispositivo.linkSpeed : '-' : '-',
        g24: dispositivo.g24 ? dispositivo.g24 != "" ? dispositivo.g24 : '-' : '-',
        g5: dispositivo.g5 ? dispositivo.g5 != "" ? dispositivo.g5 : '-' : '-',
        loadAverage: dispositivo.loadAverage ? dispositivo.loadAverage != "" ? dispositivo.loadAverage : '-' : '-',
        temperature: dispositivo.temperature ? dispositivo.temperature != "" ? dispositivo.temperature : '-' : '-',
        usedMemory: dispositivo.usedMemory ? dispositivo.usedMemory != "" ? dispositivo.usedMemory : '-' : '-',
        channelload_2g4: dispositivo.channelload_2g4 ? dispositivo.channelload_2g4 != "" ? dispositivo.channelload_2g4 : '-' : '-',
        channelload_5g: dispositivo.channelload_5g ? dispositivo.channelload_5g != "" ? dispositivo.channelload_5g : '-' : '-',
        SNR_2g4: dispositivo.SNR_2g4 ? dispositivo.SNR_2g4 != "" ? dispositivo.SNR_2g4 : '-' : '-',
        SNR_5g: dispositivo.SNR_5g ? dispositivo.SNR_5g != "" ? dispositivo.SNR_5g : '-' : '-',
        throughput: dispositivo.throughput ? dispositivo.throughput != "" ? dispositivo.throughput : '-' : '-',
        ssid: dispositivo.ssid ? dispositivo.ssid != "" ? dispositivo.ssid : '-' : '-',
        id: dispositivo.mac

    };




    try {

        const nuevoDisp = await firestore.collection('Dispositivos').doc(Dispositivo.id).set({ [obtenerFechaHoy()]: Dispositivo }, { merge: true });



        const DispositivoDB = await firestore.collection('Dispositivos').get(mac);

        return res.status(200).json(DispositivoDB);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }

};

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
