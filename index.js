import express from "express"; 
import cors from "cors"; 
import ProvinceRouter from "./src/controllers/province-controller.js";
import LocationRouter from "./src/controllers/location-controller.js";
import Event_CategoriesRouter from "./src/controllers/event_categories-controller.js";
import UserRouter from "./src/controllers/user-controller.js";
import Event_LocationsRouter from "./src/controllers/event_locations-controller.js";
import EventRouter from "./src/controllers/event-controller.js";


const app = express(); 
const port = 3000; //Elpuerto3000(http://localhost:3000) 

//AgregolosMiddlewares 
app.use(cors());  
app.use(express.json());

app.use("/api/province",ProvinceRouter); 

app.use("/api/location",LocationRouter); 

app.use("/api/event_categories",Event_CategoriesRouter); 

app.use("/api/user",UserRouter); 

app.use("/api/event_locations",Event_LocationsRouter); 

app.use("/api/event",EventRouter); 


app.listen(port,()=>
{
    console.log(`Exampleapplisteningonport${port}`) 
})

/*
    1 HECHO
    2 HECHO
    3 HECHO
    4 HECHO
    5 HECHO
    6 HECHO
    7 HECHO
    8 HECHO
    9 HECHO
    10
    11 HECHO
    12 HECHO
    13 HECHO
*/

