import Data from './Data'
const baseUrl = 'cars'

class CarData {
  static create(car) {
    return Data.post(`${baseUrl}/create`, car, true)
  }
  static all(page, criteria) {
    console.log(criteria)
    let search = ''
    if(criteria) {
      search = '&search=' + criteria
    }
    page = page || 1
    return Data.get(`${baseUrl}/all?page=${page}${search}`)
  }
  static getById(id) {
    return Data.get(`${baseUrl}/details/${id}`, true)
  }
  static createReview(id, review) {
    let message = {
      comment: review.review,
      rating: review.rating
    }
    return Data.post(`${baseUrl}/details/${id}/reviews/create`, message, true)
  }
  static getAllComments(id){
    return Data.get(`${baseUrl}/details/${id}/reviews/`, id, true)
  }
  static likeCar(id) {
    return Data.post(`${baseUrl}/details/${id}/like`, null, true)
  }
  static getMyCars() {
    return Data.get(`${baseUrl}/mine`, true)
  }
  static deleteCar(id) {
    return Data.post(`${baseUrl}/delete/${id}`, null, true)
  }
}

export default CarData