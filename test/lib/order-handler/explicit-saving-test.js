/* eslint-env mocha */
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
    // TODO
  })
})
