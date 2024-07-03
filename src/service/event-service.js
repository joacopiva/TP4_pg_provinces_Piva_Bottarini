import Event_Repository from '../repositories/event-repository.js';
import Event_LocationsRepository from '../repositories/event_locations-repository.js';
import helpers from '../helpers/helpers.js';

export default class EventService
{
    createEvent = async (entity) => 
    {
        const repo = new Event_LocationsRepository();
        const validar = new helpers();
        const event_location = repo.getByIdAsync(entity.id)

        if(entity.name.length < 3 || entity.description.length < 3 )
        {
            return "El nombre o descripcion del evento debe tener una longitud superior a 3 ";
        }
        else if(validar.ValidarCreacionEvento(entity.max_assistance,event_location.id,entity.price,entity.duration_in_minutes) != "Ok")
        {
            return validar.ValidarCreacionEvento(entity.max_assistance,entity.max_capacity,entity.price,entity.duration_in_minutes);
        }
        else
        {
            return await repo.createAsync(entity);
        }
    }

    updateEvent = async (entity) =>
    {
        const repo = new Event_Repository();
        const validar = new helpers();
        const capacidadMax = await repo.obtenerCapacidadMaxima(entity.id);
    }

    deleteEvent = async (id) =>
    {
        const repo = new Event_Repository();
        const Events = await repo.updateEvent(id);
        return Events;
    }

    getEvents = async () =>
    {
        const repo = new Event_Repository ();
        const Events = await repo.getEvents();
        return Events;
    }

    getEvent = async (query) => {
        const repo = new Event_Repository();
        const Events = await repo.getEvent(query);
        return Events;
    }

    getEventDetail = async (id) => {
        const repo = new Event_Repository();
        const Events = await repo.getEventDetail(id);
        return Events;
    }

    BuscarParticipantes = async (id, first_name, last_name, username, attendent, rating) => {
        const repo = new Event_Repository()
        const resultados = await repo.BuscarParticipantes(id, first_name,last_name,username,attendent,rating)
        return resultados
    }

//CRUD

    createAsync = async (entity) => 
    {
        const repo = new Event_Repository();
        const returnArray = await repo.createAsync(entity);
        return returnArray;
    }

    GetLocationByEventId = async (id_event_location) => 
    {
        const repo = new Event_Repository();
        const returnArray = await repo.GetLocationByEventId(id_event_location);
        return returnArray;

    }

    updateAsync = async (entity) => 
    {
        const repo = new Event_Repository();
        const returnArray = await repo.updateAsync(entity);
        return returnArray;
    }

    GetEventId = async (id) =>
    {
        const repo = new Event_Repository();
        const returnArray = await repo.GetEventId(id);
        return returnArray;
    }
}