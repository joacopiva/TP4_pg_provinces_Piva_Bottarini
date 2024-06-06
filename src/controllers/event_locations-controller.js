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


router.get('/:id', /*mw.desencriptacion,*/ async (req, res) => 
{
    let id = req.params.id;
    
    let respuesta;
    const returnArray = await svc.getByIdAsync(id);

    
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

router.post('', /*mw.desencriptacion,*/ async (req, res) => 
{
    let respuesta
    let entity = req.body;
    const {name, full_address} = req.body;
    const campos = [name, full_address];

    const GetAll = await svc.getIdLocationAsync(entity.id_location)
   

    if(entity != null | (campos.every(campo => help.validarVaciosYMenorTresLetras(campo))) == true || GetAll.id != null)
    {
        const returnArray = await svc.createAsync(entity);
        respuesta = res.status(201).json(returnArray);

    }
    else
    {
        respuesta = res.status(400).send(`bad request`)
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

export default router;