// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { firestore } from '../../../firebase/admin';



export default function handler(
    req,
    res
) {
    switch (req.method) {
        case 'POST':
            return postDispositivos(req, res);
        case 'GET':
            return getDispositivos(req, res);

        default:
            res.status(400).json({ name: 'John Doe' });
    }
}
const postDispositivos = async (req, res) => {
    // const { apType, channel, channel5g, clients, download, ip, ipv4, ipv6, lastFwVersion, mac, name, networkId, status, upTime, upload, usage, versionFirmware } = req.body;

    const allDispositivos = req.body.map((dispositivo) => {
        return {
            apType: dispositivo.apType,
            channel: dispositivo.channel,
            channel5g: dispositivo.channel5g,
            clients: dispositivo.clients,
            download: dispositivo.download,
            ip: dispositivo.ip,
            ipv4: dispositivo.ipv4,
            ipv6: dispositivo.ipv6,
            lastFwVersion: dispositivo.lastFwVersion,
            mac: dispositivo.mac,
            name: dispositivo.name,
            networkId: dispositivo.networkId,
            status: dispositivo.status,
            upTime: dispositivo.upTime,
            upload: dispositivo.upload,
            usage: dispositivo.usage,
            versionFirmware: dispositivo.versionFirmware,
            id: dispositivo.mac
        };
    });


    try {
        await Promise.all(allDispositivos.map(async (dispositivo) => {
            await firestore.collection('Dispositivos').doc(dispositivo.id).set({ [obtenerFechaHoy()]: dispositivo }, { merge: true });
        }));

        const allDispositivosDB = await firestore.collection('Dispositivos').get();

        return res.status(200).json(allDispositivosDB.docs.map((doc) => doc.data()));
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }

};

const getDispositivos = async (req, res) => {
    try {
        const allDispositivosDB = await firestore.collection('Dispositivos').get();
        const allDispositivos = [];

        allDispositivosDB.forEach((dispositivo) => {
            allDispositivos.push({
                id: dispositivo.id,
                ...dispositivo.data()
            });
        });

        return res.status(200).json(allDispositivos);
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