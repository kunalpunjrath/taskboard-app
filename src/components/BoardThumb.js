import React from 'react'
import { Link } from 'react-router-dom'

export default class BoardThumb extends React.Component {
  render() {
    const {
      props
    } = this
    const {
       title,
       id
    } = props

    return (
      <Link className='no-underline ma1' to={`/board/${id}`}>
        <h3 className='f3 black-80 fw4 lh-solid'>{title}</h3>
      </Link>
    )
  }
}
