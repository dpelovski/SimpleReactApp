import React, { Component } from 'react'
import carActions from '../../actions/CarActions'
import carStore from '../../stores/CarStore'
import toastr from 'toastr'

class Like extends Component {
  constructor(props) {
    super(props)

    this.handleCarLiked = this.handleCarLiked.bind(this)

    carStore.on(
      carStore.eventTypes.CAR_LIKED,
      this.handleCarLiked
    )
      
  }

  handleCarLiked(data) {
    toastr.success('Car liked!')
  }

  carLiked() {
    carActions.likeCar(this.props.id)

  }

  render() {
    return (
      <div>
        <input type='submit' value="Like" onClick={this.carLiked.bind(this)} />  
      </div>
    )
  }
}

export default Like