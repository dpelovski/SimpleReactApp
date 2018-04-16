import React, { Component } from 'react'
import queryString from 'query-string'
import carActions from '../../actions/CarActions'
import carStore from '../../stores/CarStore'
import { Link } from 'react-router-dom'
import ListStatsPage from '../users/ListStatsPage'
import Input from '../common/Input'

class ListCarsPage extends Component {
  constructor(props){
    super(props)

    let query = queryString.parse(this.props.location.search)
    const page = parseInt(query.page, 10) || 1

    this.state = {
      cars: [],
      page: page,
      search: ''
    }

    this.handleCarsFetched = this.handleCarsFetched.bind(this)

    carStore.on(carStore.eventTypes.CARS_FETCHED, this.handleCarsFetched)
  }

  handleCarsFetched(data) {
    this.setState({
      cars: data
    })
  }
  
  componentWillUnmount() {
    carStore.removeListener(carStore.eventTypes.CARS_FETCHED, this.handleCarsFetched)
  }

  componentDidMount() {
    carActions.all(this.state.page)
  }

  goToPrevPage() {
    let page = this.state.page
    page--
    if(page < 1) {
      page = 1
    }
    this.setState({
      page
    })
    this.props.history.push(`/?page=${page}`)

    carActions.all(page)
  }

  goToNextPage() {

    if(this.state.cars.length === 0) {
      return
    }

    let page = this.state.page
    page += 1

    this.setState({
      page
    })
    this.props.history.push(`/?page=${page}`)

    carActions.all(page)
  }

  onChangeSearch(ev) {
    this.setState({
      search: ev.target.value
    })
  }

  handleSearch(ev) {
    ev.preventDefault()
    this.props.history.push(`/?search=${this.state.search}`)
    let page = this.state.page
    carActions.all(page, this.state.search)
  }
  
  render() {
    let cars = 'No cars available'
    if(this.state.cars.length > 0) {
      cars = this.state.cars.map((car, index) => {
        return (
          <div className='car' key={car.id}>
            <div>Make: {car.make} Model: {car.model} Year: {car.year}</div>
            <img src={car.image} alt='car'/>
            <div><Link to={`/cars/details/${car.id}`}>Details</Link></div>
          </div>
        ) 
      })
    }
    return (
      <div>
        <ListStatsPage />
        <h2>Search for cars</h2>
    <form>
     <Input
        name='search'
        placeholder='Search'
        value={this.state.search}
        onChange={this.onChangeSearch.bind(this)}
      />
      <input type="submit" value="Search" onClick={this.handleSearch.bind(this)}/>
    </form>
        <h1>All Cars</h1>
        {cars}
        <div>
          <button onClick={this.goToPrevPage.bind(this)}>Prev</button>
          <button onClick={this.goToNextPage.bind(this)}>Next</button>
        </div>
      </div>
    )
  }
}

export default ListCarsPage