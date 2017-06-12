'use strict'

import classNames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'

import GridifierItem from '../item.jsx'

class MaterializeGridifierItem extends GridifierItem {
  getClassNames () {
    const w = this.props.width
    const h = this.props.height
    return classNames('rg-grid-item col', `s${w * 4} m${w * 3} l${w * 2}`, `h${h}`)
  }

  getStyles () {
    if (this.props.backgroundColor) {
      return {
        'visibility': 'hidden',
        'backgroundColor': this.props.backgroundColor,
        'boxShadow': `1px 1px 0 ${this.props.backgroundColor}`
      }
    }
    return { 'visibility': 'hidden' }
  }

  getWrapperClassNames () {
    const w = this.props.width
    const h = this.props.height
    return `rg-item-wrapper card w-fixer-${w} h-fixer-${h}`
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

MaterializeGridifierItem.propTypes = {
  width: PropTypes.oneOf([1, 2, 3]),
  height: PropTypes.oneOf([1, 2, 3]),
  backgroundColor: PropTypes.string
}

MaterializeGridifierItem.defaultProps = {
  width: 1,
  height: 1
}

export default MaterializeGridifierItem
