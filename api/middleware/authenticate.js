// set up token middleware here

    import jwt   from 'jsonwebtoken';
    import  "dotenv/config";
     const  SECRET_KEY = "secret"

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

            jwt.verify(tokenWithoutBearer, SECRET_KEY, (error, decoded) => {

                if(error) {
                    return res.status(401).json({ 
                        message: 'Authentication failed - invalid token' 
                    });
                }

                // if we get here, token is valid
                // attach the decodedToken to the request object
                req.decoded = decoded;

                // continue and go to the next middleware or route handler 

                next();
            })
    


        }

        export default authenticate;