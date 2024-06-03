import UserRepository from "../repositories/user-repository.js";
import jwt from 'jsonwebtoken';


const key = 'Clavesecreta2000$';
const options =
{
    expiresIn:  '1h',
    issuer: 'mi_organizacion'
}

export default class UserService
{
    createAsync = async (entity) => 
    {
        const repo = new UserRepository();
        const returnArray = await repo.createAsync(entity);
        return returnArray;
    }

    getByUsernamePassword = async (username, password) => 
    {

        const repo = new UserRepository();
        const returnArray = await repo.getByUsernamePassword(username, password);
        return returnArray;

    }

    LogIn = async (username, password) =>
    {
        const repo = new UserRepository();
        const returnArray = await repo.getByUsernamePassword(username, password);
        const payload = 
        {
            id: returnArray.id,
            username: returnArray.username
        }
        let token = jwt.sign(payload, key, options);
        console.log(token)

        token = jwt.verify(token, key)
        return {token};
    }
}