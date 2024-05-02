import express from "express"; 
import cors from "cors"; 
import ProvinceRouter from "./src/controllers/province-controller.js" 

constapp = express(); 
constport = 3000; //Elpuerto3000(http://localhost:3000) 

//AgregolosMiddlewares 
app.use(cors());  //MiddlewaredeCORS. 
app.use(express.json()); //MiddlewareparaparsearycomprenderJSON. 
// 
//Endpoints(todoslosRouters) 
// 
app.use("/api/province",ProvinceRouter); 
// 
//InicioelServerylopongoaescuchar. 
// 
app.listen(port,()=>
{
    console.log(`Exampleapplisteningonport${port}`) 
})