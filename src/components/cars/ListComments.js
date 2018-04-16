import React, { Component } from 'react'
import carActions from '../../actions/CarActions'
import carStore from '../../stores/CarStore'

class ListComments extends Component {
  constructor(props){
    super(props)

    this.state = {
      comments: []
    }

    this.handleCommentsFetched = this.handleCommentsFetched.bind(this)
    
    carStore.on(carStore.eventTypes.COMMENTS_FETCHED, this.handleCommentsFetched)
  }

  handleCommentsFetched(data) {
    this.setState({
      comments: data
    })
  }

  componentDidMount() {
    let pageParams = this.props.params
    let id = (parseInt(pageParams.id,10))

    carActions.getAllComments(id)
  }
  
  render() {
    let message = 'No comments yet, be the first!'

    if(this.state.comments.length > 0){
      message = ''
    }
    
    let comments = this.state.comments.map((obj, index) => {
      return (
        <div key={index}>
          <div>From: {obj.user} rating: {obj.rating}</div>
          <div>{obj.message}</div>
        </div>
      )
    })
    
    return (
      <div className='comments'>
        <h3>Comments</h3>
        {message}
        {comments}
        <br/>
        <br/>
      </div>
    )
  }
}

export default ListComments