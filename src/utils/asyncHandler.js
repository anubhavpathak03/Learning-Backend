const asyncHandler = () => {
    (err, req, res, next) => {
        Promise.resolve(requestHandler(err, req, res, next)).catch((err) => next(err));
    }
}

export { asyncHandler }


/** other way of writing asyncHandler */
/**  Higher-Order Function = A function that takes a function as an argument or returns a function. 


const asyncHandler = (fn) => {async(err, req, res, next) => {
    try {
        await fn(err, req, res, next)
    } catch (error) {
        res.status(err.code || 500).json({
            success: false,
            message: err.message,
        })
    }
}}
    
*/