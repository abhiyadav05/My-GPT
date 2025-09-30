import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js';
import userRouter from './routes/userRoute.js';
import chatRouter from './routes/chatRoute.js';

const app=express();


await connectDB()
// Middleware 

app.use(cors())
app.use(express.json())

// Routes 

app.get('/',(req,res)=> res.send('server is live'))
app.use('/api/user',userRouter);

app.use('/api/chat',chatRouter)
const PORT=process.env.PORT|| 3000

app.listen(PORT,()=>{
    console.log(`connect with backent ${PORT}`)
})