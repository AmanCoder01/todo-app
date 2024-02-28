import express from "express";
import connectDB from "./Database/index.js";
import { apiRoute, protectedRoute } from "./routes/apiRoute.js"
import cors from "cors";
import AuthMiddleware from "./middlewares/AuthMiddleware.js";
const app = express();



const corsOptions = {
    origin: 'http://localhost:3001',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}



app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" })); //body parser

app.use("/api/", apiRoute);
app.use("/api/", AuthMiddleware, protectedRoute);


connectDB()
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running on 3000`);
        })
    })
    .catch((err) => {
        console.error(err);
    });
