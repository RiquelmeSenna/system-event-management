import { User } from '@prisma/client';
import * as userModel from '../models/auth';
import bcrypt from 'bcrypt'
import { jwtSing } from '../middlewares/authJwt';

export const register = async (data: User) => {
    const passwordHash = await bcrypt.hash(data.password, 10);
    const token = await jwtSing(data.email);

    return userModel.register({ ...data, password: passwordHash });
}
