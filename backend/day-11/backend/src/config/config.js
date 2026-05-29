
if(!process.env.MONGO_URI){
    throw new Error("DB not defined")

}
if(!process.env.JWT_SECRET){
    throw new Error("JWT SECRET not defined")

}



const config={
    MONGO_URI:process.env.MONGO_URI,
    JWT_SECRET:process.env.JWT_SECRET

}

module.exports = config