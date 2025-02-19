import Stripe from "stripe";
import { getTicket } from "../models/ticket";
import { prisma } from "../database/prismaConnection";
import { checkoutCart } from "../models/cart";

export const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
    httpClient: Stripe.createFetchHttpClient(),
});

export const getStripeCustomerByEmail = async (email: string) => {
    const custormers = await stripe.customers.list({ email });

    return custormers.data[0];
}

export type DataStripe = {
    email: string,
    name?: string
}

export const createStripeCustomer = async (data: DataStripe) => {
    const customer = await getStripeCustomerByEmail(data.email);
    if (customer) return customer

    return stripe.customers.create({
        email: data.email,
        name: data.name
    })
};

export const createStripePayment = async (name: string, price: number) => {
    const newPayment = await stripe.products.create({
        name,
        default_price_data: {
            currency: 'brl',
            unit_amount: price * 100
        }

    })

    return newPayment
}

export const generateCheckout = async (userId: string, email: string, ticketId: number) => {
    const ticket = await getTicket(ticketId)

    if (!ticket) throw new Error('Ticket not found')
    try {
        const customer = await createStripeCustomer({ email });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            client_reference_id: userId,
            customer: customer.id,
            success_url: 'http://localhost:3000/done',
            cancel_url: 'http://localhost:3000/error',
            line_items: [
                {
                    price_data: {
                        currency: 'brl',
                        product: ticket.stripeProductId,
                        unit_amount: ticket.price * 100
                    },
                    quantity: 1
                }
            ]
        })

        return {
            url: session.url
        }
    } catch (error) {
        console.log('errr', error)
    }
}

type CheckoutCompletedEvent = {
    data: {
        object: Stripe.Checkout.Session
    }
}

export const handleCheckoutCompleted = async (event: CheckoutCompletedEvent) => {
    const idUser = event.data.object.client_reference_id;
    const stripeCustomerId = event.data.object.customer;
    const checkoutStatus = event.data.object.status;

    if (checkoutStatus !== 'complete') {
        console.log('Checkout not completed')
        return;
    }

    if (!idUser || !stripeCustomerId) {
        console.log('IdUser, stripeCustomerId is required')
        throw new Error('IdUser, stripeCustomerId is required')
    }

    const userExist = await prisma.user.findFirst({ where: { id: parseInt(idUser) } })

    if (!userExist) throw new Error('User not found')

    await prisma.user.update({
        where: { id: userExist.id },
        data: {
            stripeCustomerId: stripeCustomerId as string,
        }
    })
    console.log('1 teste certo')

    await checkoutCart(userExist.id, userExist.ticketId as number)
}