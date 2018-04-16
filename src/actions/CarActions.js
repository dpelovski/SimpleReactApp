import dispatcher from '../dispatcher'

const carActions = {
  types: {
    CREATE_CAR: 'CREATE_CAR',
    ALL_CARS: 'ALL_CARS',
    DETAIL_CAR: 'DETAIL_CAR',
    CREATE_REVIEW: 'CREATE_REVIEW',
    GET_ALL_COMMENTS: 'GET_ALL_COMMENTS',
    SEND_LIKE: 'SEND_LIKE',
    MY_CARS_GET: 'MY_CARS_GET',
    DELETE_CAR: 'DELETE_CAR'    
  },
  create(car) {
    dispatcher.dispatch({
      type: this.types.CREATE_CAR,
      car
    })
  },
  all (page, criteria) {
    page = page || 1
    dispatcher.dispatch({
      type: this.types.ALL_CARS,
      page,
      criteria
    })
  },
  getById(id) {
    dispatcher.dispatch({
      type: this.types.DETAIL_CAR,
      id
    })
  },
  createReview(id, review) {
    dispatcher.dispatch({
      type: this.types.CREATE_REVIEW,
      id,
      review
    })
  },
  getAllComments(id) {
    dispatcher.dispatch({
      type: this.types.GET_ALL_COMMENTS,
      id
    })
  },
  likeCar(id) {
    dispatcher.dispatch({
      type: this.types.SEND_LIKE,
      id
    })
  },
  getMyCars(){
    dispatcher.dispatch({
      type: this.types.MY_CARS_GET
    })
  },
  deleteCar(id) {
    dispatcher.dispatch({
      type: this.types.DELETE_CAR,
      id
    })
  }
}

export default carActions