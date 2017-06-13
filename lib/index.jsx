'use strict'

import classNames from 'classnames'
import JqGridifier from 'gridifier'
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

    this.updateOrderHandler(this.props.orderHandler, null)

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
    const className = classNames(
      this.props.itemBackgrounds ? 'rg-item-backgrounds rg-grid' : 'rg-grid',
      this.props.className
    )
    return (
      <div ref='grid' className={className}>
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
      sortDispersion: nextProps.sortDispersion,
      loadImages: nextProps.loadImages,
      toggleTime: nextProps.toggleTime || 500,
      coordsChangeTime: nextProps.coordsChangeTime || 300,
      toggleTiming: nextProps.toggleTiming,
      coordsChangeTiming: nextProps.coordsChangeTiming,
      rotatePerspective: nextProps.rotatePerspective,
      rotateBackface: nextProps.rotateBackface,
      rotateAngles: nextProps.rotateAngles,
      gridResize: nextProps.gridResize || 'fit',
      gridResizeDelay: nextProps.gridResizeDelay || 100,
      dragifier: 'rg-drag-handler',
      dragifierMode: nextProps.dragifierMode || 'i',
      widthPxAs: nextProps.itemBackgrounds ? 1 : 0,
      heightPxAs: nextProps.itemBackgrounds ? 1 : 0,
      vpResizeDelay: 10,
      queueSize: nextProps.queueSize || 12,
      queueDelay: nextProps.queueDelay || 25,

      // above does not belongs to gridifier, but used anyway by react component
      editable: nextProps.editable,
      orderHandler: nextProps.orderHandler
    }
    if (nextProps.align) settings.align = nextProps.align // null|undefined not working. Key must be omitted in the case
    return settings
  }

  updateGridSettings (nextGridSettings, nextState) {
    for (let k in nextGridSettings) {
      if (!nextGridSettings.hasOwnProperty(k)) {
        continue
      }
      const v = nextGridSettings[k]
      if (nextState.gridSettings && nextState.gridSettings[k] === v) {
        continue
      }

      switch (k) {
        case 'editable':
          v ? this._grid.dragifierOn() : this._grid.dragifierOff()
          break
        case 'orderHandler':
          this.updateOrderHandler(v, nextState.gridSettings[k])
          break
        default:
          this._grid.set(k, v).reposition()
      }
    }
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
    [].forEach.call(document.getElementsByClassName('rg-edition-tool'), (element) => {
      element.style.display = this.props.editable ? 'flex' : 'none'
    })
  }

  updateOrderHandler (addHandler, removeHandler) {
    if (removeHandler) {
      removeHandler.removeAllListeners('sort-order-list')
      // TODO: unplug handler listening on grid events
    }
    if (addHandler && addHandler.onChange) {
      this._grid.onDragEnd(addHandler.onChange.bind(addHandler))
      // TODO: other events to listen ?
      addHandler.on('sort-order-list', (list) => {
        // TODO: action to this._grid to force a sort with the given list
        console.log('I receive ', list)
      })

      addHandler.restoreOrder()   // init
    }
  }
}

Gridifier.propTypes = {
  editable: PropTypes.bool.isRequired,
  orderHandler: PropTypes.object,
  insertionMode: PropTypes.oneOf(['append', 'prepend']).isRequired,
  itemBackgrounds: PropTypes.bool.isRequired,

  grid: PropTypes.oneOf(['vertical', 'horizontal']),
  prepend: PropTypes.oneOf(['mirrored', 'default', 'reversed']),
  append: PropTypes.oneOf(['default', 'reversed']),
  intersections: PropTypes.bool.isRequired,
  align: PropTypes.oneOf(['top', 'center', 'bottom', 'left', 'right']),
  sortDispersion: PropTypes.bool.isRequired,
  loadImages: PropTypes.bool.isRequired,
  toggleTime: PropTypes.number,
  coordsChangeTime: PropTypes.number,
  toggleTiming: PropTypes.string,
  coordsChangeTiming: PropTypes.string,
  rotatePerspective: PropTypes.string,
  rotateBackface: PropTypes.bool.isRequired,
  rotateAngles: PropTypes.array,
  gridResize: PropTypes.oneOf(['fit', 'expand', 'disabled']),
  gridResizeDelay: PropTypes.number,
  dragifierMode: PropTypes.oneOf(['i', 'd']),
  queueSize: PropTypes.number,
  queueDelay: PropTypes.number
}

Gridifier.defaultProps = {
  editable: false,
  insertionMode: 'append',
  itemBackgrounds: false,
  intersections: true,
  sortDispersion: false,
  loadImages: false,
  toggleTiming: 'ease', // a css transition func is possible (eg. cubic-bezier(0.755, 0.050, 0.855, 0.060))
  coordsChangeTiming: 'ease',
  rotatePerspective: '200px',
  rotateBackface: true,
  rotateAngles: [0, -180, 180, 0]
}

export default Gridifier

export { Gridifier }
export { default as Item } from './item.jsx'
export { default as OrderHandler } from './order-handler.js'
