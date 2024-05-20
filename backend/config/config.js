import  mongoose from 'mongoose'

export const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URL_STRING);
        console.log(`Database connected Successfully, DBString:- ${mongoose.connection.host}`);
    }catch (error){
        console.log(`Database connection failed : ${error}`)
    }
}