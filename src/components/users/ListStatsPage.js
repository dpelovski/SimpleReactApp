import React, { Component } from 'react'
import userActions from '../../actions/UserActions'
import userStore from '../../stores/UserStore'

class ListStatsPage extends Component {
  constructor(props){
    super(props)

    this.state = {
      users: 0,
      cars: 0
    }

    this.handleStatsFetched = this.handleStatsFetched.bind(this)

    userStore.on(userStore.eventTypes.STATS_FETCHED, this.handleStatsFetched)
  }

  handleStatsFetched(data) {
    this.setState({
      users: data.users,
      cars: data.cars
    })
  }
  
  componentWillUnmount() {
    userStore.removeListener(userStore.eventTypes.STATS_FETCHED, this.handleStatsFetched)
  }

  componentDidMount() {
    userActions.getStats()
  }
  
  render() {
    let users = this.state.users
    let cars = this.state.cars

    return (
      <div>
        <h1>Statistics</h1>
        All Users:
        {users}
        <br/>
        All Cars:
        {cars}
      </div>
    )
  }
}

export default ListStatsPage