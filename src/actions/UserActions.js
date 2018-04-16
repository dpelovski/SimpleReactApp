import dispatcher from '../dispatcher'

const userActions = {
  types: {
    REGISTER_USER: 'REGISTER_USER',
    LOGIN_USER: 'LOGIN_USER',
    GET_STATS: 'GET_STATS'
  },
  register(user) {
    dispatcher.dispatch({
      type: this.types.REGISTER_USER,
      user
    })
  },
  login(user) {
    dispatcher.dispatch({
      type: this.types.LOGIN_USER,
      user
    })
  },
  getStats() {
    dispatcher.dispatch({
      type: this.types.GET_STATS
    })
  }
}

export default userActions