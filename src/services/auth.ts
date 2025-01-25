import * as userModel from '../models/auth';
import bcrypt from 'bcrypt'
import { jwtSing } from '../middlewares/authJwt';
import { User } from '../types/authType';
import { getUserByEmail } from '../models/user';

export const register = async (data: User) => {
    const hasUser = await getUserByEmail(data.email)

    if (hasUser) {
        throw new Error('User existing')
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    const token = await jwtSing(data.email);

    userModel.register({ ...data, password: passwordHash, });

    return {
        token,
        name: data.name,
        email: data.email
    }
}

export const login = async (email: string, password: string) => {
    const user = await userModel.login(email)
    if (!user) {
        throw new Error('The user does not exist')
    }
    const passwordCompare = await bcrypt.compare(password, user?.password as string)

    if (!passwordCompare) {
        throw new Error('Password is wrong')
    }

    const token = jwtSing(email)

    return {
        token,
        name: user.name,
        email
    }
}
