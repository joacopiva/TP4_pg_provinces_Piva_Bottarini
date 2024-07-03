import {Router} from 'express';
import EventService from '../service/event-service.js';
import Autentication from '../middlewares/autentication-middlewares.js';
import helpers from '../helpers/helpers.js';

const router = Router();
const svc = new EventService();
const mw = new Autentication();
const help = new helpers();


router.get('/', async (req, res) => 
{

    try {
        const query = req.query;

        const events = await svc.getEvent(query);

        if (events != null) {
            return res.status(200).json(events);
        } else {
            return res.status(500).send('Error interno.');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno.');
    }

});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const event = await svc.getEventDetail(id);

        if (event != null) {
            return res.status(200).json(event);
        } else {
            return res.status(500).send('Error interno.');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error interno.');
    }
});

router.get('/:id/enrollment', async (req, res) => 
{
    const returnArray = await svc.BuscarParticipantes(req.params.id, req.query.first_name, req.query.last_name, req.query.username, req.query.attended, req.query.rating)
    if (returnArray != null) {
        res.status(200).json(returnArray);
    } else {
        res.status(500).send(`Error Interno`);
    }
})

// CRUD


router.post('', /*mw.desencriptacion,*/ async (req, res) => 
{
    let respuesta
    let entity = req.body;
    const {name, description} = req.body;
    const campos = [name, description];

    const GetAll = await svc.GetLocationByEventId(req.body.id_event_location);

    if(entity != null && (campos.every(campo => help.validarVaciosYMenorTresLetras(campo))) == true && GetAll[0].max_capacity > entity.max_assistance)
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

router.put('', /*mw.desencriptacion,*/ async (req, res) => 
{

    let respuesta;
    let entity = req.body;
    const {name, description} = req.body;
    const campos = [name, description];

    const GetAll = await svc.GetEventId(req.body.id);
    console.log(GetAll)

    const GetAll2 = await svc.GetLocationByEventId(req.body.id_event_location);

    if(entity != null && (campos.every(campo => help.validarVaciosYMenorTresLetras(campo))) == true && GetAll2[0].max_capacity > entity.max_assistance)
    {
        const returnArray = await svc.updateAsync(entity);
        let encontrado = false;


        GetAll.forEach(element => {
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

router.delete('/:id', /*mw.desencriptacion,*/ async (req, res) => 
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


export default router