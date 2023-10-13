
import express from "express"

// import  OwnerRouter from "./owner"
import  authorsRouter  from  "./authors.js"
import  booksRouter   from "./books.js"
import  bookstoresRouter from "./bookstores.js"



const server = express()

server.use(express.json())


// server.use("/api/owner",  OwnerRouter)
server.use("/api/authors", authorsRouter)
server.use("/api/books", booksRouter)
server.use("/api/bookstores", bookstoresRouter)





export default server;