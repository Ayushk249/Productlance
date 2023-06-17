const notFound = (req,res,next) => {
    const error = new Error (`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

const errorHandler = (err,req,res,next) => {
    let statuscode = res.statusCode ===200 ? 500 : res.statusCode
    let message = err.message

    // for mongoose bad request

    if(err.name=== 'CastError' && err.kind ==='ObjectId'){
        message = 'Resource not found'
        statuscode= 404
    }

    res.status(statuscode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? '*' : err.stack,
    });
}

export {notFound,errorHandler}