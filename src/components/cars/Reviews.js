import React, { Component } from 'react'
import carActions from '../../actions/CarActions'
import carStore from '../../stores/CarStore'
import CarCommentForm from './CarCommentForm'
import FormHelpers from '../common/FormHelpers'
import toastr from 'toastr'

class Reviews extends Component {
  constructor(props) {
    super(props)

    this.state = {
      review: '',
      rating: 1
    }

    this.handleReviewCreated = this.handleReviewCreated.bind(this)
    carStore.on(carStore.eventTypes.REVIEW_CREATED, this.handleReviewCreated)
  }

  handleReview(event) {
    const target = event.target
    const value = target.value

    if(target.name === 'rating') {
      this.setState({
        rating: parseInt(value, 10)
      })
    } else {
      this.setState({
        review: value
      })
    }
  }

  handleReviewForm(event) {
    event.preventDefault()
    let pageParams = this.props.params
    let id = (parseInt(pageParams.id,10))
    let review = this.state

    carActions.createReview(id, review)  
    carActions.getAllComments(id)
  }

  handleReviewCreated(data) {
    if(!data.success) {
      let firstError = FormHelpers.getFirstError(data)
       
      this.setState({
        error: firstError
      })
    } else {
      toastr.success(data.message)
    }
  }

  render() {
    return (
      <div>
        <div>{this.state.error}</div>
        <CarCommentForm 
        onChange={this.handleReview.bind(this)}
        onSave={this.handleReviewForm.bind(this)}/>
      </div>
    )
  }
}

export default Reviews