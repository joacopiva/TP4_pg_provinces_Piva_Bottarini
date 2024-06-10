import {Router} from 'express';
import EventService from '../service/event-service.js';
import helpers from '../helpers/helpers.js';
import Autentication from '../middlewares/autentication-middlewares.js';

const router = Router();
const mw = new Autentication();
const help = new helpers();
const svc = new EventService();


router.get('/', async (req, res) => {
    let respuesta;
    const returnArray = await svc.getAllAsync();
    if(returnArray != null)
    {
        respuesta = res.status(200).json(returnArray);
    } 
    else
    {
        respuesta = res.status(500).send(`Error interno.`)
    }
    return respuesta;
});

router.get('/:name', async (req, res) => 
{
    let name = req.query.name;

    
    let respuesta;
    const returnArray = await svc.getBySTAsync(`SELECT * FROM events WHERE name = '${name}'`);

    
    if(returnArray != "")
    {
        respuesta = res.status(201).json(returnArray);

    }
    else
    {
        respuesta = res.status(404).send(`Id no encontrado`)
    }

    return respuesta;
});

router.get('/:category', async (req, res) => 
{
    let category = req.query.category;
    let respuesta;
    const getAll = await svc.GetId_category(category)

    
    if(getAll != "")
    {

        const returnArray = await svc.getBySTAsync(`SELECT * FROM events WHERE category = '${category}'`);
        respuesta = res.status(201).json(returnArray);

    }
    else
    {
        respuesta = res.status(404).send(`Id no encontrado`)
    }

    return respuesta;
});


export default router;