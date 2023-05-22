const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
    const { items, email } = req.body;
    
const transformedItems = items.map((item) => ({
    quantity: 1,
    price_data: {
        currency: "gbp",
        unit_amount: item.price * 100,
        product_data: {
            name: item.title,
            description: item.description, //description here
            images: [item.image],
        },
    },
}));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        // shipping_rates: ['shr_1MrFKFJnn5oxBd4T72TWcs7X'],
        shipping_address_collection: {
            allowed_countries: ['GB', 'US', 'CA']
        },
        line_items: transformedItems,
        mode: 'payment',
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        metadata: {
            email,
            images: JSON.stringify(items.map(item => item.image))
        },
        shipping_options: [
            {
              shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {amount: 100, currency: 'gbp'},
                display_name: 'Free shipping',
                delivery_estimate: {
                  minimum: {unit: 'business_day', value: 5},
                  maximum: {unit: 'business_day', value: 7},
                },
              },
            },
            {
              shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {amount: 900, currency: 'gbp'},
                display_name: 'Next day air',
                delivery_estimate: {
                  minimum: {unit: 'business_day', value: 1},
                  maximum: {unit: 'business_day', value: 1},
                },
              },
            },
          ],
    });

    res.status(200).json({ id: session.id })

};