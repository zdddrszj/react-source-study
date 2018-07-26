let util = {}
let arr = ['String', 'Number', 'Array', 'Object', 'Function', 'Null']
arr.forEach(type => {
  util['is' + type] = isType(type)
})
function isType (type) {
  return function (content) {
    return Object.prototype.toString.call(content) === `[object ${type}]`
  }
}

export default util