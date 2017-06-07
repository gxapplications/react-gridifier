'use strict'

import $ from 'jquery'
import React from 'react'
import { render } from 'react-dom'
import uuid from 'uuid'

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
        <GridifierItem className="col s4 m2 blue card" id="10" key="10">6</GridifierItem>,
        <GridifierItem className="col s6 m2 red card" id="11" key="11" draggable={true}>2</GridifierItem>,
        <GridifierItem className="col s6 m2 red card" id="12" key="12" draggable={true}>3</GridifierItem>,
        <GridifierItem className="col s6 m2 red card" id="13" key="13">4</GridifierItem>,
        <GridifierItem className="col s6 m2 red card" id="14" key="14">5</GridifierItem>,
        <GridifierItem className="col s4 m2 blue card" id="15" key="15" draggable={true}>1</GridifierItem>,
        <GridifierItem className="col s4 m2 blue card" id="16" key="16" draggable={true}>2</GridifierItem>,
        <GridifierItem className="col s4 m2 blue card" id="17" key="17" draggable={true}>3</GridifierItem>,
        <GridifierItem className="col s4 m2 blue card" id="18" key="18">4</GridifierItem>,
        <GridifierItem className="col s4 m2 blue card" id="19" key="19">5</GridifierItem>,
        <GridifierItem className="col s4 m2 blue card" id="20" key="20">6</GridifierItem>
      ],
      draggable: false
    }
  }

  render () {
    return (
      <div>
        <h3>Example</h3>
        <button onClick={this.addItem.bind(this)}>Add DOM item</button>
        <button onClick={this.removeFirst.bind(this)}>Remove first item</button>
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
    const id = uuid.v4()
    items.push(
        <GridifierItem
            className="col s4 m2 green card"
            id={id}
            key={id}
            draggable={true}
        >
          +{this.state.items.length}+
        </GridifierItem>
    )
    this.setState({ ...this.state, items })
  }

  removeFirst () {
    const items = this.state.items
    items.shift()
    this.setState({ ...this.state, items })
    // FIXME: wrong solution. Call grid.disconnect(target) before to remove from dom.
  }

  toggleDraggable () {
    this.setState({ ...this.state, draggable: !this.state.draggable })
  }
}

render(<App />, document.getElementById('app'))
