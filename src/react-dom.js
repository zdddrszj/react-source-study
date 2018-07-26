
import { setAttributes } from './dom'
import util from './util'

/**
 * 将真实dom渲染到页面
 * @param {*虚拟dom} vnode 
 * @param {*页面容器} container 
 * @param {*渲染后的回调} callback 
 */
function render (vnode, container, callback) {
  container.appendChild(_render(vnode))
  callback && callback()
}

/**
 * 将虚拟dom转成真实节点
 * @param {*虚拟dom} vnode 
 */
function _render (vnode) {
  // 如果是普通字符
  if (util.isString(vnode) || util.isNumber(vnode)) {
    return document.createTextNode(vnode)
  }
  let { type, props } = vnode
  let { children, ...attrs } = props

  // 如果是函数，说明是组件（包括函数组件和类组件）
  if (util.isFunction(type)) {
    // 创建组件
    let comp = createComponent(type, props)
    comp.props = props
    // 渲染组件
    let dom = renderComponent(comp)
    comp.dom = dom
    // 设置属性
    setAttributes(attrs, dom)
    return dom
  }

  // 如果是标签元素，如 div span
  let dom = document.createElement(type)
  if (children) {
    if (util.isArray(children)) {
      children.forEach(child => {
        render(child, dom)
      })
    } else {
      dom.appendChild(document.createTextNode(children))
    }
  }
  // 设置属性
  setAttributes(attrs, dom)
  return dom
}

// 创建组件
function createComponent (comp, props) {
  // 如果是类组件，需要new一个实例，可以调用render方法
  if (comp.prototype.render) {
    comp = new comp(props)
  } else {
    comp.render = function () {
      return comp(props)
    }
  }
  return comp
}

// 渲染组件：执行组件的render方法，然后通过_render将虚拟dom转成真实dom，最后返回真实节点
function renderComponent (comp) {
  let dom
  // 如果未渲染过组件
  if (!comp.dom) {
    if (comp.componentWillMount) {
      comp.componentWillMount()
    }
  }
  dom = _render(comp.render())
  if (comp.componentDidMount) {
    comp.componentDidMount()
  }
  return dom
}

export {
  render,
  renderComponent
}