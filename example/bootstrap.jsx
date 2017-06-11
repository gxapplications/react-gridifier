'use strict'

import classNames from 'classnames'
import React from 'react'
import { render } from 'react-dom'
import uuid from 'uuid'

import { Gridifier, Item } from '../lib/materialize'

import './example.css'

const generateItem = (w = 1, h = 1, bgColor = '#600', removeHandler = undefined) => {
  const id = uuid.v4()
  return (
    <Item
      width={w}
      height={h}
      backgroundColor={bgColor}
      id={id}
      key={id}
      draggable
      removable={!!removeHandler}
      removeHandler={removeHandler}
    >
      {id}
    </Item>
  )
}

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: [
        generateItem(), generateItem(3, 1), generateItem(), generateItem(2, 2), generateItem(), generateItem(),
        generateItem(), generateItem(), generateItem(1, 3), generateItem(), generateItem(2, 1), generateItem(),
        generateItem(), generateItem(2, 2), generateItem(), generateItem(1, 2), generateItem(), generateItem()
      ],
      editable: false
    }
  }

  render () {
    return (
      <div>
        <h3>Example</h3>
        <button onClick={this.addItem.bind(this)}>Add DOM item</button>
        <button onClick={this.toggleEditionMode.bind(this)}>Toggle edition mode</button>
        <hr />
        <div style={{ border: '1px solid blue', width: '80%' }}>
          <Gridifier editable={this.state.editable} sortDispersion>
            {this.state.items}
          </Gridifier>
        </div>
      </div>
    )
  }

  addItem () {
    const items = this.state.items
    items.push(generateItem(1, 1, '#006', this.removeItem.bind(this)))
    this.setState({ ...this.state, items })
  }

  removeItem (itemToRemove) {
    const items = this.state.items.filter((item) => item.props.id !== itemToRemove.props.id)
    this.setState({ ...this.state, items })
  }

  toggleEditionMode () {
    this.setState({ ...this.state, editable: !this.state.editable })
  }
}

render(<App />, document.getElementById('app'))
