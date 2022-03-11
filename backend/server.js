const app = require('./app')

const dotenv = require("dotenv")
const connectDatabase = require('./config/database')

//Handling Uncaught exception

process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server due to uncaughtException`)
})


dotenv.config({path:"backend/config/config.env"})

connectDatabase()

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})

//Undhandled Promise Rejection


process.on("unhandledRejection", err=>{
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server due to Unhandled promise rejection`)
    server.close(()=>{
        process.exit(1)
    })
})

