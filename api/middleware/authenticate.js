// set up token middleware here

    import jwt   from 'jsonwebtoken';
     const  SECRET_KEY =  process.env.SECRET_KEY;

    function authenticate(req, res, next) {
        const token = req.headers.authorization;

        if(!token) {
            return res.status(401).json({ 
                message: 'Authentication failed - missing token' 
            });


            }

              console.log("TOKEN", token);



            const tokenWithoutBearer = token.split(' ')[1];


            // verify the token

            jwt.verify(tokenWithoutBearer, SECRET_KEY, (err, decodedToken) => {

                if(err) {
                    return res.status(401).json({ 
                        message: 'Authentication failed - invalid token' 
                    });
                }

                // if we get here, token is valid
                // attach the decodedToken to the request object
                req.decodedToken = decodedToken;

                // continue and go to the next middleware or route handler 

                next();
            })
    


        }

        export default authenticate;