import { renderComponent } from './react-dom'

/**
 * Create and return a new ReactElement of the given type.
 */
function createElement (type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.length <= 1 ? children[0] : children
    }
  }
}

/**
 * Create React.Component class
 */
class Component {
  constructor (props) {
    this.props = props
    this.state = {}
  }
  componentWillMount () {
    console.log('Component: componentWillMount')
  }
  componentDidMount () {
    console.log('Component: componentDidMount')
  }
  setState (newState) {
    console.log('Component: setState')
    Object.assign(this.state, newState)
    let old = this.dom
    // renderComponent：整体重新渲染，然后返回真实节点
    let newDom = renderComponent(this)
    old.parentNode.replaceChild(newDom, old)
    this.dom = newDom
  }
}

let React = {
  createElement,
  Component
}

export {
  createElement,
  Component
}