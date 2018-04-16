import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'
import CarData from '../data/CarData'
import carActions from '../actions/CarActions'

class CarStore extends EventEmitter {

  create(car) {
    CarData
      .create(car)
      .then(data => this.emit(this.eventTypes.CAR_CREATED, data))
  }

  all(page, criteria) {
    page = page || 1
    CarData
      .all(page, criteria)
      .then(data => this.emit(this.eventTypes.CARS_FETCHED, data))
  }

  getById(id) {
    CarData
      .getById(id)
      .then(data => this.emit(this.eventTypes.CAR_DETAIL_FETCHED, data))
  }

  createReview(id, review) {
    CarData
      .createReview(id, review)
      .then(data => this.emit(this.eventTypes.REVIEW_CREATED, data))
  }

  getAllComments(id) {
    CarData
      .getAllComments(id)
      .then(data => this.emit(this.eventTypes.COMMENTS_FETCHED, data))
  }

  likeCar(id) {
    CarData
      .likeCar(id)
      .then(data => this.emit(this.eventTypes.CAR_LIKED, data))
  }
  
  getMyCars() {
    CarData
      .getMyCars()
      .then(data => this.emit(this.eventTypes.MY_CARS_FETCHED, data))
  }

  deleteCar(id) {
    CarData
      .deleteCar(id)
      .then(data => this.emit(this.eventTypes.CAR_DELETED, data))
  }

  handleAction(action) {
    switch(action.type) {
      case carActions.types.CREATE_CAR: {
        this.create(action.car)
        break
      }
      case carActions.types.ALL_CARS: {
        this.all(action.page, action.criteria)
        break
      }
      case carActions.types.DETAIL_CAR: {
        this.getById(action.id)
        break
      }
      case carActions.types.CREATE_REVIEW: {
        this.createReview(action.id, action.review)
        break
      }
      case carActions.types.GET_ALL_COMMENTS: {
        this.getAllComments(action.id)
        break
      }
      case carActions.types.SEND_LIKE: {
        this.likeCar(action.id)
        break
      }
      case carActions.types.MY_CARS_GET: {
        this.getMyCars()
        break
      }
      case carActions.types.DELETE_CAR: {
        this.deleteCar(action.id)
        break
      }
      default: break
    }
  }
}

let carStore = new CarStore()

carStore.eventTypes = {
  CAR_CREATED: 'car_created',
  CARS_FETCHED: 'cars_fetched',
  CAR_DETAIL_FETCHED: 'car_detail_fetched',
  REVIEW_CREATED: 'comment_created',
  COMMENTS_FETCHED: 'comments_fetched',
  CAR_LIKED: 'car_liked',
  MY_CARS_FETCHED: 'my_cars_fetched',
  CAR_DELETED: 'car_deleted'
}

dispatcher.register(carStore.handleAction.bind(carStore))

export default carStore
