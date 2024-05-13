import {Router} from 'express';
import ProvinceService from '../service/province-service.js';

const router = Router();
const svc = new ProvinceService();

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

router.post('', async (req, res) => 
{
    let respuesta
    let entity = req.body;
    const returnArray = await svc.createAsync(entity);
    if(returnArray != null)
    {
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
    const returnArray = await svc.updateAsync(entity);
    if(returnArray != null)
    {
        respuesta = res.status(201).json(returnArray);
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
    const returnArray = await svc.deleteByIdAsync(id);
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

})

export default router;