import DOMNodeCollection from './dom_node_collection';

const callbacks = [];
let documentReadyState = false;

window.$l = (el) => {
  switch (typeof el){
    case "function":
      if (!documentReadyState){
        callbacks.push(el);
      } else {
        el();
      }
      break;
    case "string":
      const nodeList = document.querySelectorAll(el);
      const nodeArray = Array.from(nodeList);
      return new DOMNodeCollection(nodeArray);
    case "object":
      if (el instanceof HTMLElement){
        return new DOMNodeCollection([el]);
      }
  }
};

$l.extend = (base, ...args) => {
  args.forEach((el) => {
    for (const prop in el) {
      base[prop] = el[prop];
    }
  });
  return base;
};

$l.ajax = (arg) => {
  let recommended = {
    method: "GET",
    url: '',
    contentType:'application/x-www-form-urlencoded; charset=UTF-8',
    dataType: 'json',
    data: {},
    success: () => {},
    error: () => {},
  };

  const merged = $l.extend(recommended, arg);
  return new Promise((resolve,reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(merged.method, merged.url, true);
    xhr.onload = () => resolve(JSON.parse(xhr.response));
      xhr.send(JSON.stringify(merged.data));
  });
};


function base() {
  let base = $l('.base').htmlArray[0];
  $l.ajax({
    url: 'http://taco-randomizer.herokuapp.com/random/'
  }).then( (response) => {
    base.innerText = response.base_layer.recipe;
  });
  porkImage();
}

function condiment() {
  let condiment = $l('.condiment').htmlArray[0];
  $l.ajax({
    url: 'http://taco-randomizer.herokuapp.com/random/'
  }).then( (response) => {
    condiment.innerText = response.condiment.recipe;
  });
  beanImage();
  cheeseImage();
}

function seasoning() {
  let seasoning = $l('.seasoning').htmlArray[0] ;
  $l.ajax({
    url: 'http://taco-randomizer.herokuapp.com/random/'
  }).then( (response) => {
    seasoning.innerText = response.seasoning.recipe;
  });
  toppingImage();
}


function beanImage() {
  const BEANIMAGE = {
    0: 'assets/images/bean1.png',
    1: 'assets/images/bean2.png',
    2: 'assets/images/bean3.png',
    3: 'assets/images/bean4.png'
  };
  let bean = $l('.bean').htmlArray[0];
  let rand = Math.floor((Math.random() * 4));
  bean.src = BEANIMAGE[rand];
}

function cheeseImage() {
  const CHEESEIMAGE = {
    0: 'assets/images/cheese2.png',
    1: 'assets/images/cheese3.png',
    2: 'assets/images/cheese1.png'
  };
  let cheese = $l('.cheese').htmlArray[0];
  let rand = Math.floor((Math.random() * 3));
  cheese.src = CHEESEIMAGE[rand];
}


function porkImage() {
  const PORKIMAGES = {
    0: 'assets/images/pork1.png',
    1: 'assets/images/pork2.png',
    2: 'assets/images/pork3.png',
    3: 'assets/images/pork4.png',
  };
  let pork = $l('.pork').htmlArray[0];
  let rand = Math.floor((Math.random() * 4));
  pork.src = PORKIMAGES[rand];
}

function toppingImage() {
  const TOPPINGIMAGE = {
    0: 'assets/images/topping1.png',
    1: 'assets/images/topping2.png',
    2: 'assets/images/topping3.png',
    3: 'assets/images/topping4.png',
    4: 'assets/images/topping6.png',
    5: 'assets/images/topping7.png',
    6: 'assets/images/topping8.png',
    7: 'assets/images/topping9.png',
    8: 'assets/images/topping10.png'
  };
  let toppingOne = $l('.topping-one').htmlArray[0];
  let toppingTwo = $l('.topping-two').htmlArray[0];
  let randOne = Math.floor((Math.random() * 9));
  let randTwo = Math.floor((Math.random() * 9));
  toppingOne.src = TOPPINGIMAGE[randOne];
  toppingTwo.src = TOPPINGIMAGE[randTwo];
}

window.first = function(div){
  let current;
  const children = $l('.widgets').children().htmlArray;

  for (var i = 0; i < children.length; i++) {
    const classes = Array.from(children[i].classList);
    if (classes.includes('first')){
      if (classes[0] != div.split('.')[1]) {
        const current = children[i].classList[0];
        $l(`.${current}`).removeClass('first');
      }
    } else if (classes.includes(div.split('.')[1])){
      $l(`${div}`).addClass('first');
    }

  }
  switch (div) {
    case '.taco-base':
      porkImage();
      break;
    case '.taco-condiment':
      beanImage();
      cheeseImage();
      break;
    case '.taco-seasoning':
      toppingImage();
      break;
    default:
      beanImage();
      cheeseImage();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  callbacks.forEach(func => func());
    base();
    condiment();
    seasoning();
});
