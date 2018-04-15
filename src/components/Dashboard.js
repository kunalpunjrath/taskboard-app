import React from 'react'
import BoardThumb from './BoardThumb'
import { graphql, compose } from 'react-apollo'
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

class Dashboard extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.getUserBoards.refetch()
    }
  }

  render() {
    const { classes, getUserBoards, userId } = this.props
    console.log(`user from state: ${userId}`)
    if (getUserBoards.loading) {
      return (
        <div className='flex w-100 h-100 items-center justify-center pt7'>
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }

    return (
      <React.Fragment>
        <h1>Personal Boards</h1>
        <div className={classes.root}>
          <Grid container spacing={24}>
            {getUserBoards.dashboard &&
              getUserBoards.dashboard.map(board => (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Paper className={classes.paper}>
                    <BoardThumb
                      key={board.id}
                      title={board.title}
                      id={board.id}
                      refresh={() => getUserBoards.refetch()}
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
}


const mapStateToProps = (state, ownProps) => {
  return {
    userId: state.users.userId 
  }
}

const reduxWrapper = connect(
  mapStateToProps
)

const FEED_QUERY = gql`
  query getUserBoards($id: ID!){
    dashboard(userId: $id){
      title
      positionIndex
      id
    }
  }
`
const gqlWrapper = graphql(FEED_QUERY, {
  name: 'getUserBoards', // name of the injected prop: this.props.getUserBoards...
  options: (ownProps) => ({
    variables: {
      id: ownProps.userId,
      orderBy: 'positionIndex_ASC'
    }
  }),
})

// `compose` makes wrapping component much easier and cleaner
export default compose(
  reduxWrapper,
  gqlWrapper,
)(withStyles(styles)(Dashboard))
