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
        let encontrado = false;


        getAll.forEach(element => {
            if(element.id == entity.id)
            {
                encontrado = true;
            }
        });

        
        console.log(getAll)
        if(encontrado)
        {
            respuesta = res.status(201).json(returnArray);
        }
        else
        {
            respuesta = res.status(404).send(`not found`)
        }

    }
    else
    {
        respuesta = res.status(500).send(`Error interno.`)
    }

    return respuesta
})

router.delete('/:id', async (req, res) => 
{
    let id = req.params.id;
    let respuesta;

    const getAll = await svc.getAllAsync();


    let encontrado = false;

        getAll.forEach(element => {
            if(element.id == id)
            {
                encontrado = true;
            }
        });

        
        if(encontrado)
        {
            const returnArray = await svc.deleteByIdAsync(id);
            respuesta = res.status(200).json(returnArray);
        }
        else
        {
            respuesta = res.status(404).send(`not found`)
        }
    

    return respuesta;

})


export default router;
