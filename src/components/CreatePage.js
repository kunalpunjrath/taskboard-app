import React from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class CreatePage extends React.Component {
  state = {
    title: ''
  }

  render() {
    return (
      <div className='pa4 flex justify-center bg-white'>
        <form onSubmit={this.handlePost}>
          <h1>Create Board</h1>
          <input
            autoFocus
            className='w-100 pa2 mv2 br2 b--black-20 bw1'
            onChange={e => this.setState({ title: e.target.value })}
            placeholder='Title'
            type='text'
            value={this.state.title}
          />
          <input
            className={`pa3 bg-black-10 bn ${this.state.text &&
              this.state.title &&
              'dim pointer'}`}
            disabled={!this.state.text || !this.state.title}
            type='submit'
            value='Create'
          />{' '}
          <a className='f6 pointer' onClick={this.props.history.goBack}>
            or cancel
          </a>
        </form>
      </div>
    )
  }

  handlePost = async e => {
    e.preventDefault()
    const { title, userId } = this.state
    await this.props.createBoardMutation({
      variables: { title, userId },
    })
    this.props.history.replace('/')
  }
}

const CREATE_BOARD_MUTATION = gql`
  mutation createBoard($title: String!, $userId: ID!) {
    createBoard(title: $title, userId: $userId) {
      id
      title
    }
  }
`

const CreatePageWithMutation = graphql(CREATE_BOARD_MUTATION, {
  name: 'createBoardMutation', // name of the injected prop: this.props.createBoardMutation...
})(CreatePage)

export default withRouter(CreatePageWithMutation)
