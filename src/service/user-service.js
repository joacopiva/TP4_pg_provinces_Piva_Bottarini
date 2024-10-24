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
            id: returnArray[0].id,
            username: returnArray[0].username
        }

        let token = jwt.sign(payload, key, options);


        
        return {token};
    }

    getByIdAsync = async (id) => 
    {
        const repo = new UserRepository();
        const returnArray = await repo.getByIdAsync(id);
        return returnArray;

    }

    getByUsernameAsync = async (username) => 
    {
        const repo = new UserRepository();
        const returnArray = await repo.getByUsernameAsync(username);
        return returnArray;

    }
}