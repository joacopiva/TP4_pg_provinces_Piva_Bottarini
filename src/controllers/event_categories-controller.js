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

    

    return respuesta;
});

router.post('', async (req, res) => 
{
    let respuesta
    let entity = req.body;


    if(entity != null && (entity.name).length > 3 && (entity.name).length != 0)
    {
        const returnArray = await svc.createAsync(entity);
        respuesta = res.status(201).json(returnArray);

    }
    else
    {
        respuesta = res.status(500).send(`Error interno.`)
    }

    return respuesta
})

router.put('', async (req, res) => 
{

    let respuesta;
    let entity = req.body;


    if(entity != null && (entity.name).length > 3 && (entity.name).length != 0)
    {
        const returnArray = await svc.updateAsync(entity);
        const getAll = await svc.getAllAsync();
        console.log(getAll)
        
        respuesta = res.status(201).json(returnArray);
    }
    else
    {
        respuesta = res.status(500).send(`Error interno.`)
    }

    return respuesta
})


export default router;
