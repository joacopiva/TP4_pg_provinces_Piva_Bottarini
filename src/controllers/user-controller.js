import {Router} from 'express';
import UserService from '../service/user-service.js';
import helpers from '../helpers/helpers.js';

const router = Router();
const svc = new UserService();
const help = new helpers;



router.post('', async (req, res) => 
{
    let respuesta
    let entity = req.body;

    const { first_name, last_name, password, username } = req.body;
    const campos = [first_name, last_name, password];


    if(entity != null && campos.every(campo => help.validarVaciosYMenorTresLetras(campo)) && help.validarSintaxis(username))
    {
        console.log("entre")
        const returnArray = await svc.createAsync(entity);
        respuesta = res.status(201).json(returnArray);

    }
    else
    {
        console.log("no entre")
        respuesta = res.status(500).send(`Error interno.`)
    }

    return respuesta
})


export default router; 