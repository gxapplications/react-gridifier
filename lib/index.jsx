'use strict'

import gridifier from 'gridifier'
import $ from 'jquery'
import _ from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import './common.css'

class Gridifier extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gridSettings: this.gridSettingsFromProps(this.props)
    }
    console.log('Component constructed')
  }

  componentDidMount () {
    this._gridDOMNode = ReactDOM.findDOMNode(this.refs.grid)
    this._grid = new gridifier(this._gridDOMNode, this.state.gridSettings)

    this.updateDragHandlerVisibility()

    this._grid.appendNew()
    console.log('Component did mount')
  }

  componentWillReceiveProps (nextProps) {
  }

  shouldComponentUpdate (nextProps) {
    return true // to rework for perfs?
  }

  componentWillUpdate(nextProps, nextState) {
    const nextGridSettings = this.gridSettingsFromProps(nextProps)
    this.updateGridSettings(nextGridSettings)
  }

  componentDidUpdate(nextProps, nextState) {
    this.updateDragHandlerVisibility()

    this._grid.appendNew()
  }

  componentWillUnmount () {
    this._grid.destroy()
  }

  render () {
    return (
      <div ref="grid" className={this.props.className}>
        {this.props.children}
      </div>
    )
  }

  gridSettingsFromProps (nextProps) {
    return {
      class: 'rg-grid-item',
      dragifier: 'rg-drag-handler',
      dragifierMode: 'i', // or 'd',

      // above does not belongs to gridifier, but used anyway by react component
      draggable: nextProps.draggable
    }
  }

  updateGridSettings (nextGridSettings) {
    const changes = _.omitBy(nextGridSettings, function(v, k) {
      return nextState.gridSettings[k] ? nextState.gridSettings[k] === v : false;
    })
    _.forOwn(changes, (v, k) => {
      switch (k) {
        case 'draggable':
          v ? this._grid.dragifierOn() : this._grid.dragifierOff()
          break
        default:
          this._grid.set(k, v)
      }
    })
  }

  updateDragHandlerVisibility() {
    if (this.props.draggable) {
      $('.rg-drag-handler', this._gridDOMNode).show()
    } else {
      $('.rg-drag-handler', this._gridDOMNode).hide()
    }
  }
}

Gridifier.propTypes = {
  draggable: PropTypes.bool.isRequired
}

Gridifier.defaultProps = {
  draggable: false
}

export default Gridifier

export { Gridifier }
export { default as GridifierItem } from './item.jsx'
