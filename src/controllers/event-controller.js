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


router.post('', mw.desencriptacion, async (req, res) => 
{
    let respuesta
    let entity = req.body;
    const {name, description} = req.body;
    const campos = [name, description];

    const GetAll = await svc.GetLocationByEventId(req.body.id_event_location);
    console.log(entity)

    if(entity != null && (campos.every(campo => help.validarVaciosYMenorTresLetras(campo))) == true && GetAll[0].max_capacity > entity.max_assistance)
    {
        const returnArray = await svc.createAsync(entity);
        respuesta = res.status(201).json(returnArray);

    }
    else if(GetAll[0].max_capacity < entity.max_assistance)
    {
        respuesta = res.status(408).send(`incorrect request`)
    }
    else
    {
        respuesta = res.status(400).send(`bad request`)
    }

    return respuesta
})

router.put('', mw.desencriptacion, async (req, res) => 
{

    let respuesta;
    let entity = req.body;
    const {name, description} = req.body;
    const campos = [name, description];

    const GetAll = await svc.GetEventId(req.body.id);
    console.log("Get All 1", GetAll)

    const GetAll2 = await svc.GetLocationByEventId(req.body.id_event_location);
    console.log("Get All 2", GetAll2)

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
            respuesta = res.status(200).json(returnArray);
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

router.delete('/:id', mw.desencriptacion, async (req, res) => 
{  
    let id = req.params.id;
    let respuesta;

    const getAll = await svc.GetEventId(id);
        
    if(getAll != "")
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


//Inscripcion a un evento

router.get('/:id/enrollment/participants', async (req, res) =>
{

    const idEvento = req.params.id
    let respuesta;
    const returnArray = await svc.getAllEnrollmentByEventIdAsync(idEvento);

    if(returnArray != null)
    {  
        respuesta = res.status(200).json(returnArray);
    } 
    else
    {
        respuesta = res.status(500).send(`Error interno.`)
    }
    return respuesta;
})


router.post('/:id/enrollment', mw.desencriptacion, async (req, res) => 
{
    let respuesta;
    let idEvento = req.params.id;
    let usuario = req.user;
    let encontrado = false;
    let cantidadParticipantes = 0;
    const DetalleEvento = await svc.GetEventId(idEvento);
    const DetalleLocation = await svc.GetLocationByEventId(DetalleEvento[0].id_event_location);
    const DetalleEnrollment = await svc.getAllEnrollmentByEventIdAsync(idEvento)
    cantidadParticipantes = (Object.keys(DetalleEnrollment).length) + 1
    const fechaActual = new Date();
    const diferenciaEnMs = new Date(DetalleEvento[0].start_date).getTime() - fechaActual.getTime();
    var diferenciaEnAnios = diferenciaEnMs / (1000 * 3600 * 24 * 365.25);

    const getEnrollment = await svc.getAllEnrollmentByIdAsync(usuario.id)

    for (let i = 0; i < getEnrollment.length; i++) 
    {
        if (getEnrollment[i].id_event == idEvento) 
        {
            encontrado = true;
        }
    }

    if(DetalleEvento[0].max_assistance > DetalleLocation[0].max_capacity || diferenciaEnAnios <= 0 || DetalleEvento[0].enabled_for_enrollment == 0 || encontrado == true || DetalleEvento[0].max_assistance < cantidadParticipantes)
    {
        res.status(400).send(`bad request`);
    }
    else
    {
        const returnArray = await svc.createUserEnrollment(usuario, idEvento);  

        if (returnArray != null) 
        {
            res.status(200).json(returnArray);
        } else 
        {
            res.status(404).send(`not found`);
        }
    }

    
    return respuesta;
})

router.delete('/:id/enrollment', mw.desencriptacion, async (req, res) => 
{
    let respuesta;
    let encontrado = false;
    let usuario = req.user;
    let idEvento = req.params.id;
    const getEnrollment = await svc.getAllEnrollmentByIdAsync(usuario.id)
    const DetalleEvento = await svc.GetEventId(idEvento);
    const fechaActual = new Date();
    const diferenciaEnMs = new Date(DetalleEvento[0].start_date).getTime() - fechaActual.getTime();
    var diferenciaEnAnios = diferenciaEnMs / (1000 * 3600 * 24 * 365.25);

    for (let i = 0; i < getEnrollment.length; i++) 
    {
        if (getEnrollment[i].id_event == idEvento) 
        {
            encontrado = true;
        }
    }

        
    if(encontrado == true && diferenciaEnAnios >= 0)
    {
        const returnArray = await svc.deleteUserEnrollmentByIdAsync(usuario.id, idEvento);
        if(returnArray != null)
        {
            respuesta = res.status(200).json(returnArray);
        }
        else
        {
            respuesta = res.status(404).json(`not found`);
        }

    }
    else
    {
        respuesta = res.status(400).send(`not found`)
    }
    

    return respuesta;

})

router.patch('/:id/enrollment/:rating', mw.desencriptacion, async (req,res)=>
{
    let respuesta;
    let encontrado = false;
    const rating = req.params.rating;
    const idUser = req.user.id;
    const idEvent = req.params.id;
    const getEnrollment = await svc.getAllEnrollmentByIdAsync(idUser)
    const DetalleEvento = await svc.GetEventId(idEvent);
    const fechaActual = new Date();
    const diferenciaEnMs = new Date(DetalleEvento[0].start_date).getTime() - fechaActual.getTime();
    var diferenciaEnAnios = diferenciaEnMs / (1000 * 3600 * 24 * 365.25);

    for (let i = 0; i < getEnrollment.length; i++) 
    {
        if (getEnrollment[i].id_event == idEvent) 
        {
            encontrado = true;
        }
    }

    if(help.ValidarRating(rating) == false || diferenciaEnAnios <= 0 || encontrado == false)
    {
        return respuesta = res.status(400).send(`bad request`);
    }
    else
    {
        const returnArray = await svc.updateEnrollmentAsync(idEvent, idUser, rating, req.body.observations);

        if(returnArray == "")
        {
            return respuesta = res.status(404).send(`not found`);
        }
        else
        {
            return respuesta = res.status(200).send(`un exito`);
        }
    }





    
})

export default router