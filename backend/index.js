import express from "express";
import { PORT,mongodbURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoute from './routes/bookRoute.js';
import cors from 'cors';

const app=express();

//Middleware for parsing request body

app.use(express.json());

//middleware for handling cors policy
//option 1 allow allow all origins with default of cors(*)
// app.use(cors());

//option2 allow only custom origins
app.use(cors({
  origin:'https://kukrejamc-bookstore.netlify.app',
  methods:['GET','POST','PUT','DELETE'],
  allowHeaders:['Content-Type'],
}));

app.get("/",(request,response)=>{
    console.log(request);
    return response.status(234).send("Welcome bro")
})

app.use('/books',bookRoute);

mongoose
  .connect(mongodbURL)
  .then(()=>{
    console.log('App connected to database');
    app.listen(PORT,()=>{
        console.log(`App is listening to port :${PORT}`);
    });
  })
  .catch((error)=>{
    console.log(error);
  })
