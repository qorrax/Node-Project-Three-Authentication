// Setup Sign up and Login API for Owner

import express from 'express';
import bcrypt from 'bcrypt';
import prisma from './lib/index.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config.js';
const SECRET_KEY = "secretkey123456";

const router = express.Router();



router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {

        const existingOwner = await prisma.owner.findUnique({
        where: {
            email: email,
        },
    });

      if (existingOwner) {
        return res.status(409).json({ 
            message: 'owner already exists',
        });
      }

      // hash password
       const hashedPassword = await bcrypt.hash(password, 10);
    
       // create new owner

         const newOwner = await prisma.owner.create({
              data: {
                name,
                email,
                password: hashedPassword,
              },
         });

            return res.status(201).json({
                status: 201,
                message: 'Owner created successfully',
                owner: newOwner,
            });
            
      } catch (error) {
        return res.status(500).json({ 
            message: "Something went wrong",
            error: error.message, 
        });
      }
    }

    );

    //  create login endpoint

    router.post('/login', async (req, res) => {

        const { email, password } = req.body;

        try {
            const existingOwner = await prisma.owner.findUnique({
                where: {
                    email: email,
                },
            });


            if (!existingOwner) {
                return res.status(401).json({
                    message: 'owner does not exist',
                });
            }


            // check if password is correct
            const isPasswordCorrect = await bcrypt.compare(
                password,
                existingOwner.password
            );

            if (!isPasswordCorrect) {
                return res.status(401).json({
                    message: 'Invalid credentials',
                });
            }

            // create token

            const token = jwt.sign(
                { id: existingOwner.id, email: existingOwner.email },
                SECRET_KEY,
                { expiresIn: '1h' }

            );

            return res.status(200).json({

              message: 'Owner logged in successfully',
                token: token,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Something went wrong',
                error: error.message,
            });
        }
    }
    );



    export default router;