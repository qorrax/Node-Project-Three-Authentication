// Create endpoints for authors, make sure to use the middleware to authenticate the token


import exoress  from  "express";
import prisma from  "./lib/index.js"


const router  = exoress.Router();

router.get('/', async (req, res) => {
    try {
        
        const authors = await prisma.author.findMany();
        if(authors.length === 0) {
            return res.status(404).json({status: 404, message: "Authores not found"});
        }

        res.json(authors)

    } catch (error) {
        res.status(500).json({status: 500, message: error.message})
    }
});




)