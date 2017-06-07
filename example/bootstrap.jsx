'use strict'

import React from 'react'
import { render } from 'react-dom'

import { Gridifier, GridifierItem } from '../lib'

import './example.css'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: [
        <GridifierItem className="col s6 m2 red card" id="0" key="0" draggable={true}>1</GridifierItem>,
        <GridifierItem className="col s6 m2 red card" id="1" key="1" draggable={true}>2</GridifierItem>,
        <GridifierItem className="col s6 m2 red card" id="2" key="2" draggable={true}>3</GridifierItem>,
        <GridifierItem className="col s6 m2 red card" id="3" key="3">4</GridifierItem>,
        <GridifierItem className="col s6 m2 red card" id="4" key="4">5</GridifierItem>,
        <GridifierItem className="col s4 m2 blue card" id="5" key="5" draggable={true}>1</GridifierItem>,
        <GridifierItem className="col s4 m2 blue card" id="6" key="6" draggable={true}>2</GridifierItem>,
        <GridifierItem className="col s4 m2 blue card" id="7" key="7" draggable={true}>3</GridifierItem>,
        <GridifierItem className="col s4 m2 blue card" id="8" key="8">4</GridifierItem>,
        <GridifierItem className="col s4 m2 blue card" id="9" key="9">5</GridifierItem>,
        <GridifierItem className="col s4 m2 blue card" id="10" key="10">6</GridifierItem>
      ],
      draggable: false
    }
  }

  render () {
    return (
      <div>
        <h3>Example</h3>
        <button onClick={this.addItem.bind(this)}>Add DOM item</button>
        <button onClick={this.toggleDraggable.bind(this)}>toggle draggable</button>
        <hr />
        <Gridifier className="row" draggable={this.state.draggable}>
          {this.state.items}
        </Gridifier>
      </div>
    )
  }

  addItem () {
    const items = this.state.items
    items.push(
        <GridifierItem
            className="col s4 m2 green card"
            id={this.state.items.length}
            key={this.state.items.length}
            draggable={true}
        >
          +{this.state.items.length}+
        </GridifierItem>
    )
    this.setState({ ...this.state, items })
  }

  toggleDraggable () {
    this.setState({ ...this.state, draggable: !this.state.draggable })
  }
}

render(<App />, document.getElementById('app'))
