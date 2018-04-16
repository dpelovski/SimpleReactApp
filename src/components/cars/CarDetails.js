import React, { Component } from 'react'
import carActions from '../../actions/CarActions'
import carStore from '../../stores/CarStore'
import Auth from '../users/Auth'
import ListComments from './ListComments'
import Reviews from './Reviews'
import Like from './Like'

class CarDetails extends Component {
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

    this.handleCarDetail = this.handleCarDetail.bind(this)
   
    carStore.on(carStore.eventTypes.CAR_DETAIL_FETCHED, this.handleCarDetail)
  }

  componentWillUnmount() {
    carStore.removeListener(carStore.eventTypes.CAR_DETAIL_FETCHED, this.handleCarDetail)
  }

  componentWillMount() {
    if(!Auth.isUserAuthenticated()) {
      this.props.history.push('/users/login')
    }
  }

  componentDidMount() {
    let pageParams = this.props.match.params;
    let id = (parseInt(pageParams.id,10));
    
    carActions.getById(id)
  }

  handleCarDetail(data) {
    this.setState({
      car: data
    })
  }

  render() {
    let car = this.state.car
    return(
      <div>
        <div className='car' key={car.id}>
            <img src={car.image} alt='car'/>
            <div>Make: {car.make} Model: {car.model} Year: {car.year}</div>
            <div>Engine: {car.engine}</div>
            <div>Price: {car.price}</div>
            <div>Mileage: {car.mileage}  </div>
        </div>
        Number of Likes: {this.state.car.likes}
        <Like id={car.id}/>
        <ListComments params={this.props.match.params}/>
        <Reviews params={this.props.match.params}/>
      </div>
    )
  }
}

export default CarDetails