import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragLayer } from 'react-dnd'

import CardDragPreview from './CardDragPreview'
import snapToGrid from './snapToGrid'
import { compose } from 'react-apollo'


const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100000
}

function getItemStyles(props) {
  const { initialOffset, currentOffset } = props
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none'
    }
  }

  let { x, y } = currentOffset

  if (props.snapToGrid) {
    x -= initialOffset.x
    y -= initialOffset.y
    [x, y] = snapToGrid(x, y)
    x += initialOffset.x
    y += initialOffset.y
  }

  const transform = `translate(${x}px, ${y}px)`
  return {
    WebkitTransform: transform,
    transform
  }
}

class CustomDragLayer extends Component {
  static propTypes = {
    item: PropTypes.object,
    itemType: PropTypes.string,
    initialOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    currentOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    isDragging: PropTypes.bool.isRequired,
    snapToGrid: PropTypes.bool.isRequired
  }

  renderItem(type, item) {
    switch (type) {
      case 'card':
        return (
          <CardDragPreview card={item} />
        )
      default:
        return null
    }
  }

  render() {
    const { item, itemType, isDragging } = this.props

    if (!isDragging) {
      return null
    }


    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          {this.renderItem(itemType, item)}
        </div>
      </div>
    )
  }
}

const dragLayer = DragLayer((monitor) => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging()
}))

// `compose` makes wrapping component much easier and cleaner
export default compose(
  dragLayer
)(CustomDragLayer)
