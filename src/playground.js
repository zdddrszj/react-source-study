// import React from './react';
// import ReactDOM from './react-dom'

import { createElement, Component } from './react'
import { render } from './react-dom'

const user = { name: 'test' }

let App = <div className="test">{user.name}</div>
render(App, window.root)
// let App = function MyComponent (props) {
//   // console.log(props)
//   return <h1>hello { props.value } {props.age}</h1>
// }

// class App extends Component {
//   constructor(props) {
//       super(props)
//       this.state = {
//         a: 1
//       }
//   }
//   componentWillMount () {
//     console.log('App: componentWillMount')
//   }
//   render () {
//     return <div>
//       <h1 onClick={this.onClick.bind(this)}>hello { this.props.value } {this.props.age}</h1>
//       <p>{this.state.a}</p>
//     </div>
//   }
//   onClick () {
//     this.setState({a: this.state.a + 1})
//   }
//   componentDidMount () {
//     console.log('App: componentDidMount')
//   }
// }

// render(<App value="1" age="2"></App>, window.root)

console.log(<App/>)