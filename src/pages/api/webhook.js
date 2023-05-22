// import {buffer} from 'micro';
// import * as admin from 'firebase-admin';

// const serviceAccount = require('../../../permissions.json');

// const app = !admin.apps.length ? admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// }) : admin.app();

// const Stripe = require('stripe')
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

// // const fulfillOrder = async (session) => {
// //     console.log("fulfilling Order", session);
// //     return app.firestore().collection("users").doc(session.metadata.email).collection("orders").doc(session.id)
// //     .set({
// //         amount: session.amount_total / 100,
// //         amount_shipping: session.total_details.amount_shipping / 100,
// //         images: JSON.parse(session.metadata.images),
// //         timestamp: admin.firestore.FieldValue.serverTimestamp()
// //     })
// //     .then(() => {
// //         console.log(`SUCCESS: Order ${session.id} has been added`)
// //     })
// // }
// const fulfillOrder = async (session) => {
//     try {
//         console.log("fulfilling Order", session);
//         await app.firestore()
//             .collection("users")
//             .doc(session.metadata.email)
//             .collection("orders")
//             .doc(session.id)
//             .set({
//                 amount: session.amount_total / 100,
//                 amount_shipping: session.total_details.amount_shipping / 100,
//                 images: JSON.parse(session.metadata.images),
//                 timestamp: admin.firestore.FieldValue.serverTimestamp()
//             });
//         console.log(`SUCCESS: Order ${session.id} has been added`);
//     } catch (error) {
//         console.error(`ERROR: ${error}`);
//     }
// }


// export default async function handler(res, req){
//     if(req.method === "POST"){
//         const requestBuffer = await buffer(req);
//         const payload = requestBuffer.toJSON();
//         const sig = req.headers['stripe-signature'];

//         let event;

//         try{
//             event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
//         } catch(err){
//             console.log('ERROR', err.message)
//             return res.status(400).send(`Webhook error: ${err.message}`)
//         }

//         if (event.type === 'checkout.session.completed') {
//             const session = event.data.object;
//             return fulfillOrder(session).then(() => res.status(200).end())
//             .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));
//         }


//     }
// };

// export const config = {
//     api: {
//         bodyParser: false,
//         externalResolver: true

//     }
// }

import { buffer } from 'micro';
import * as admin from 'firebase-admin';

const serviceAccount = require('../../../permissions.json');

const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}) : admin.app();

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27'
});

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
    try {
        console.log("fulfilling Order", session);
        await app.firestore()
            .collection("users")
            .doc(session.metadata.email)
            .collection("orders")
            .doc(session.id)
            .set({
                amount: session.amount_total / 100,
                amount_shipping: session.total_details.amount_shipping / 100,
                images: JSON.parse(session.metadata.images),
                timestamp: admin.firestore.FieldValue.serverTimestamp()
            });
        console.log(`SUCCESS: Order ${session.id} has been added`);
    } catch (error) {
        console.error(`ERROR: ${error}`);
    }
}

export default async function handler(req, res) {
    if (req.method === "POST") {
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers['stripe-signature'];

        let event;

        try {
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        } catch (err) {
            console.log('ERROR', err.message)
            return res.status(400).send(`Webhook error: ${err.message}`)
        }

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            return fulfillOrder(session).then(() => res.status(200).end())
                .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));
        }
    }
};

export const config = {
    api: {
        bodyParser: false,
    },
};
