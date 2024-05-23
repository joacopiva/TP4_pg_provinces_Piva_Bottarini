import UserRepository from "../repositories/user-repository.js";



export default class UserService
{
    createAsync = async (entity) => 
    {
        const repo = new UserRepository();
        const returnArray = await repo.createAsync(entity);
        return returnArray;
    }
}