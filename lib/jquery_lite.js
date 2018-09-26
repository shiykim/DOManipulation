/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection {\n\n  constructor(htmlArray){\n    this.htmlArray = htmlArray;\n  }\n\n  html(string){\n    if (string){\n      this.htmlArray.forEach( (el) => {\n        el.innerHTML = string;\n        return el;\n      });\n    } else {\n      return this.htmlArray[0].innerHTML;\n    }\n  }\n\n  empty(){\n    this.htmlArray.forEach( (el) => {\n      el.innerHTML = '';\n      return el;\n    });\n  }\n\n  append(arg){\n   const argOuterHTML = [];\n   arg.forEach ( (el) => {\n     argOuterHTML.push(el.outerHTML);\n     return el;\n   });\n   this.htmlArray.forEach( (el) => {\n     for (let i = 0; i < argOuterHTML.length; i++) {\n       el.innerHTML += argOuterHTML[i];\n     }\n   });\n }\n\n attr(string, val){\n    const attrs = this.htmlArray[0].attributes;\n    for (let i = 0; i < attrs.length; i++) {\n      if (attrs[i].name === string){\n        return attrs[i].value;\n      }\n    }\n    if (!val) {\n      return undefined;\n    } else {\n      let typ = document.createAttribute(string);\n      typ.value = val;\n      return attrs.setNamedItem(typ);\n    }\n  }\n\n  addClass(className){\n    this.htmlArray.forEach( (el) => {\n      el.classList.add(className);\n      return el;\n    });\n  }\n\n  removeClass(className){\n    this.htmlArray.forEach( (el) => {\n      el.classList.remove(className);\n      return el;\n    });\n  }\n\n  children(){\n    let children = [];\n    this.htmlArray.forEach( (el) => {\n      let child = el.children;\n      for (let i = 0; i < child.length; i++) {\n        children.push(child[i]);\n      }\n    });\n    return new DOMNodeCollection(children);\n  }\n\n  parent() {\n    let parents = [];\n    this.htmlArray.forEach( (el) => {\n     let parent = el.parentElement;\n     parents.push(parent);\n    });\n    return new DOMNodeCollection(parents);\n }\n\n find(selector) {\n    let found = [];\n    this.htmlArray.forEach((el) => {\n      const retrieved = el.querySelectorAll(selector);\n      found.push(retrieved);\n    });\n    return new DOMNodeCollection(found);\n  }\n\n  remove(){\n    this.htmlArray.forEach((el) => {\n     el.innerHTML = '';\n     el.outerHTML = '';\n    });\n    this.htmlArray = [];\n  }\n\n  on(type, listener){\n    this.callback = listener;\n    this.htmlArray.forEach((el) => {\n      el.addEventListener(type,this.callback);\n    });\n  }\n\n  off(type){\n    this.htmlArray.forEach((el) => {\n      el.removeEventListener(type,this.callback);\n    });\n  }\n\n}\n\nmodule.exports = DOMNodeCollection;\n\n\n//# sourceURL=webpack:///./lib/dom_node_collection.js?");

/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection */ \"./lib/dom_node_collection.js\");\n\nconst callbacks = [];\nlet documentReadyState = false;\n\nwindow.$l = (el) => {\n  switch (typeof el){\n    case \"function\":\n      if (!documentReadyState){\n        callbacks.push(el);\n      } else {\n        el();\n      }\n      break;\n    case \"string\":\n      const nodeList = document.querySelectorAll(el);\n      const nodeArray = Array.from(nodeList);\n      return nodeArray;\n    case \"object\":\n      if (el instanceof HTMLElement){\n        return new DOMNodeCollection([el]);\n      }\n  }\n};\n\n$l.extend = (base, ...args) => {\n  args.forEach((el) => {\n    for (const prop in el) {\n      base[prop] = el[prop];\n    }\n  });\n  return base;\n};\n\n$l.ajax = (arg) => {\n  let recommended = {\n    method: \"GET\",\n    url: '',\n    contentType:'application/x-www-form-urlencoded; charset=UTF-8',\n    dataType: 'json',\n    data: {},\n    success: () => {},\n    error: () => {},\n  };\n\n  const merged = $l.extend(recommended, arg);\n  return new Promise((resolve,reject) => {\n    const xhr = new XMLHttpRequest();\n    xhr.open(merged.method, merged.url, true);\n    xhr.onload = () => resolve(JSON.parse(xhr.response));\n    xhr.onError = () => reject(xhr.statusText);\n    xhr.send(JSON.stringify(merged.data));\n    console.log(xhr);\n  });\n};\n\n\nfunction jokes() {\n  let setup = $l('.setup')[0];\n  let punchline = $l('.punchline')[0];\n  $l.ajax({\n    url: 'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke'\n  }).then( (response) => {\n    setup.innerText = response.setup;\n    punchline.innerText = response.punchline;\n  });\n}\n\nfunction weather(){\n  let weatherStateName = $l('.weather_state_name')[0];\n  let temp = $l('.temp')[0];\n  let lowTemp = $l('.low-temp')[0];\n  let highTemp = $l('.high-temp')[0];\n  let humidity = $l('.humidity')[0];\n  $l.ajax({\n    url: 'https://www.metaweather.com/api/location/2459115/'\n  }).then( (response) => {\n    console.log(response.setup);\n    weatherStateName.innerText = response.consolidated_weather[0].weather_state_name;\n    temp.innerText = Math.floor(response.consolidated_weather[0].the_temp * 1.8 + 32);\n    highTemp.innerText = Math.floor(response.consolidated_weather[0].max_temp * 1.8 + 32);\n    lowTemp.innerText = Math.floor(response.consolidated_weather[0].min_temp * 1.8 + 32);\n    humidity.innerText = Math.floor(response.consolidated_weather[0].humidity);\n\n  });\n}\n\nfunction animals() {\n  let animal = $l('.animal-pic')[0];\n  $l.ajax({\n    url: 'http://shibe.online/api/shibes?count=1&httpsUrls=true'\n  }).then( (response) => {\n    console.log(response[0]);\n    animal.src = response;\n  });\n}\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  callbacks.forEach(func => func());\n  jokes();\n  weather();\n  animals();\n});\n\n\n//# sourceURL=webpack:///./lib/main.js?");

/***/ })

/******/ });