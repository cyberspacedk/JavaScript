"use strict";

/*
  Написать приложение для работы с REST сервисом, 
  все функции делают запрос и возвращают Promise 
  с которым потом можно работать. 
  
  Реализовать следующий функционал:

  - X функция getAllUsers() - должна вернуть текущий список всех пользователей в БД.
  
  - X функция getUserById(id) - должна вернуть пользователя с переданным id.
  
  - X функция addUser(name, age) - должна записывать в БД юзера с полями name и age.
  
  - X функция removeUser(id) - должна удалять из БД юзера по указанному id.
  
  - функция updateUser(id, user) - должна обновлять данные пользователя по id. 
    user это объект с новыми полями name и age.


  Документацию по бэкенду и пример использования прочитайте 
  в документации https://github.com/trostinsky/users-api#users-api.
  Сделать минимальный графический интерфейс в виде панели с полями и кнопками. 
  А так же панелью для вывода результатов операций с бэкендом.

*/

// PARENTS
const allUsers = document.querySelector(".all-users");
const userById = document.querySelector(".user-by-id");
const newUser = document.querySelector(".new-user");
const removedUser = document.querySelector(".removed-user");
const updatedUser = document.querySelector(".updated-user");

//BUTTONS
const getAll = document.querySelector(".js-get-all");
const getById = document.querySelector(".js-user-by-id");
const postNewUser = document.querySelector(".js-new-user");
const deleteUser = document.querySelector(".js-delete-user");
const updateUserData = document.querySelector(".js-update");

// INPUTS
let inputUserId = document.querySelector(".js-user-id");
let inputNewUserName = document.querySelector(".js-new-name");
let inputNewUserAge = document.querySelector(".js-new-age");
let inputDeleteUser  = document.querySelector(".js-delete-id"); 
let inputUpdID  = document.querySelector(".js-upd-id");
let inputUpdName  = document.querySelector(".js-upd-name");
let inputUpdAge  = document.querySelector(".js-upd-age");

 

// -=-=-=-=-=-=-=-=-= GET ALL -=-=-=-=-=-=-=-=-=-=-

getAll.addEventListener("click", getAllUsers); 

function getAllUsers() { 
   
    return fetch("https://test-users-api.herokuapp.com/users/")
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Smth went WRONG");
      })
      .then(data => updateGetAllusers(data))
      .catch(err => console.log(err)); 
}


// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

// -=-=-=-=-=-=-=-=-=-= GET BY ID =-=-=-=-=-=-=-=-=
 
getById.addEventListener("click", e => {
 let inputId = inputUserId.value;
 if(inputId){
    getUserById(inputId);
 }else{
     alert('Input user ID');
 } 
  inputUserId.value = "";
}); 

function getUserById(id) {  
    return fetch(`https://test-users-api.herokuapp.com/users/${id}`)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Smth went WRONG");
      })
      .then(data => updateHTML(data, userById))
      .catch(err => console.log(err));
  } 
  
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

// -=-=-=-=-=-=-=-=-=-=-= NEW USER =-=-=-=-=-=-=-=-

postNewUser.addEventListener('click', (e)=>{
    let userName = inputNewUserName.value;
    let userAge = Number(inputNewUserAge.value); 
    if(userName && userAge ){
         addUser(userName, userAge);
    }else{  
        alert('Incorrect data !!!');
    } 
    inputNewUserName.value = "";
    inputNewUserAge.value = ""; 
})

function addUser(name, age){  
    return fetch('https://test-users-api.herokuapp.com/users', {
        method: 'POST',
        body: JSON.stringify({ name: name, age: age}),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Smth went WRONG");
      })
      .then(data => updateHTML(data, newUser))
      .catch(err => console.log(err));
  } 
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

// -=-=-=-=-=-=-=-=-=-= DELETE BY ID =-=-=-=-=-=-=-=-=
 
deleteUser.addEventListener("click", e => {
    let inputDelId = inputDeleteUser.value;
    if(inputDelId){
        removeUser(inputDelId);
    }else{
        alert('Input correct ID !!!')
    } 
    inputDeleteUser.value = "";
   }); 
   
   function removeUser(id) {  
    return fetch(`https://test-users-api.herokuapp.com/users/${id}`,{
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) return response.json();
        throw new Error("Smth went WRONG");
    })
    .then(data => updateHTML(data, removedUser))
    .catch(err => console.log(err));
     } 
     
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
   
// -=-=-=-=-=-=-=-=-=-= UPDATE =-=-=-=-=-=-=-=-=

updateUserData.addEventListener('click', (e)=>{
    let updId = inputUpdID.value;
    let updName = inputUpdName.value;
    let updAge = Number(inputUpdAge.value);
    const updUserData = {
        name: updName,
        age: updAge,
    }; 
    if(updId && updName && updAge){
        updateUser(updId, updUserData)
    }else{
        alert("Input nessesary data !!!");
    }
    inputUpdID.value = "";
    inputUpdName.value = "";
    inputUpdAge.value = "";
})
 

function updateUser(id, user){
return fetch("https://test-users-api.herokuapp.com/users/" + id,{
    method:'PUT',
    body: JSON.stringify(user),
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }})
    .then(response => {
        if(response.ok) return response.json();
        throw new Error("Smth went WRONG");
    })
    .then(data => {
        updateHTML(data, updatedUser)
    })
    .catch(err => console.error(err)); 
} 
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

 
// FUNCTIONS
  function updateHTML(data, parentNode) {
    let user = data["data"];
    const innerElem = document.createElement("div");
    innerElem.innerText = `UserId: ${user.id}
                             User-Name: ${user.name}
                             User-Age: ${user.age}`;
    parentNode.append(innerElem);
  }

  function updateGetAllusers(data) {
    const arr = Array.from(data["data"]);
    arr.forEach(elem => {
      const innerElem = document.createElement("div");
      innerElem.innerText = `UserId: ${elem.id}
                                User-Name: ${elem.name}
                                User-Age: ${elem.age}`;
      allUsers.append(innerElem);
    });
  }