// import express, { Application, Request, Response} from 'express';
// const app: Application = express()
// const PORT: number = 5003;

// app.use("/bidbattle/v1/", (req: Request, res: Response) => {
//     res.send("please work karo yaar")
// });


// app.listen(PORT, () => console.log(`Server running in port : ${PORT}`));


// package imports
import express, { Application } from "express";
import path from "path";
import cors from "cors";

// route imports
import auth_routes from "./src/routes/auth";
import object_routes from "./src/routes/objects_route";
import display_routes from "./src/routes/display_route";

// port details
const app: Application = express();
const port: number = 5005;

// express configuration
app.use(express.static("./BidBattle_Frontend"))
app.use('/uploads', express.static(path.join(__dirname.replace("\\dist", ""), '/uploads')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())
// app.use(upload.array(object_routes))

// url routes
app.use('/bidbattle/auth', auth_routes)
app.use('/bidbattle/object', object_routes)
app.use('/bidbattle/display', display_routes)

// to check if server is running
app.listen(port, () => {
  console.log(`Server listening to port ${port}`);
});