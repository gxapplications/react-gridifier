'use strict'

import classNames from 'classnames'
import React from 'react'
import requiredIf from 'react-required-if'
import PropTypes from 'prop-types'
import uuid from 'uuid'

class GridifierItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = { id: this.props.id || uuid.v4() }
  }

  render () {
    return (
      <div
        className={classNames('rg-grid-item', this.props.className)}
        key={this.state.id} id={this.state.id} style={{ visibility: 'hidden' }}
      >
        <div className='rg-item-wrapper'>
          {this.props.children}
        </div>
        {(this.props.draggable) ? this.getDragHandler() : null}
        {(this.props.removable) ? this.getRemoveHandler() : null}
      </div>
    )
  }

  getDragHandler () {
    return (
      <div className='rg-drag-handler rg-edition-tool' />
    )
  }

  getRemoveHandler () {
    return (
      <div className='rg-remove-handler rg-edition-tool' onClick={() => this.props.removeHandler(this)} />
    )
  }
}

GridifierItem.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  draggable: PropTypes.bool.isRequired,
  removable: PropTypes.bool.isRequired,
  removeHandler: requiredIf(PropTypes.func, (props) => props.removable)
}

GridifierItem.defaultProps = {
  id: null,
  draggable: false,
  removable: false
}

export default GridifierItem
