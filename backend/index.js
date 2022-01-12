import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv" // it can load enviroment variables from .env file
import RestaurantsDAO from "./dao/restaurantsDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"

dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000 // get the port 5000 from .env file OR get 8000 as default

MongoClient.connect(
    process.env.RESTREVIEWS_DB_URI,
    {
        maxPoolSize:50, // The maximum number of connections in the connection pool
        wtimeoutMS:2500,
        useNewUrlParser:true
    }
).catch(err => {
    console.error(err.stack);
    process.exit(1)
}).then(async client => {

    await RestaurantsDAO.injectDB(client)
    await ReviewsDAO.injectDB(client)

    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    })
})