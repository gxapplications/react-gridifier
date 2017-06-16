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
      children.push({ id: i.id, guid: i.attributes['data-gridifier-guid'].value })
    }
    return children.sort((a, b) => {
      return a.guid - b.guid
    })
  }

  onChange (gridNode) {
    const order = this.parseGridChildren(gridNode)
    this.persistOrder(order)
  }

  persistOrder (order) {
    this.persistedOrder = order
    console.log('Persisting: ', order)
  }

  restoreOrder () {
    this.emit('sort-order-list', this.persistedOrder)
  }
}
