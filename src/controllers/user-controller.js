import {Router} from 'express';
import UserService from '../service/user-service.js';
import helpers from '../helpers/helpers.js';

const router = Router();
const svc = new UserService();
const help = new helpers;


router.post('/register', async (req, res) => 
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

router.post('/login', async(req, res)=>
{

  
    const returnArray = await svc.getByUsernamePassword(req.body.username, req.body.password);

    if(returnArray.username == req.username && returnArray != "")
    {

        const GetAll = await svc.LogIn(req.body.username, req.body.password)
        let token = GetAll.token;
        
        res.status(200).send({token})

        
    }
    else
    {
        res.status(401).json({success: false, message: 'usuario o contraseña invalido'});
    }



})


router.get('/:id', async (req, res) => 
{
    let idEvent = req.params.id;
    let respuesta;
    const returnArray = await svc.getByIdAsync(idEvent);

    
    if(returnArray != "")
    {
        respuesta = res.status(200).json(returnArray);

    }
    else
    {
        respuesta = res.status(404).send(`Id no encontrado`)
    }

    

    return respuesta;
});

router.get('/:username/user', async (req, res) => 
{

    let username = req.params.username;
    let respuesta;
    const returnArray = await svc.getByUsernameAsync(username);

    
    if(returnArray != "")
    {
        respuesta = res.status(200).json(returnArray);

    }
    else
    {
        respuesta = res.status(404).send(`user no encontrado`)
    }

    

    return respuesta;
});


export default router; 