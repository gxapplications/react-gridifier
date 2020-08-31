'use strict'

import '../helpers/dom-setup'

import React from 'react'
import { expect } from 'chai'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Gridifier from '../../lib/index'
import ExplicitSaving from '../../lib/order-handler/explicit-saving'

describe('[Gridifier] React component', () => {
  beforeEach(() => {
    Enzyme.configure({ adapter: new Adapter() })
  })

  it('can be mounted.', () => {
    const wrapper = mount(<Gridifier />)
    expect(wrapper.find('div').hasClass('rg-grid')).to.equal(true)
  })

  it('can be unmounted.', () => {
    const wrapper = mount(<Gridifier />)
    const instance = wrapper.instance()
    wrapper.unmount()
    expect(instance._grid).to.equal(undefined)
  })

  it('accepts and transfers CSS classes.', () => {
    const wrapper = mount(<Gridifier className='test-abc' />)
    expect(wrapper.find('div').hasClass('test-abc')).to.equal(true)
  })

  it('accepts JqGridifier settings as properties.', () => {
    const options = {
      class: 'test',
      grid: 'vertical',
      prepend: 'mirrored',
      append: 'default',
      intersections: true,
      align: 'top',
      sortDispersion: true,
      loadImages: true,
      toggleTime: 500,
      coordsChangeTime: 300,
      toggleTiming: 'ease',
      coordsChangeTiming: 'ease',
      rotatePerspective: '100px',
      rotateBackface: false,
      rotateAngles: [0, -180, 180, 0],
      gridResize: 'fit',
      gridResizeDelay: 100,
      dragifier: 'rg-drag-handler',
      dragifierMode: 'i',
      widthPxAs: 0,
      heightPxAs: 0,
      queueSize: 12,
      queueDelay: 25
    }
    const wrapper = mount(<Gridifier {...options} />)
    expect(wrapper.find('div').hasClass('rg-grid')).to.equal(true)
  })

  it('accepts structuring properties (editable, orderHandler, insertionMode, itemBackgrounds).', () => {
    const options = {
      editable: true,
      orderHandler: new ExplicitSaving(),
      insertionMode: 'prepend',
      itemBackgrounds: true
    }
    const wrapper = mount(<Gridifier {...options} />)
    expect(wrapper.find('div').hasClass('rg-grid')).to.equal(true)
  })
})
