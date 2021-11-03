import jwt from 'jsonwebtoken'

const auth = async (req,res,next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        const isCustomAuth = token.length < 500 //ça veut dire que c'est authentification normale  et non pas google Auth

        let decodedData;
        if(token &&isCustomAuth ){

            decodedData = jwt.verify(token,'test')

            req.userId=decodedData?.id
        }
        else{
            decodedData = jwt.decode(token)

            req.userId=decodedData?.sub

        }

        next();
    } catch (error) {
        console.log(error)
    }
}
export default auth