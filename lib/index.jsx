'use strict'

import JqGridifier from 'gridifier'
import $ from 'jquery'
import _ from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import './common.css'

class Gridifier extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      gridSettings: this.gridSettingsFromProps(this.props)
    }
    console.log('Component constructed')
  }

  componentDidMount () {
    this._gridDOMNode = ReactDOM.findDOMNode(this.refs.grid)
    this._grid = new JqGridifier(this._gridDOMNode, this.state.gridSettings)

    this.updateEditHandlersVisibility()
    this.connectAddedChildren()

    console.log('Component did mount')
  }

  componentWillReceiveProps (nextProps) {
  }

  shouldComponentUpdate (nextProps) {
    return true // to rework for perfs?
  }

  componentWillUpdate (nextProps, nextState) {
    this.disconnectRemovedChildren(nextProps.children)

    const nextGridSettings = this.gridSettingsFromProps(nextProps)
    this.updateGridSettings(nextGridSettings, nextState)
  }

  componentDidUpdate (nextProps, nextState) {
    this.updateEditHandlersVisibility()
    this.connectAddedChildren()
  }

  componentWillUnmount () {
    this._grid.destroy()
  }

  render () {
    return (
      <div ref='grid' className={this.props.className}>
        {this.props.children}
      </div>
    )
  }

  gridSettingsFromProps (nextProps) {
    const settings = {
      class: 'rg-grid-item',
      grid: nextProps.grid || 'vertical',
      prepend: nextProps.prepend || 'mirrored',
      append: nextProps.append || 'default',
      intersections: nextProps.intersections,

      dragifier: 'rg-drag-handler',
      dragifierMode: 'i', // or 'd',

      // above does not belongs to gridifier, but used anyway by react component
      editable: nextProps.editable
    }
    if (nextProps.align) settings.align = nextProps.align // null|undefined not working. Key must be omitted in the case
    return settings
  }

  updateGridSettings (nextGridSettings, nextState) {
    const changes = _.omitBy(nextGridSettings, function (v, k) {
      return nextState.gridSettings[k] ? nextState.gridSettings[k] === v : false
    })
    _.forOwn(changes, (v, k) => {
      switch (k) {
        case 'editable':
          v ? this._grid.dragifierOn() : this._grid.dragifierOff()
          break
        default:
          this._grid.set(k, v).reposition()
      }
    })
  }

  connectAddedChildren () {
    if (this.props.insertionMode === 'prepend') {
      this._grid.prependNew()
    } else {
      this._grid.appendNew()
    }
  }

  disconnectRemovedChildren (nextChildren) {
    const nextChildrenIds = nextChildren.map((child) => child.props.id)
    const children = this._grid.collectConnected()
    children.forEach((child) => {
      if (!nextChildrenIds.includes(child.id)) {
        console.log(`Disconnecting item #${child.id} ...`)
        this._grid.disconnect(child)
      }
    })
  }

  updateEditHandlersVisibility () {
    if (this.props.editable) {
      $('.rg-edition-tool', this._gridDOMNode).show()
    } else {
      $('.rg-edition-tool', this._gridDOMNode).hide()
    }
  }
}

Gridifier.propTypes = {
  editable: PropTypes.bool.isRequired,
  insertionMode: PropTypes.oneOf(['append', 'prepend']).isRequired,

  grid: PropTypes.oneOf(['vertical', 'horizontal']),
  prepend: PropTypes.oneOf(['mirrored', 'default', 'reversed']),
  append: PropTypes.oneOf(['default', 'reversed']),
  intersections: PropTypes.bool.isRequired,
  align: PropTypes.oneOf(['top', 'center', 'bottom', 'left', 'right'])
}

Gridifier.defaultProps = {
  editable: false,
  insertionMode: 'append',
  intersections: true
}

export default Gridifier

export { Gridifier }
export { default as GridifierItem } from './item.jsx'
