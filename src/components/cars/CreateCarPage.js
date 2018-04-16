import React, { Component } from 'react'
import CreateCarForm from './CreateCarForm'
import FormHelpers from '../common/FormHelpers'
import carActions from '../../actions/CarActions'
import carStore from '../../stores/CarStore'
import Auth from '../users/Auth'
import toastr from 'toastr'

class CreateCarPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      car: {
        make: '',
        model: '',
        year: 0,
        engine: '',
        price: 0,
        image: '',
        mileage: 0
      },
      error: ''
    }

    this.handleCarCreation = this.handleCarCreation.bind(this)

    carStore.on(
      carStore.eventTypes.CAR_CREATED,
      this.handleCarCreation
    )
  }

  componentWillMount() {
    if(!Auth.isUserAuthenticated()) {
      this.props.history.push('/users/login')
    }
  }

  componentWillUnmount() {
    carStore.removeListener(
      carStore.eventTypes.CAR_CREATED,
      this.handleCarCreation
    )
  }

  handleCarCreation(data) {
    if(!data.success) {
      let firstError = FormHelpers.getFirstError(data)
       
      this.setState({
        error: firstError
      })
    } else {
      toastr.success(data.message)
      this.props.history.push(`/cars/details/${data.car.id}`)
    }
  }

  handleCarChange(event) {
    FormHelpers.handleFormChange.bind(this)(event, 'car')
  }

  handleCarForm(event) {
    event.preventDefault()

    let make = this.state.car.make
    let model = this.state.car.model
    let year = this.state.car.year
    let engine = this.state.car.engine
    let price = this.state.car.price
    let image = this.state.car.image
    let mileage = this.state.car.mileage

    if (!make || typeof make !== 'string' || make.length < 3) {
      this.setState({
        error: 'Make must be more than 3 symbols.'
      })
      return
    }
    if (!model || typeof model !== 'string' || model.length < 3) {
      this.setState({
        error: 'Model must be more than 3 symbols.'
      })
      return
    }

    if (!year || !year || year < 1950 || year > 2050) {
      this.setState({
        error: 'Year must be between 1950 and 2050.'
      })
      return
    }

    if (!engine || typeof engine !== 'string' || engine.length < 1) {
      this.setState({
        error: 'Engine must be more than 1 symbol.'
      })
      return
    }

    if (!price || !price || price < 0) {
      this.setState({
        error: 'Price must be a positive number.'
      })
      return
    }
    if (!image || typeof image !== 'string' || image === 0) {
      this.setState({
        error: 'Image URL is required.'
      })
      return
    }

    if (mileage) {
        if (mileage < 0) {
          this.setState({
          error: 'Mileage must be a positive number.'
        })
        return
      }
    }

    carActions.create(this.state.car)
  }

  render() {
    return(
      <div>
        <h1>Add a car</h1>
        <CreateCarForm
          car={this.state.car}
          error={this.state.error}
          onChange={this.handleCarChange.bind(this)}
          onSave={this.handleCarForm.bind(this)}
        />
      </div>
    )
  }
}

export default CreateCarPage