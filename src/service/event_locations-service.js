import Event_LocationsRepository from "../repositories/event_locations-repository.js";


export default class Event_LocationsService
{
    getAllAsync = async () => {
        const repo = new Event_LocationsRepository();
        const returnArray = await repo.getAllAsync();
        return returnArray;
    }

}