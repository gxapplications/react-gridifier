/* eslint-env mocha */
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

  it('will receive and persist changes automatically.')

  it('accepts a forced persist call.')

  it('can persist a node collection and restore a list.')
})

// TODO
