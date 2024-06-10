import EventRepository from "../repositories/event-repository.js";

export default class EventService
{
    getAllAsync = async () => {
        const repo = new EventRepository();
        const returnArray = await repo.getAllAsync();
        return returnArray;
    }

    getBySTAsync = async (query) => 
    {
        const repo = new EventRepository();
        const returnArray = await repo.getBySTAsync(query);
        return returnArray;

    }

    GetId_category = async (category) => 
    {
        const repo = new EventRepository();
        const returnArray = await repo.GetId_category(category);
        return returnArray;

    }

}

