import React, { Component } from 'react'
import carActions from '../../actions/CarActions'
import carStore from '../../stores/CarStore'
import toastr from 'toastr'

class ProfilePage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      cars: []
    }

    this.handleMyCars = this.handleMyCars.bind(this)
    this.handleCarDeletion = this.handleCarDeletion.bind(this)

    carStore.on(carStore.eventTypes.MY_CARS_FETCHED, this.handleMyCars)
    carStore.on(carStore.eventTypes.CAR_DELETED, this.handleCarDeletion)
  }

  handleMyCars(data) {
    this.setState({
      cars: data
    })
  }

  handleCarDeletion(data) {
    if(data.success) {
      toastr.success(data.message)
      carActions.getMyCars()
    } else {
      toastr.error(data.message)
    }
  }

  componentWillUnmount() {
    carStore.removeListener(carStore.eventTypes.MY_CARS_FETCHED, this.handleMyCars)
  }

  componentDidMount() {
    carActions.getMyCars()
  }

  handleCarDeletionForm(ev) {
    ev.preventDefault()
    let id = parseInt(ev.target.name, 10)
    carActions.deleteCar(id)
  }

  render() {
    let cars = 'No cars available'
    if(this.state.cars.length > 0) {
      cars = this.state.cars.map((car, index) => {
        return (
          <div className='car' key={car.id}>
            <div>Make: {car.make} Model: {car.model} Year: {car.year}</div>
            <img src={car.image} alt='car'/>
              <form>
                <input type='submit' name={car.id} value='Delete' onClick={this.handleCarDeletionForm.bind(this)}/>
              </form>
          </div>
        ) 
      })
    }

    return(
      <div>
        {cars}
      </div>
    )
  }
}

export default ProfilePage