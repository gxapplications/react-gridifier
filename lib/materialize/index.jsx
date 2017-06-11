'use strict'

import classNames from 'classnames'
import React from 'react'

import { Gridifier }  from '../index'

import './styles.css'

class MaterializeGridifier extends Gridifier {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div ref='grid' className={classNames('row rg-grid', this.props.className)}>
        {this.props.children}
      </div>
    )
  }
}

export default MaterializeGridifier

export { MaterializeGridifier as Gridifier }
export { default as Item } from './item.jsx'
