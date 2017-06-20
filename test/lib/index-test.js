/* eslint-env mocha */
'use strict'

import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import Gridifier from '../../lib/index'

describe('[Gridifier] React component', () => {
  it('can be mounted.', () => {
    const wrapper = shallow(<Gridifier />)
    expect(wrapper.hasClass('rg-grid')).to.equal(true)
  })

  it('can be unmounted?') // TODO

  it('accepts and transfers CSS classes.', () => {
    const wrapper = shallow(<Gridifier className='test-abc' />)
    expect(wrapper.hasClass('test-abc')).to.equal(true)
  })
})
