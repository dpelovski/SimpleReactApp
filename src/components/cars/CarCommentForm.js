import React from 'react'
import Input from '../common/Input'

const CarCommentForm = (props) => (
  <form>
      <div>{props.error}</div>
      <div>Rate this car</div>
      <select name='rating' onChange={props.onChange}>
        <option name='1' value='1'>1</option>
        <option name='2' value='2'>2</option>
        <option name='3' value='3'>3</option>
        <option name='4' value='4'>4</option>
        <option name='5' value='5'>5</option>
      </select>
      <Input
        name='comment'
        placeholder='Comment'
        onChange={props.onChange}
      />
      <input type='submit' onClick={props.onSave} />  
  </form>
)

export default CarCommentForm