import striprPackage from "stripe";
import asyncHandler from "express-async-handler";


const stripe = striprPackage(process.env.STRIPE_SECRET_KEY)
// Stripe Payment Gateways Integration Start Here
export const stripePayment = asyncHandler(async (req, res, next) => {
    // const { amount, currency } = req.body;
    const paymentGateWay = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "Nodejs And ExpressJs Book",
                    },
                    unit_amount: 40 * 100,
                },
                quantity: 1,
            },
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "Javascript and Nodejs T-shirt",
                    },
                    unit_amount: 50 * 100,
                },
                quantity: 2,
            },
        ],
        mode: "payment",
        shipping_address_collection: {
            allowed_countries: ["US", "UA"],
        },
        success_url: `${process.env.BASE_URL}/complete?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.BASE_URL}/cancel`,
    });
    res.json({
        success: true,
        paymentGateWay: paymentGateWay.id,
    });
    res.redirect(paymentGateWay.url);
})

