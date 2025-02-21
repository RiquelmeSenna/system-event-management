import { User } from "../types/authType";
import { createStripeCustomer } from "./stripe";


export const createAdminUser = async () => {
    const customer = await createStripeCustomer({ email: 'riquelmeadmin@gmail.com', name: 'Riquelme Admin' })

    const adminUser: User = {
        document: '06955734113',
        email: 'riquelmeadmin@gmail.com',
        name: 'Riquelme Admin',
        password: '123456789!',
        role: 'ADMIN',
        stripeCustomerId: customer.id
    }

    return adminUser
} 