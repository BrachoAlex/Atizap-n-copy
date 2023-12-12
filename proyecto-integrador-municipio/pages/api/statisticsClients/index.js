import { firestore } from "../../../firebase/admin";
//service to save the number of clients per day in the database
export default function handler(req, res) {
    switch (req.method) {
        case "POST":
            return postStatisticsClients(req, res);

        case "GET":
            return getStatisticsClients(req, res);

        default:
            res.status(400).json({
                name: "John Doe"
            });
    }
}
const postStatisticsClients = async (req, res) => {
    const stats = req.body;
    const statsClients = {
        date: stats.date,
        numClients: stats.numClients,
    }
    try {
        const nuevoStats = await firestore.collection('PromedioClientes').doc(statsClients.date).set(statsClients, { merge: true });
        const allStatsClientsDB = await firestore.collection('PromedioClientes').get();
        return res.status(200).json(allStatsClientsDB.docs.map((doc) => doc.data()));
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}
const getStatisticsClients = async (req, res) => {
    try {
        const allStatsClientsDB = await firestore.collection('PromedioClientes').get();
        return res.status(200).json(allStatsClientsDB.docs.map((doc) => doc.data()));
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
}