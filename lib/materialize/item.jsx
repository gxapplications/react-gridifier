'use strict'

import classNames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'

import GridifierItem from '../item'

class MaterializeGridifierItem extends GridifierItem {
  constructor (props) {
    super(props)
    this.state.removeConfirm = false
  }

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

  getDimensions () {
    return `${this.props.width}:${this.props.height}`
  }

  getWrapperClassNames () {
    const w = this.props.width
    const h = this.props.height
    return `rg-item-wrapper card w-fixer-${w} h-fixer-${h}`
  }

  getDragHandler () {
    return (
      <div className='rg-drag-handler rg-edition-tool'>
        <i className='material-icons'>drag_handle</i>
      </div>
    )
  }

  getRemoveHandler () {
    return (
      <div className='rg-remove-handler rg-edition-tool'>
        {
          (this.state.removeConfirm)
          ? <div ref='removeConfirm' onClick={() => this.props.removeHandler(this)}
            className='btn waves-effect waves-light red'>
            <i className='material-icons'>delete_forever</i>
          </div>
          : <div ref='remove' onClick={() => this.removeConfirmation()} className='btn waves-effect waves-light orange'>
            <i className='material-icons'>delete</i>
          </div>
        }
      </div>
    )
  }

  removeConfirmation () {
    this.setState({ removeConfirm: true })
    this._removeConfirmationCanceler = setTimeout(() => {
      this.setState({ removeConfirm: false })
    }, 3000)
  }

  componentWillUnmount () {
    if (this._removeConfirmationCanceler) {
      clearTimeout(this._removeConfirmationCanceler)
    }
  }

  getMoreHandlers () {
    const resize = this.props.resizeHandler ? (
      <div onClick={(event) => this.props.resizeHandler(this, event)} className='btn waves-effect waves-light'>
        <i className='material-icons'>photo_size_select_small</i>
      </div>
    ) : null
    const settings = this.props.settingsHandler ? (
      <div onClick={(event) => this.props.settingsHandler(this, event)} className='btn waves-effect waves-light'>
        <i className='material-icons'>settings</i>
      </div>
    ) : null
    return (settings || resize) ? (
      <div className='rg-settings-handler rg-edition-tool'>
        {resize} {settings}
      </div>
    ) : null
  }
}

MaterializeGridifierItem.propTypes = {
  width: PropTypes.oneOf([1, 2, 3]),
  height: PropTypes.oneOf([1, 2, 3, 4, 5]),
  backgroundColor: PropTypes.string,
  settingsHandler: PropTypes.func,
  resizeHandler: PropTypes.func
}

MaterializeGridifierItem.defaultProps = {
  width: 1,
  height: 1
}

export default MaterializeGridifierItem
