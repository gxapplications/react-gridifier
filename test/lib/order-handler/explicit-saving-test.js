'use strict'

import { expect } from 'chai'

import ExplicitSaving from '../../../lib/order-handler/explicit-saving'

describe('[OrderHandlers] ExplicitSaving implementation', () => {
  it('will receive and sort changes but will not persist them automatically.', () => {
    const orderHandler = new ExplicitSaving()
    const gridNode = { children: [
      { id: 1, attributes: { 'data-gridifier-guid': { value: 10001 } } },
      { id: 3, attributes: { 'data-gridifier-guid': { value: 10003 } } },
      { id: 2, attributes: { 'data-gridifier-guid': { value: 10002 } } }
    ] }
    const order = [{ id: 1, guid: 10001 }, { id: 2, guid: 10002 }, { id: 3, guid: 10003 }]

    orderHandler.onChange(gridNode)
    expect(orderHandler.currentOrder).to.deep.equal(order)
    expect(orderHandler.persistedOrder).to.deep.equal([])
  })

  it('persists last changes.', () => {
    const orderHandler = new ExplicitSaving()
    const gridNode = { children: [
      { id: 1, attributes: { 'data-gridifier-guid': { value: 10001 } } },
      { id: 3, attributes: { 'data-gridifier-guid': { value: 10003 } } },
      { id: 2, attributes: { 'data-gridifier-guid': { value: 10002 } } }
    ] }
    const order = [{ id: 1, guid: 10001 }, { id: 2, guid: 10002 }, { id: 3, guid: 10003 }]

    orderHandler.onChange(gridNode)
    orderHandler.persistOrder()
    expect(orderHandler.currentOrder).to.deep.equal(order)
    expect(orderHandler.persistedOrder).to.deep.equal(order)
  })

  it('restores persisted list even if changes occurred after last persist call.', () => {
    const orderHandler = new ExplicitSaving()
    const gridNode = { children: [
      { id: 1, attributes: { 'data-gridifier-guid': { value: 10001 } } },
      { id: 3, attributes: { 'data-gridifier-guid': { value: 10003 } } },
      { id: 2, attributes: { 'data-gridifier-guid': { value: 10002 } } }
    ] }
    const order = [{ id: 1, guid: 10001 }, { id: 2, guid: 10002 }, { id: 3, guid: 10003 }]

    orderHandler.onChange(gridNode)
    orderHandler.persistOrder()
    expect(orderHandler.currentOrder).to.deep.equal(orderHandler.persistedOrder)

    const gridNode2 = { children: [
      { id: 4, attributes: { 'data-gridifier-guid': { value: 10004 } } },
      { id: 5, attributes: { 'data-gridifier-guid': { value: 10005 } } },
      { id: 6, attributes: { 'data-gridifier-guid': { value: 10006 } } }
    ] }
    const order2 = [{ id: 4, guid: 10004 }, { id: 5, guid: 10005 }, { id: 6, guid: 10006 }]
    orderHandler.onChange(gridNode2)
    expect(orderHandler.currentOrder).to.deep.equal(order2)
    expect(orderHandler.persistedOrder).to.deep.equal(order)

    let restoredOrder = null
    orderHandler.on('sort-order-list', (o) => { restoredOrder = o })
    orderHandler.restoreOrder()
    expect(restoredOrder).to.deep.equal(order)
  })
})
