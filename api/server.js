
import express from "express"

import  OwnerRouter from "./owner"
import  authorsRouter  from  "./authors"
import  booksRouter   from "./books"
import  bookstoresRouter from "./bookstores"



const server = express()

server.use(express.jason())


server.use("/api/owner",  OwnerRouter)
server.use("/api/authors", authorsRouter)
server.use("/api/books", booksRouter)
server.use("/api/bookstores", bookstoresRouter)





export default server;