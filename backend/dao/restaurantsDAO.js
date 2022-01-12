import { ObjectId } from "mongodb";

let restaurants

export default class RestaurantsDAO {
    
    // create a static async method that can be accessible directly on the class (like: RestaurantsDAO.injectDB()), without creating an instance
    static async injectDB(conn) {
        if (restaurants) {
            return
        }
        try {
            restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
        } catch (error) {
            console.error(
                `Unable to establish a collection handle in restaurantsDAO: ${error}`
            );
        }
    }

    static async getRestaurants({
        filters = null,
        page = 0,
        restaurantsPerPage = 20
    } = {}) {

        let query
        
        if (filters) {
            if ("name" in filters) {
                query = { $text: { $search: filters["name"] } }
            } else if ("cuisine" in filters) {
                query = { "cuisine": { $eq: filters["cuisine"] } }
            } else if ("zipcode" in filters) {
                query = { "address.zipcode": { $eq: filters["zipcode"] } }
            }
        }

        let cursor

        try {
            cursor = await restaurants.find(query)
        } catch (error) {
            console.error(`Unable to find command, ${error}`)
            return { restaurantsList: [], totalNumRestaurants: 0 }
        }

        const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)

        try {
            const restaurantsList = await displayCursor.toArray()
            const totalNumRestaurants = await restaurants.countDocuments(query)

            return { restaurantsList, totalNumRestaurants }
        } catch (error) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${error}`
            );

            return { restaurantsList: [], totalNumRestaurants: 0 }
        }

    }

    static async getRestaurantById(id) {
        try {
            const pipeline = [
                {
                    $match: {
                        _id: new ObjectId(id),
                    }
                },
                {
                    $lookup: {
                        from: "reviews",
                        let: {
                            id: "$_id"
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$restaurant_id", "$$id"]
                                    }
                                }
                            },
                            {
                                $sort: {
                                    date: -1
                                }
                            }
                        ]
                    }
                }
            ]
        } catch (error) {
            
        }
    }
}