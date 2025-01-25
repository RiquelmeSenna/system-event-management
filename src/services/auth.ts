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

    userModel.register(token, { ...data, password: passwordHash, });

    return [token, data]
}
