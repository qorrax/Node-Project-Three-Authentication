// Create endpoints for authors, make sure to use the middleware to authenticate the token


import express from  "express";
import prisma from  "./lib/index.js"


const router  = express.Router();


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

router.get("/:id", async (req, res) => {
    try {
        
        const { id } = req.params;

        const author = await prisma.author.findUnique({
            where: {
                id: Number(id),
            },
        });

        if(!author) {
            return res.status(404).json({status: 404, message: "Author not found"})
        }

        res.json(author)

    } catch (error) {
        res.status(500).json({status: 500, message: error.message})
    }
});

  // create a new author

router.post("/create_author", async (req, res) => {
    try {
        
        const { name} = req.body;

        const newAuthor = await prisma.author.create({
            data: {
                name,
                
            },
        });

        res.json(newAuthor)




    } catch (error) {
        res.status(500).json({status: 500, message: error.message})
    }


    
}
);

export default router

