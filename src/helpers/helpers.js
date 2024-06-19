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

    validarProvincia = (longitude,latitude) =>
    {

        if(typeof(longitude) == 'string' || typeof(latitude) == 'string')
        {
            return "La longitud o la latitud no es un numeral";
        }
        else
        {
            return "Ok";
        }
    }

    ValidarCreacionEvento (max_assistance,CapacidadMax,price,duration_in_minutes) 
    {
    
        if(max_assistance > CapacidadMax)
        {
            return "La maxima asistencia no puede superar a la capacidad maxima";
        }
        else if (price < 0 && duration_in_minutes < 0)
        {
            return "El precio y la duracion en minutos debe ser mayor o igual a cero";
        }                           
        return "Ok";
    }

    ValidarInscripcionEvento(max_assistance,max_capacity,start_date)
    {
        if(max_assistance == max_capacity)
        {
            return "El evento ya no posee cupos";
        }
        else if(start_date < Date.now() || start_date == Date.now())
        {
            return "No puedes ingresar a un evento que ya ocurrio o que tiene lugar el dia de la fecha";
        }
        return "Ok";
    }
}

export default helpers 