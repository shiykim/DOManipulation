class DOMNodeCollection {

  constructor(htmlArray){
    this.htmlArray = htmlArray;
  }

  html(string){
    if (string){
      this.htmlArray.forEach( (el) => {
        el.innerHTML = string;
        return el;
      });
    } else {
      return this.htmlArray[0].innerHTML;
    }
  }

  empty(){
    this.htmlArray.forEach( (el) => {
      el.innerHTML = '';
      return el;
    });
  }

  append(arg){
   const argOuterHTML = [];
   arg.forEach ( (el) => {
     argOuterHTML.push(el.outerHTML);
     return el;
   });
   this.htmlArray.forEach( (el) => {
     for (let i = 0; i < argOuterHTML.length; i++) {
       el.innerHTML += argOuterHTML[i];
     }
   });
 }

 attr(string, val){
    const attrs = this.htmlArray[0].attributes;
    for (let i = 0; i < attrs.length; i++) {
      if (attrs[i].name === string){
        return attrs[i].value;
      }
    }
    if (!val) {
      return undefined;
    } else {
      let typ = document.createAttribute(string);
      typ.value = val;
      return attrs.setNamedItem(typ);
    }
  }

  addClass(className){
    this.htmlArray.forEach( (el) => {
      el.classList.add(className);
      return el;
    });
  }

  removeClass(className){
    this.htmlArray.forEach( (el) => {
      el.classList.remove(className);
      return el;
    });
  }

  children(){
    let children = [];
    this.htmlArray.forEach( (el) => {
      let child = el.children;
      for (let i = 0; i < child.length; i++) {
        children.push(child[i]);
      }
    });
    return new DOMNodeCollection(children);
  }

  parent() {
    let parents = [];
    this.htmlArray.forEach( (el) => {
     let parent = el.parentElement;
     parents.push(parent);
    });
    return new DOMNodeCollection(parents);
 }

 find(selector) {
    let found = [];
    this.htmlArray.forEach((el) => {
      const retrieved = el.querySelectorAll(selector);
      found.push(retrieved);
    });
    return new DOMNodeCollection(found);
  }

  remove(){
    this.htmlArray.forEach((el) => {
     el.innerHTML = '';
     el.outerHTML = '';
    });
    this.htmlArray = [];
  }

  on(type, listener){
    this.callback = listener;
    this.htmlArray.forEach((el) => {
      el.addEventListener(type,this.callback);
    });
  }

  off(type){
    this.htmlArray.forEach((el) => {
      el.removeEventListener(type,this.callback);
    });
  }

}

module.exports = DOMNodeCollection;
