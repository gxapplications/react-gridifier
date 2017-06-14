'use strict'

import EventEmitter from 'events'

export default class OrderHandler extends EventEmitter {
  constructor () {
    super()
    this.persistedOrder = [] // TODO: replace attr by a localstorage persistance, or make several order handlers (manual, auto, ...)
  }

  parseGridChildren (gridNode) {
    const children = []
    for (const i of gridNode.children) {
      children.push(i)
    }
    return children
  }

  onChange (gridNode) {
    const order = this.parseGridChildren(gridNode)
    console.log(order)
    this.persistOrder(order)
  }

  persistOrder (order) {
    this.persistedOrder = order
  }

  restoreOrder () {
    this.emit('sort-order-list', this.persistedOrder)
  }
}
