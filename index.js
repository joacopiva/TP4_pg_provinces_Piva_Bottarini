import express from "express"; 
import cors from "cors"; 
import ProvinceRouter from "./src/controllers/province-controller.js" 

const app = express(); 
const port = 3000; //Elpuerto3000(http://localhost:3000) 

//AgregolosMiddlewares 
app.use(cors());  
app.use(express.json());  

app.use("/api/province",ProvinceRouter); 

app.listen(port,()=>
{
    console.log(`Exampleapplisteningonport${port}`) 
})

