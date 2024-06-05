import jwt from 'jsonwebtoken';
const key = 'Clavesecreta2000$';
const options =
{
    expiresIn:  '1h',
    issuer: 'mi_organizacion'
}


export default class Autentication
{
    desencriptacion = async (req, res, next) =>
    {
        console.log(req.headers)
        let respuesta;
        const substring = req.headers.token
        console.log(substring)
        let payload = null;
        try 
        {
            payload = jwt.verify(substring, key, options)
            console.log(payload)
            respuesta = res.status(200);
        }
        catch(e)
        {
            respuesta = res.status(401).send("token no valido")
        }

        if(payload != null)
        {
            req.user = payload
            next();
        }
        else
        {
            return respuesta;
        }
    }
}