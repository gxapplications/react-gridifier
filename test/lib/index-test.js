/* eslint-env mocha */
'use strict'

import '../helpers/dom-setup'

import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import Gridifier from '../../lib/index'

describe('[Gridifier] React component', () => {
  it('can be mounted.', () => {
    const wrapper = mount(<Gridifier />)
    expect(wrapper.hasClass('rg-grid')).to.equal(true)
  })

  it('can be unmounted.', () => {
    const wrapper = mount(<Gridifier />)
    const instance = wrapper.instance()
    wrapper.unmount()
    expect(instance._grid).to.equal(undefined)
  })

  it('accepts and transfers CSS classes.', () => {
    const wrapper = mount(<Gridifier className='test-abc' />)
    expect(wrapper.hasClass('test-abc')).to.equal(true)
  })

  it('accepts JqGridifier settings as properties.')

  it('accepts structuring properties (editable, orderHandler, insertionMode, itemBackgrounds).')
})
