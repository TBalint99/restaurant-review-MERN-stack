import http from "../http-common"

class RestaurantDataService {
    getAll(page = 0) {
        return http.get(`?page=${page}`)
    }

    get(id) {
        return http.get(`/id/${id}`)
    }

    find(query, by = "name", page = 0) {
        return http.get(`?${by}=${query}&page=${page}`)
    }

    creatwReview(data) {    
        return http.post("/reviews", data)
    }

    updateReview(data) {
        return http.put("/reviews", data)
    }

    deleteReview(id) {
        return http.delete(`/reviews?id=${id}`)
    }

    getCuisines(id) {
        return http.get(`/cuisines`)
    }
}

export default new RestaurantDataService()