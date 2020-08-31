'use strict'

import classNames from 'classnames'
import React from 'react'
import requiredIf from 'react-required-if'
import PropTypes from 'prop-types'

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

class GridifierItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = { id: this.props.id || uuidv4() }
  }

  getClassNames () {
    return classNames('rg-grid-item', this.props.className)
  }

  getWrapperClassNames () {
    return 'rg-item-wrapper'
  }

  getStyles () {
    return { visibility: 'hidden' }
  }

  getDimensions () {
    return 'N/A'
  }

  render () {
    return (
      <div
        className={this.getClassNames()} data-dimensions={this.getDimensions()}
        key={this.state.id} id={this.state.id} style={this.getStyles()}
      >
        <div className={this.getWrapperClassNames()}>
          {this.props.children}
        </div>
        {(this.props.draggable) ? this.getDragHandler() : null}
        {this.getMoreHandlers()}
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

  getMoreHandlers () {
    return null
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
