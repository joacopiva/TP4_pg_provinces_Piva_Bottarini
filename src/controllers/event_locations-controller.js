import {Router} from 'express';
import Event_LocationsService from '../service/event_locations-service.js';
import helpers from '../helpers/helpers.js';
import Autentication from '../middlewares/autentication-middlewares.js';

const router = Router();
const mw = new Autentication();
const help = new helpers();
const svc = new Event_LocationsService();

router.get('/', mw.desencriptacion, async (req, res) => {


    let respuesta;
    const entity = req.body


    if(entity != null)
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