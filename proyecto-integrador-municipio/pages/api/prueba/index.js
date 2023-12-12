// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { firestore } from '../../../firebase/admin';



export default function handler(
    req,
    res
) {
    switch (req.method) {
        case 'POST':
            return postHelloWorld(req, res);

        default:
            res.status(400).json({ name: 'John Doe' });
    }
}
const postHelloWorld = async (req, res) => {
    const product = await firestore.collection('products').doc();
    const productData = {
        name: "Hello World",
    };
    await product.set(productData);


    return res.status(200).json({ name: 'John Doe' });
};
