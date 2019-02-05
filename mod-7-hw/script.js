/*
  1. Модифицируйте готовую функцию createPostCard() из задания 
    номер 6 (https://codepen.io/goit-fe-adv/pen/MVPaeZ) так, 
    чтобы она принимала объект post с данными для заполнения полей 
    в карточке.
      
  2. Создайте функцию createCards(posts), которая принимает массив
    объектов-карточек, вызывает функцию createPostCard(post) столько
    раз, сколько объектов в массиве, сохраняя общий результат и возвращает 
    массив DOM-элементов всех постов.
    
  3. Повесьте все посты в какой-то уже существующий DOM-узел.
*/

const posts = [
    {
      img: "https://placeimg.com/400/150/arch",
      title: "Post title 1",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
      link: 'link-1.com'
    },
    {
      img: "https://placeimg.com/400/150/nature",
      title: "Post title 2",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
      link: 'link-2.com'
    },
    {
      img: "https://placeimg.com/400/150/arch",
      title: "Post title 3",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
      link: 'link-3.com'
    },
    {
      img: "https://placeimg.com/400/150/arch",
      title: "Post title 4",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
      link: 'link-3.com'
    }
  ];


const body = document.querySelector("body"); 
const movie = createNode("div", "movie","title","","");  // parent box
const movieBody = createNode("div", "movie__body", "title","","");  // second child
// call final function with argument
const createdMarkup = final(posts);
// insert in HTML. we use spread operator together with array
body.append(...createdMarkup)


// function which catch object as parameter
// we use cicle forEach for extract object data and create content
// this content will be stored in array
function final (arr){ 
  const rezult =[]; 
  arr.forEach(element => { 
    rezult.push(createMovieCard(element)); 
  }); 
  return rezult;
}

// function which catch destructuring object in parameters
// and build main markup
// after all its insered created markup into HTML
function createMovieCard({img, title,text}){   
    const image = createNode("img", "movie__image", "src", img);  
    const titlE = createNode("h2", "movie__title","title","Title", title); 
    const description = createNode("p", "xclass", "title", "description", text);  
    insertNode(movieBody, [image, titlE, description]);  
    insertNode(movie, [movieBody]);
    return movie;
}

// lets built construct function  
function createNode(_element, _class, _attr, _attrVal, _innerText){
  let createNode = document.createElement(_element);
      createNode.classList.add(_class);
      createNode.setAttribute(_attr, _attrVal);
      createNode.innerText = _innerText;
      return createNode;
}
// function which insered 
function insertNode(parent , nodes){
  parent.append(...nodes);
} 
 

//==============================================================

// Example video
// const body = document.querySelector('body');

// const noteList = [
//   {text: 'Content number ONE',date: '1/2/78'},
//   {text: 'Content number TWO',date: '9/2/36'},
//   {text: 'Content number THREE',date: '55/2/45'},
//   {text: 'Content number FOUR',date: '1/2/70'},
// ]

// // =-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-



// // поместим в переменную функцию F-CR-MARK+CONT
// const createdMarkup = createItem(noteList);

// // прикрепим нашу созданную разметку к body и распылим елементы массива, 
// //которые станут аргументами append
// body.append(...createdMarkup);  // распыляем массив и тем самым мы добавляем его в разметку

// // функция F-CR-MARK+CONT которая использует 
// // функцию F-CR-MARK конструктор разметки и создает разметку с контентом который приходит

// //Запись формата ES6
// function createItem (arr) { return elements = arr.reduce((acc, el) => acc.concat(createNote(el)), [])}; 

// //Запись старого формата
// function createItem (arr){ 
//   const elements =[]; // пустой массив, в который будем помещать разметку(созданные елементы)

//    arr.forEach(elem => { // переберем елементы массива, с елементами объектами
//    const notes = createNote(elem); // в переменную note помещаем функцию создания с аргументом
//    elements.push(notes); // пушим созданный функцией которую мы создали ниже елемент
//                           // , котрый будет елементом массива
//    })
//    return elements
// }

// // функция F-CR-MARK где мы создаем разметку и присоединем дочерние елемент к родительским
// function createNote({text,date}) {
// // parent
// const note = document.createElement('div');
// note.classList.add('note');

// // first block
// const noteContent = document.createElement('div');
// noteContent.classList.add('note__content');

//   const noteText = document.createElement('p');
//   noteText.classList.add('note__text');
//   noteText.textContent = text;

//   const noteDate = document.createElement('p');
//   noteDate.classList.add('note__date');
//   noteDate.textContent = ` Создано : ${date}`;

// noteContent.append(noteText, noteDate);
// // //-=---------------=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// // second block
// const noteActions = document.createElement('div');
// noteActions.classList.add('note__actions');

//   const editBtn = document.createElement('button');
//   editBtn.classList.add('button');
//   editBtn.textContent = 'Изменить';

//   const delBtn = document.createElement('button');
//   delBtn.classList.add('button');
//   delBtn.textContent = 'Удалить';

// noteActions.append(editBtn, delBtn);
// // =-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-
// note.append(noteContent, noteActions);

// return note;
// } 
