import Event_CategoriesRepository from "../repositories/event_categories-repository";



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
}