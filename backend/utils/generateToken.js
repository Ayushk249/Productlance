import jwt from 'jsonwebtoken'

const generateToken = (response,userId) => {
    const token = jwt.sign({userId : userId}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })

    // storing token in HTTP only cookie
    response.cookie('jwt',token,{
        httpOnly: true,
        secure:process.env.NODE_ENV!=='development',
        samesite: 'strict',
         maxAge : 30 * 24* 60 *60 *1000  //30days
    })
}

export default generateToken