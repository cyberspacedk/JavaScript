"use strict";
// form
const form = document.querySelector(".add-form");
const input = document.querySelector(".add-input");
const add = document.querySelector(".add-button");
// list & item
const list = document.querySelector(".links-list");
const key = "5c62d56374b4a6a20d3287a3f85f87449b25aff272461";

// add item
form.addEventListener("submit", e => {
  e.preventDefault();
  if (input.value === "" || input.value === "http://")
    return alert("Input correct URL");
  let arrLinks = [];
  if(localStorage.getItem("links")) arrLinks = [...JSON.parse(localStorage.getItem("links"))];
  if (arrLinks.includes(input.value)) return alert("This links already exist");

  const URL = `https://api.linkpreview.net/?key=${key}&q=${input.value}`;
  fetch(URL)
    .then(resp => resp.json())
    .then(data => {
      if (data.error) return alert("Cant find such URL");
      arrLinks.unshift(data);
      localStorage.setItem("links", JSON.stringify(arrLinks));
      list.innerHTML += createLi({ ...data });
    })
    .catch(err => console.error(err));

  form.reset();
});

// delete item
list.addEventListener("click", e => {
  if (e.target.nodeName !== "SPAN") return;
  const arrLinks = [...JSON.parse(localStorage.getItem("links"))];
  arrLinks.splice(
    arrLinks.indexOf(
      e.target.closest("li").querySelector(".content").textContent
    ),
    1
  );
  e.target.closest("li").remove();
  localStorage.setItem("links", JSON.stringify(arrLinks));
});

// validation
form.addEventListener("input", e => {
  const reg = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

  if (reg.test(input.value)) {
    input.classList.add("valide");
    input.classList.remove("invalide");
    add.removeAttribute("disabled", false);
    add.style.backgroundColor = "#05af00";
  } else {
    input.classList.remove("valide");
    input.classList.add("invalide");
    add.setAttribute("disabled", true);
    add.style.backgroundColor = "red";
  }
});

// default show
window.addEventListener("DOMContentLoaded", () => {
  if(localStorage.getItem("links")) JSON.parse(localStorage.getItem("links")).map(elem => (list.innerHTML += createLi(elem)) );
});

// html element
const createLi = ({ url, description, image, title }) =>
  `<li class="links-list__item">
                                <img class="link-preview" src="${image}" alt="No content">
                                <div class="link-info">
                                  <a class="content" href="${url}">${title}</a>
                                  <p class="link-descr">${description}</p>
                                </div>
                                <span class="remove">+</span>  
                              </li>`;
