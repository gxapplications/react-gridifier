'use strict'

import classNames from 'classnames'
import React from 'react'

import { Gridifier } from '../index'

import './styles.css'

class MaterializeGridifier extends Gridifier {
  render () {
    const className = classNames(
      this.props.itemBackgrounds ? 'row rg-item-backgrounds rg-grid' : 'row rg-grid',
      this.props.className
    )
    return (
      <div ref='grid' className={className}>
        {this.props.children}
      </div>
    )
  }
}

export default MaterializeGridifier

export { MaterializeGridifier as Gridifier }
export { default as Item } from './item.jsx'
export { default as OrderHandler } from '../order-handler'
