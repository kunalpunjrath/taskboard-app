import React from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'
import { connect } from 'react-redux'

import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
    marginBottom:30,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing.unit,
    position: 'absolute',
    bottom: '8.33%',
    right: '8.33%',
  },
})

class Board extends React.Component {
  render() {
    const { classes, board } = this.props
    if (board.loading) {
      return (
        <div className='flex w-100 h-100 items-center justify-center pt7'>
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }

    const boardDetails = board.boardDetails

    return (
      <React.Fragment>
        <h1>{boardDetails.title}</h1>
        <div className={classes.root}>
          <Grid container spacing={24}>
            {boardDetails &&
              boardDetails.lists.map(list => (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Paper className={classes.paper}>
                    <BoardThumb
                      key={list.id}
                      title={list.title}
                      id={list.id}
                      refresh={() => list.refetch()}
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
        </div>
        <Button variant='fab' color='primary' aria-label='add' className={classes.button}>
          <AddIcon />
        </Button>
      </React.Fragment>
    )
  }

 /*  _renderAction = ({ id, isPublished }) => {
    if (!isPublished) {
      return (
        <React.Fragment>
          <a
            className='f6 dim br1 ba ph3 pv2 mb2 dib black pointer'
            onClick={() => this.publishDraft(id)}
          >
            Publish
          </a>{' '}
          <a
            className='f6 dim br1 ba ph3 pv2 mb2 dib black pointer'
            onClick={() => this.deletePost(id)}
          >
            Delete
          </a>
        </React.Fragment>
      )
    }
    return (
      <a
        className='f6 dim br1 ba ph3 pv2 mb2 dib black pointer'
        onClick={() => this.deletePost(id)}
      >
        Delete
      </a>
    )
  }

  publishDraft = async id => {
    await this.props.publishDraft({
      variables: { id },
    })
    this.props.history.replace('/')
  } */
}

const mapStateToProps = (state, ownProps) => {
  return {
    userId: state.userId 
  }
}

const reduxWrapper = connect(
  mapStateToProps
)

const BOARD_QUERY = gql`
  query BoardQuery($id: ID!) {
    boardDetails(boardId: $id){
      title
        lists(orderBy: positionIndex_ASC) {
          id
          title
          cards {
            id
            title
          }
      }
    }
  }
`

/* const PUBLISH_MUTATION = gql`
  mutation publish($id: ID!) {
    publish(id: $id) {
      id
      isPublished
    }
  }
` */

const gqlWrapper = graphql(BOARD_QUERY, {
  name: 'board', // name of the injected prop: this.props.board...
  options: (ownProps) => ({
    variables: {
      id: ownProps.userId
    }
  }),
})

// `compose` makes wrapping component much easier and cleaner
export default compose(
  reduxWrapper,
  gqlWrapper,
  withRouter
)(withStyles(styles)(Board))
