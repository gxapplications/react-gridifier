'use strict'

import React from 'react'
import { render } from 'react-dom'

import { Gridifier, Item } from '../lib/materialize'
import { ExplicitSaving as OrderHandler } from '../lib/order-handler'

import './example.css'
import '../lib/materialize/styles.css'

let lastId = 123000
const generateItem = (w = 1, h = 1, removeHandler = undefined) => {
  const id = `ID-${lastId++}`
  return (
    <Item
      width={w}
      height={h}
      id={id}
      key={id}
      draggable
      removable={!!removeHandler}
      removeHandler={removeHandler}
      settingsHandler={(item, event) => null}
      resizeHandler={(item, event) => null}
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

    // Example of orderHandler that save order into localstorage engine at each move.
    // Can be extended to modify order persistence behavior or to make a manual persistence trigger.
    this.orderHandler = new OrderHandler(window.localStorage, 'rg-example')
  }

  render () {
    return (
      <div>
        <h3>Example</h3>
        <button onClick={this.addItem.bind(this)}>Add DOM item</button>
        <button onClick={this.toggleEditionMode.bind(this)}>Toggle edition mode</button>

        <button onClick={this.orderHandler.persistOrder.bind(this.orderHandler)}>Persist order</button>
        <button onClick={this.orderHandler.restoreOrder.bind(this.orderHandler)}>Restore last saved order</button>
        <hr />
        <Gridifier editable={this.state.editable} sortDispersion orderHandler={this.orderHandler}>
          {this.state.items}
        </Gridifier>
      </div>
    )
  }

  addItem () {
    const items = this.state.items
    items.push(generateItem(1, 1, this.removeItem.bind(this)))
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
