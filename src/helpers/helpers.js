const key = 'Clavesecreta2000$';
const options =
{
    expiresIn:  '1h',
    issuer: 'mi_organizacion'
}


class helpers
{
    validarVaciosYMenorTresLetras = (variable) =>
    {
        let valido = false;

        if(variable != null  && variable.length > 3)
        {
            valido = true;
        }

        return valido
    }

    validarSintaxis  = (variable) =>
    {
        let valido2 = false;
        let regExp = /[\w._%+-]+@[\w.-]+\.[a-z]{2,4}/
        if(variable.match(regExp))
        {
            console.log("validado")
            valido2 = true;
        }
        return valido2
    }

    UserAutentication = (token, key, options) => 
    {
        let validado = false;
        let tokenDesencripado = jwt.verify(token, key, options)
        console.log(tokenDesencripado)

    

        return validado
    }
}

export default helpers 