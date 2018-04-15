import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import * as ListsActions from '../../actions/lists'

import CardsContainer from './Cards/CardsContainer'
import CustomDragLayer from './CustomDragLayer'
import { Button } from 'material-ui'
import { AddIcon } from 'material-ui-icons/Add'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withStyles } from 'material-ui'

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

class Board extends Component {
  static propTypes = {
    moveCard: PropTypes.func.isRequired,
    moveList: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.moveCard = this.moveCard.bind(this)
    this.moveList = this.moveList.bind(this)
    this.findList = this.findList.bind(this)
    this.scrollRight = this.scrollRight.bind(this)
    this.scrollLeft = this.scrollLeft.bind(this)
    this.stopScrolling = this.stopScrolling.bind(this)
    this.startScrolling = this.startScrolling.bind(this)
    this.state = { isScrolling: false }
  }

  componentWillMount() {
    //this.props.getLists(10)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.getLists.refetch()
    }
  }

  startScrolling(direction) {
    // if (!this.state.isScrolling) {
    switch (direction) {
      case 'toLeft':
        this.setState({ isScrolling: true }, this.scrollLeft())
        break
      case 'toRight':
        this.setState({ isScrolling: true }, this.scrollRight())
        break
      default:
        break
    }
    // }
  }

  scrollRight() {
    function scroll() {
      document.getElementsByTagName('main')[0].scrollLeft += 10
    }
    this.scrollInterval = setInterval(scroll, 10)
  }

  scrollLeft() {
    function scroll() {
      document.getElementsByTagName('main')[0].scrollLeft -= 10
    }
    this.scrollInterval = setInterval(scroll, 10)
  }

  stopScrolling() {
    this.setState({ isScrolling: false }, clearInterval(this.scrollInterval))
  }

  moveCard(lastX, lastY, nextX, nextY) {
    this.props.moveCard(lastX, lastY, nextX, nextY)
  }

  moveList(listId, nextX) {
    const { lastX } = this.findList(listId)
    this.props.moveList(lastX, nextX)
  }

  findList(id) {
    const { lists } = this.props.getLists
    const list = lists.filter(l => l.id === id)[0]

    return {
      list,
      lastX: lists.indexOf(list)
    }
  }

  render() {
    const { classes, boardId, getLists } = this.props

    console.log(`board from state: ${boardId}`)
    if (getLists.loading) {
      return (
        <div className='flex w-100 h-100 items-center justify-center pt7'>
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }

    return (
      <div style={{ height: '100%' }}>
        <h1>{getLists.title}</h1>
        <CustomDragLayer snapToGrid={false} />
        {getLists.lists && getLists.lists.map((item, i) =>
          <CardsContainer
            key={item.id}
            id={item.id}
            item={item}
            moveCard={this.moveCard}
            moveList={this.moveList}
            startScrolling={this.startScrolling}
            stopScrolling={this.stopScrolling}
            isScrolling={this.state.isScrolling}
            x={i}
          />
        )}
        <Button variant='fab' color='primary' aria-label='add' className={classes.button}>
          <AddIcon />
        </Button>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    boardId: ownProps.match.params.id,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ListsActions, dispatch)
}

const reduxWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)

const FEED_QUERY = gql`
  query getLists($id: ID, $orderBy: String){
    boardDetails(boardId: $id){
      title
      lists(orderBy: $orderBy) {
        id
        title
        cardPositionIndexes
        cards {
          title
          id
        }
      }
    }
}
`
const gqlWrapper = graphql(FEED_QUERY, {
  name: 'getLists', // name of the injected prop: this.props.getLists...
  options: (ownProps) => ({
    variables: {
      boardId: ownProps.boardId,
      orderBy: 'positionIndex_ASC'
    }
  }),
})

const ddContext = DragDropContext(HTML5Backend)

// `compose` makes wrapping component much easier and cleaner
export default compose(
  reduxWrapper,
  gqlWrapper,
  ddContext,
)(withStyles(styles)(Board))