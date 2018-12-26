import Vue from 'vue'
import Main from '@/view/main'
const isServer = Vue.prototype.$isServer
// 判断参数是否是其中之一
export function oneOf (value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}

export function camelcaseToHyphen (str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

// For Modal scrollBar hidden
let cached
export function getScrollBarSize (fresh) {
  if (isServer) return 0
  if (fresh || cached === undefined) {
    const inner = document.createElement('div')
    inner.style.width = '100%'
    inner.style.height = '200px'

    const outer = document.createElement('div')
    const outerStyle = outer.style

    outerStyle.position = 'absolute'
    outerStyle.top = 0
    outerStyle.left = 0
    outerStyle.pointerEvents = 'none'
    outerStyle.visibility = 'hidden'
    outerStyle.width = '200px'
    outerStyle.height = '150px'
    outerStyle.overflow = 'hidden'

    outer.appendChild(inner)

    document.body.appendChild(outer)

    const widthContained = inner.offsetWidth
    outer.style.overflow = 'scroll'
    let widthScroll = inner.offsetWidth

    if (widthContained === widthScroll) {
      widthScroll = outer.clientWidth
    }

    document.body.removeChild(outer)

    cached = widthContained - widthScroll
  }
  return cached
}

// watch DOM change
export const MutationObserver = isServer ? false : window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || false

const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g
const MOZ_HACK_REGEXP = /^moz([A-Z])/

function camelCase (name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter
  }).replace(MOZ_HACK_REGEXP, 'Moz$1')
}
// getStyle
export function getStyle (element, styleName) {
  if (!element || !styleName) return null
  styleName = camelCase(styleName)
  if (styleName === 'float') {
    styleName = 'cssFloat'
  }
  try {
    const computed = document.defaultView.getComputedStyle(element, '')
    return element.style[styleName] || computed ? computed[styleName] : null
  } catch (e) {
    return element.style[styleName]
  }
}

// firstUpperCase
function firstUpperCase (str) {
  return str.toString()[0].toUpperCase() + str.toString().slice(1)
}
export {firstUpperCase}

// Warn
export function warnProp (component, prop, correctType, wrongType) {
  correctType = firstUpperCase(correctType)
  wrongType = firstUpperCase(wrongType)
    console.error(`[iView warn]: Invalid prop: type check failed for prop ${prop}. Expected ${correctType}, got ${wrongType}. (found in component: ${component})`);    // eslint-disable-line
}

function typeOf (obj) {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  return map[toString.call(obj)]
}

// deepCopy
function deepCopy (data) {
  const t = typeOf(data)
  let o

  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]))
    }
  } else if (t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i])
    }
  }
  return o
}

export {deepCopy}

// scrollTop animation
export function scrollTop (el, from = 0, to, duration = 500) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
              return window.setTimeout(callback, 1000 / 60)
            }
    )
  }
  const difference = Math.abs(from - to)
  const step = Math.ceil(difference / duration * 50)

  function scroll (start, end, step) {
    if (start === end) return

    let d = (start + step > end) ? end : start + step
    if (start > end) {
      d = (start - step < end) ? end : start - step
    }

    if (el === window) {
      window.scrollTo(d, d)
    } else {
      el.scrollTop = d
    }
    window.requestAnimationFrame(() => scroll(d, end, step))
  }
  scroll(from, to, step)
}

// Find components upward
function findComponentUpward (context, componentName, componentNames) {
  if (typeof componentName === 'string') {
    componentNames = [componentName]
  } else {
    componentNames = componentName
  }

  let parent = context.$parent
  let name = parent.$options.name
  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.$parent
    if (parent) name = parent.$options.name
  }
  return parent
}
export {findComponentUpward}

// Find component downward
export function findComponentDownward (context, componentName) {
  const childrens = context.$children
  let children = null

  if (childrens.length) {
    for (const child of childrens) {
      const name = child.$options.name
      if (name === componentName) {
        children = child
        break
      } else {
        children = findComponentDownward(child, componentName)
        if (children) break
      }
    }
  }
  return children
}

// Find components downward
export function findComponentsDownward (context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child)
    const foundChilds = findComponentsDownward(child, componentName)
    return components.concat(foundChilds)
  }, [])
}

// Find components upward
export function findComponentsUpward (context, componentName) {
  let parents = []
  const parent = context.$parent
  if (parent) {
    if (parent.$options.name === componentName) parents.push(parent)
    return parents.concat(findComponentsUpward(parent, componentName))
  } else {
    return []
  }
}

// Find brothers components
export function findBrothersComponents (context, componentName, exceptMe = true) {
  let res = context.$parent.$children.filter(item => {
    return item.$options.name === componentName
  })
  let index = res.findIndex(item => item._uid === context._uid)
  if (exceptMe) res.splice(index, 1)
  return res
}

/* istanbul ignore next */
const trim = function (string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

/* istanbul ignore next */
export function hasClass (el, cls) {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.')
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
}

/* istanbul ignore next */
export function addClass (el, cls) {
  if (!el) return
  let curClass = el.className
  const classes = (cls || '').split(' ')

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.add(clsName)
    } else {
      if (!hasClass(el, clsName)) {
        curClass += ' ' + clsName
      }
    }
  }
  if (!el.classList) {
    el.className = curClass
  }
}

/* istanbul ignore next */
export function removeClass (el, cls) {
  if (!el || !cls) return
  const classes = cls.split(' ')
  let curClass = ' ' + el.className + ' '

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.remove(clsName)
    } else {
      if (hasClass(el, clsName)) {
        curClass = curClass.replace(' ' + clsName + ' ', ' ')
      }
    }
  }
  if (!el.classList) {
    el.className = trim(curClass)
  }
}

export const dimensionMap = {
  xs: '480px',
  sm: '768px',
  md: '992px',
  lg: '1200px',
  xl: '1600px'
}

export function setMatchMedia () {
  if (typeof window !== 'undefined') {
    const matchMediaPolyfill = mediaQuery => {
      return {
        media: mediaQuery,
        matches: false,
        on () {},
        off () {}
      }
    }
    window.matchMedia = window.matchMedia || matchMediaPolyfill
  }
}

// 比较对象是否相等（无嵌套的属性）
export function compareObject (x, y) {
// If both x and y are null or undefined and exactly the same
  if (x === y) {
    return true
  }

  // If they are not strictly equal, they both need to be Objects
  if (!(x instanceof Object) || !(y instanceof Object)) {
    return false
  }

  // They must have the exact same prototype chain,the closest we can do is
  // test the constructor.

  for (var p in x) {
    // Inherited properties were tested using x.constructor === y.constructor
    if (p === '$actionType' || p === '$rowKeyIndex') {
      continue
    }
    if (x.hasOwnProperty(p)) {
      // Allows comparing x[ p ] and y[ p ] when set to undefined
      if (!y.hasOwnProperty(p)) {
        return false
      }

      // If they have the same strict value or identity then they are equal
      if (x[ p ] === y[ p ]) {
        continue
      }

      // Numbers, Strings, Functions, Booleans must be strictly equal
      if (typeof (x[ p ]) !== 'object') {
        return false
      }
      if (Array.isArray(x[ p ])) {
        if (x[p] === y[p]) {
          continue
        } else if (x[p].length === y[p].length) {
          if (x[p].toString() === y[p].toString()) {
            continue
          } else {
            return false
          }
        } else {
          return false
        }
      }
      // Objects and Arrays must be tested recursively
      if (!Object.equals(x[ p ], y[ p ])) {
        return false
      }
    }
  }

  for (p in y) {
    // allows x[ p ] to be set to undefined
    if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
      return false
    }
  }
  return true
}

function checkIsEmptyObject (o, filterProperty) {
  let properties = Object.getOwnPropertyNames(o)
  if (properties.length === 0) {
    return true
  } else {
    let flag = true
    properties.forEach((pro) => {
      if (pro !== filterProperty && pro !== '$rowKeyIndex' && pro !== '__ob__' && pro !== 'state') {
        if (o[pro]) {
          flag = false
        }
      }
    })
    return flag
  }
}

export function compareArr (oldArr, newArr) {
  let changeItems = []
  if (oldArr.length === 0) {
    if (newArr.length > 0) {
      for (let j = 0; j < newArr.length; j++) {
        if ((!checkIsEmptyObject(newArr[j], '$actionType'))) {
          changeItems.push(deepCopy(newArr[j]))
        }
      }
    } else {
      return []
    }
  }
  newArr.forEach((item) => {
    if (item.$actionType === 'update') {
      for (let i = 0; i < oldArr.length; i++) {
        if (compareObject(item, oldArr[i])) {
          break
        }
        if (i === oldArr.length - 1) {
          changeItems.push(deepCopy(item))
        }
      }
    } else {
      if ((!checkIsEmptyObject(item, '$actionType'))) {
        changeItems.push(deepCopy(item))
      }
    }
  })
  return changeItems
}
// 根据对象删除数组中的数据的第一个值，返回新数组
export function delArrObject (arr, delObject) {
  let newArr = []
  let hasDelete = false
  let deepCopyObj = deepCopy(delObject)
  if (arr.length === 0) {
    return newArr
  } else {
    arr.forEach((item) => {
      if (!compareObject(item, deepCopyObj) || hasDelete) {
        newArr.push(item)
      } else {
        hasDelete = true
      }
    })
    return newArr
  }
}

// 进行router深复制
export function deepCopyRoutes (staticRoutes) {
  let copyRouter = []
  if (staticRoutes && staticRoutes.length > 0) {
    staticRoutes.forEach(routeItem => {
      let newRouteItem = {}
      for (let p in routeItem) {
        if (routeItem[p] === Main) {
          newRouteItem[p] = Main
        } else if (routeItem[p].constructor === String) {
          newRouteItem[p] = '' + routeItem[p]
        } else if (routeItem[p].constructor === Function) {
          newRouteItem[p] = routeItem[p]
        } else if (routeItem[p].constructor === Object) {
          newRouteItem[p] = JSON.parse(JSON.stringify(routeItem[p]))
        } else if (routeItem[p].constructor === Array) {
          let childrenArr = [].concat(routeItem[p])
          let copyChildArr = []
          childrenArr.forEach(childItem => {
            let copyChildItem = {}
            for (let cp in childItem) {
              if (childItem[cp].constructor === String) {
                copyChildItem[cp] = '' + childItem[cp]
              } else if (childItem[cp].constructor === Function) {
                copyChildItem[cp] = childItem[cp]
              } else if (childItem[cp].constructor === Object) {
                copyChildItem[cp] = JSON.parse(JSON.stringify(childItem[cp]))
              } else {
                copyChildItem[cp] = childItem[cp]
              }
            }
            copyChildArr.push(copyChildItem)
          })
          newRouteItem[p] = copyChildArr
        } else {
          newRouteItem[p] = routeItem[p]
        }
      }
      copyRouter.push(newRouteItem)
    })
  }
  return copyRouter
}
export const showTitle = (item, vm) => {
  return vm.$config.useI18n ? vm.$t(item.name) : ((item.meta && item.meta.title) || item.name)
}
