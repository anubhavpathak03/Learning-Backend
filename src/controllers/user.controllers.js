import { asyncHandler } from "../utils/asyncHandler.js";


const registerUser = asyncHandler( async(err, req, res, next) => {
    res.status(200).json({
        message: "ok"
    })
})

export { registerUser }