"use strict"
/*
  Создайте компонент галлереи изображений следующего вида.
  
    <div class="image-gallery js-image-gallery">
      <div class="fullview">
        <!-- Если выбран первый элемент из preview -->
        <img src="img/fullview-1.jpeg" alt="alt text 1">
      </div>
      <!-- li будет столько, сколько объектов в массиве картинок. Эти 3 для примера -->
      <ul class="preview">
        <li><img src="img/preview-1.jpeg" data-fullview="img/fullview-1.jpeg" alt="alt text 1"></li>
        <li><img src="img/preview-2.jpeg" data-fullview="img/fullview-2.jpeg" alt="alt text 2"></li>
        <li><img src="img/preview-3.jpeg" data-fullview="img/fullview-3.jpeg" alt="alt text 3"></li>
      </ul>
    </div>   
    
    🔔 Превью компонента: https://monosnap.com/file/5rVeRM8RYD6Wq2Nangp7E4TkroXZx2
 */
/*
  Массив объектов с данными для создания компонента выглядит следующим образом.
  Замените пути на соотвествующие вашим, или назовите изображения аналогично.
*/

const galleryItems = [
    { preview: 'img/preview-1.jpeg', fullview: 'img/fullview-1.jpeg', alt: "alt text 1" },
    { preview: 'img/preview-2.jpeg', fullview: 'img/fullview-2.jpeg', alt: "alt text 2" },
    { preview: 'img/preview-3.jpeg', fullview: 'img/fullview-3.jpeg', alt: "alt text 3" },
    { preview: 'img/preview-4.jpeg', fullview: 'img/fullview-4.jpeg', alt: "alt text 4" },
    { preview: 'img/preview-5.jpeg', fullview: 'img/fullview-5.jpeg', alt: "alt text 5" },
    { preview: 'img/preview-6.jpeg', fullview: 'img/fullview-6.jpeg', alt: "alt text 6" },
  ];
  /*  
    Реализуйте функционал: 
      Х - image-gallery есть изначально в HTML-разметке как контейнер для компонента. 
      X - fullview содержит в себе увеличенную версию выбранного изображения из preview, и
        создается динамически при загрузке страницы. 
      X - preview это список маленьких изображений, обратите внимание на атрибут data-fullview,
        он содержит ссылку на большое изображение. preview и его элементы, также создаются 
        динамически, при загрузке страницы. 
      X - При клике в элемент preview, необходимо подменить src тега img внутри fullview
        на url из data-атрибута выбраного элемента. 
      X - По умолчанию, при загрузке страницы, активным должен быть первый элемент preview. 
      X - Изображений может быть произвольное количество. 
      X - Используйте делегирование для элементов preview. 
      X- При клике, выбраный элемент из preview должен получать произвольный эффект выделения. 
      X - CSS-оформление и имена классов на свой вкус. 
    🔔 Изображения маленькие и большие можно взять с сервиса https://www.pexels.com/, выбрав при скачивании
      размер. Пусть маленькие изображения для preview будут 320px по ширине, большие для fullview 1280px.
      Подберите изображения одинаковых пропорций.
*/

  
//-=-=-=-=-=-=-=-=-=-=-=-= HTML =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=  

// 1 елемент обертка, куда привязываем нарисованные блоки
const galleryWrapper = document.querySelector('.js-image-gallery'); 
// 2 создадим верхний блок с увеличенной картинкой
const fullViewParent = createNode('div', 'fullview');
// 3 картинка
const fullImage = document.createElement('img');
fullImage.setAttribute('src', "./img/fullview-1.jpeg");
fullImage.setAttribute('alt', "alt text 1");
// 4 добавим картинку в родителя
fullViewParent.append(fullImage);
// 5 добавим блок с картинкой HTML
galleryWrapper.append(fullViewParent);  
// 6 создадим список с превьюшками 
const previewList = createNode('ul', 'preview');
// 7 генерируем разметку, берем данные из массива  
generatePreview(galleryItems); 
// 8 добавим список превьюшек в разметку
galleryWrapper.append(previewList); 

//-=-=-=-=-=-=-=-=-=-=-=-= EVENT =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-  
previewList.addEventListener('click', (e)=> {
     if(e.target.nodeName !== 'IMG') return;
     fullImage.setAttribute('src', e.target.getAttribute('data-fullview'));
     const arrPreview = Array.from(document.querySelectorAll('.preview img'));
     arrPreview.map(elem => {elem.classList.remove('active-preview')});
     e.target.classList.add('active-preview'); 
});
 
//-=-=-=-=-=-=-=-=-=-=-=-= FUNCTION =-=-=-=-=-=-=-=-=-=-=-=-=-=  
// фенкция генерирования елементов превьюшки
function generatePreview(arr){ 
    for (let elem of arr){
        const listItem = document.createElement('li');
        const previewImage = document.createElement('img');
        previewImage.setAttribute('src', elem.preview);
        previewImage.setAttribute('data-fullview', elem.fullview);
        previewImage.setAttribute('alt', elem.alt);
        listItem.append(previewImage);
        previewList.append(listItem);
    } 
    previewList.querySelector('li:nth-child(1) img').classList.add('active-preview');  
return previewList;
}
// простенькая ф создания елемента
function createNode(node, cssClass){
     const newNode=document.createElement(node);
     newNode.classList.add(cssClass); 
     return newNode;
 }
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  
  /*
    ⚠️ ЗАДАНИЕ ПОВЫШЕННОЙ СЛОЖНОСТИ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ
    
    Создайте плагин галлереи используя ES6 класс. Добавьте поля и методы класса так, 
    чтобы можно было создать любое количество галлерей на странице. Функционал плагина 
    аналогичный заданию выше.
    
    При создании экземпляра конструктор получает:
      - items - список элементов для preview
      - parentNode - ссылку на DOM-узел в который будут помещены fullview и preview
      - defaultActiveItem - номер активного элемента preview по умолчанию
      
    Тогда создание экземпляра будет выглядеть следующим образом.
  */
  
//   new Gallery({
//     items: galleryItems,
//     parentNode: document.querySelector('.image-gallery'),
//     defaultActiveItem: 1
//   });