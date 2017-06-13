'use strict'

import EventEmitter from 'events'

export default class OrderHandler extends EventEmitter {
  constructor () {
    super()
    this.persistedOrder = [] // TODO: replace attr by a localstorage persistance
  }

  onChange (order) {
    this.persistOrder(order)
  }

  persistOrder (order) {
    this.persistedOrder = order
  }

  restoreOrder () {
    this.emit('sort-order-list', this.persistedOrder)
  }
}
