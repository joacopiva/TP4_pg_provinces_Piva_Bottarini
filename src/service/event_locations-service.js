import Event_LocationsRepository from "../repositories/event_locations-repository.js";


export default class Event_LocationsService
{
    getAllAsync = async () => {
        const repo = new Event_LocationsRepository();
        const returnArray = await repo.getAllAsync();
        return returnArray;
    }

    getByIdAsync = async (id) => 
    {
        const repo = new Event_LocationsRepository();
        const returnArray = await repo.getByIdAsync(id);
        return returnArray;

    }

    getIdLocationAsync = async (id_location) => 
    {
        const repo = new Event_LocationsRepository();
        const returnArray = await repo.getIdLocationAsync(id_location);
        return returnArray;

    }

    createAsync = async (entity) => 
    {
        const repo = new Event_LocationsRepository();
        const returnArray = await repo.createAsync(entity);
        return returnArray;
    }

    updateAsync = async (entity) => 
    {
        const repo = new Event_LocationsRepository();
        const returnArray = await repo.updateAsync(entity);
        return returnArray;
    }

    deleteByIdAsync = async (id) => 
    {
        const repo = new Event_LocationsRepository();
        const returnArray = await repo.deleteByIdAsync(id);
        return returnArray;
    }

}

