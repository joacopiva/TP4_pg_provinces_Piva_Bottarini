import {Router} from 'express';
import Event_LocationsService from '../service/event_locations-service.js';
import helpers from '../helpers/helpers.js';

const router = Router();
const help = new helpers;
const svc = new Event_LocationsService();

router.get('/', async (req, res) => {
    let respuesta;
    const entity = req.body

    const token = req.query.keytoken
    console.log(token)

    if(entity != null && help.UserAutentication(token) == true)
    {
        const returnArray = await svc.getAllAsync();
        respuesta = res.status(200).json(returnArray);
    } 
    else
    {
        respuesta = res.status(500).send(`Error interno.`)
    }
    return respuesta;
});

export default router;