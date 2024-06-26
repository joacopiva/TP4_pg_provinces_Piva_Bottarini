import {Router} from 'express';
import EventService from '../service/event-service.js';
import Autentication from '../middlewares/autentication-middlewares.js';

const router = Router();
const svc = new EventService();
const mw = new Autentication();


router.post('', /*mw.desencriptacion,*/ async (req,res) =>
{
    let cuerpo = req.body;
    cuerpo.id_creator_user = req.user.id;
    try
    {
        const events = await svc.createEvent(cuerpo);
        if (events == true) {
            return res.status(200).json("Creacion exitosa");
        } else {
            return res.status(500).send(events);
        }
    }catch{
        return res.status(500).send('Error interno.');
    }
})

router.put('',async (req,res) =>{
    try
    {
        const events = await svc.updateEvent(req.body);
        if (events == true) {
            return res.status(200).json("Modificacion exitosa");
        } else {
            return res.status(500).send(events);
        }
    }catch{
        return res.status(500).send('Error interno.');
    }
    
})


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


export default router