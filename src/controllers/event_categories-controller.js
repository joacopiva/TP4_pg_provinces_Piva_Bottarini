import {Router} from 'express';
import Event_CategoriesService from '../service/event_categories-service.js';

const router = Router();
const svc = new Event_CategoriesService();

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

router.get('/:id', async (req, res) => 
{
    let id = req.params.id;
    
    let respuesta;
    const returnArray = await svc.getByIdAsync(id);

    if(returnArray != null)
    {
        respuesta = res.status(201).json(returnArray);
    }
    else
    {
        respuesta = res.status(500).send(`Error interno.`)
    }

    res.status(200).json(respuesta);


    return respuesta;
});


export default router;
