import Event_CategoriesRepository from "../repositories/event_categories-repository.js";



export default class Event_CategoriesService
{
    getAllAsync = async () => {
        const repo = new Event_CategoriesRepository();
        const returnArray = await repo.getAllAsync();
        return returnArray;
    }

    getByIdAsync = async (id) => 
    {
        const repo = new Event_CategoriesRepository();
        const returnArray = await repo.getByIdAsync(id);
        return returnArray;

    }

    createAsync = async (entity) => 
    {
        const repo = new Event_CategoriesRepository();
        const returnArray = await repo.createAsync(entity);
        return returnArray;
    }

    updateAsync = async (entity) => 
    {
        const repo = new Event_CategoriesRepository();
        const returnArray = await repo.updateAsync(entity);
        return returnArray;
    }
    
    deleteByIdAsync = async (id) => 
    {
        const repo = new Event_CategoriesRepository();
        const returnArray = await repo.deleteByIdAsync(id);
        return returnArray;
    }
}