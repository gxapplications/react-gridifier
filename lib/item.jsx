'use strict'

import classNames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid'

class GridifierItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = { id: this.props.id || uuid.v4() }
  }

  render () {
    return (
      <div
        className={classNames('rg-grid-item', this.props.className)}
        key={this.state.id} id={this.state.id} style={{ visibility: 'hidden' }}
      >
        <div className="rg-item-wrapper">
          {this.props.children}
        </div>
        { (this.props.draggable) ? this.getDragHandler() : null }
      </div>
    )
  }

  getDragHandler () {
    return (
      <div className="rg-drag-handler" />
    )
  }
}

GridifierItem.propTypes = {
  draggable: PropTypes.bool.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

GridifierItem.defaultProps = {
  draggable: false,
  id: null
}

export default GridifierItem
