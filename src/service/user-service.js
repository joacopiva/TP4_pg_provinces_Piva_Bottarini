import UserRepository from "../repositories/user-repository.js";



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
        const returnArray = await repo.LogIn(username, password);
        return returnArray;
    }
}