'use strict'

import { expect } from 'chai'

import mockedStorage from '../../helpers/storage'
import AutoStorage from '../../../lib/order-handler/auto-storage'

describe('[OrderHandlers] AutoStorage implementation', () => {
  it('takes a Storage engine and uses specified key.', () => {
    const storage = mockedStorage()
    const orderHandler = new AutoStorage(storage, 'storage-key')
    const order = [{ id: 1 }, { id: 3 }, { id: 2 }]

    orderHandler.persistOrder(order)
    expect(JSON.parse(storage.getItem('storage-key'))).to.deep.equal(order)
  })

  it('will receive, sort, and persist changes automatically.', () => {
    const storage = mockedStorage()
    const orderHandler = new AutoStorage(storage, 'storage-key')
    const gridNode = { children: [
      { id: 1, attributes: { 'data-gridifier-guid': { value: 10001 } } },
      { id: 3, attributes: { 'data-gridifier-guid': { value: 10003 } } },
      { id: 2, attributes: { 'data-gridifier-guid': { value: 10002 } } }
    ] }
    const order = [{ id: 1, guid: 10001 }, { id: 2, guid: 10002 }, { id: 3, guid: 10003 }]

    orderHandler.onChange(gridNode)
    expect(JSON.parse(storage.getItem('storage-key'))).to.deep.equal(order)
  })

  it('accepts a forced persist call.', () => {
    const storage = mockedStorage()
    const orderHandler = new AutoStorage(storage, 'storage-key')
    const gridNode = { children: [
      { id: 1, attributes: { 'data-gridifier-guid': { value: 10001 } } },
      { id: 3, attributes: { 'data-gridifier-guid': { value: 10003 } } },
      { id: 2, attributes: { 'data-gridifier-guid': { value: 10002 } } }
    ] }
    const order = [{ id: 1, guid: 10001 }, { id: 2, guid: 10002 }, { id: 3, guid: 10003 }]

    orderHandler.onChange(gridNode)
    expect(JSON.parse(storage.getItem('storage-key'))).to.deep.equal(order)
    orderHandler.persistOrder(order)
    expect(JSON.parse(storage.getItem('storage-key'))).to.deep.equal(order)
  })
})
