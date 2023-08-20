import Notiflix from 'notiflix';

import axios from "axios";

import { openPopupById } from '../js/custom-popup';
import { closeOllPopups } from '../js/custom-popup';
import { functions, lte } from 'lodash';



const recipeModalWindow = document.querySelector(".backend-info");
const popularRecipeList = document.querySelector('.popular-recipes-js');

const recipeList = document.querySelector('.recipe-list');

popularRecipeList.addEventListener('click', onPopularRecipe);
recipeList.addEventListener('click', onCatalogRecipe);



let recipeId = "";

function onCatalogRecipe(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== 'BUTTON') {
    return
  }
  recipeId = evt.target.dataset.id;

  document.addEventListener('keydown', onEscClose);
  
  openPopupById('recepie');
  fetchRecipes(recipeId);
  renderModalWindow(recipeId)

}

function onPopularRecipe(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== 'IMG') {
    return
  }
  recipeId = evt.target.dataset.id;

  document.addEventListener('keydown', onEscClose);
  
  openPopupById('recepie');
  fetchRecipes(recipeId);
  renderModalWindow(recipeId)

}

async function fetchRecipes(id) {
    const response = await fetch(
      `https://tasty-treats-backend.p.goit.global/api/recipes/${id}`
    );
  
    return response;
    
  }

  async function renderModalWindow(id) {
    try {
    const response = await fetchRecipes(recipeId);
    const recipes = await response.json();
    
    recipeModalWindow.innerHTML = modalWindowRecipesMarkUp(recipes);
}
catch(err) {Notiflix.Report.failure(err); console.log(err)}
  }

function modalWindowRecipesMarkUp(obj) {
const { title, instructions, youtube, ingredients, rating, tags, time, preview } = obj;
const addHtml = `<h2>${title.toUpperCase()}</h2>
      <div class="video-recipe">
      <video class="video-cont"
  src=${youtube}
  poster=${preview}
  
  controls
  autoplay
  loop
  preload="auto"
></video>
      </div>
      <div class="info-panel">
        <div class="tags">
          <ul class="tags-list">
          ${tags.map((tag) => `<li><span class="tag-item"><p>#${tag}</p></span></li>`).join("")}
          </ul>
        </div>
        
        <div class="rating">
        <div class="rating-value">${rating}</div>
        <div class="rating-body">
          <div class="rating-active" style="width:${(rating * 100) / 5}%">
            <div class="rating-items">
              <input type="radio" class="rating-item" value="1" name="rating" />
              <input type="radio" class="rating-item" value="2" name="rating" />
              <input type="radio" class="rating-item" value="3" name="rating" />
              <input type="radio" class="rating-item" value="4" name="rating" />
              <input type="radio" class="rating-item" value="5" name="rating" />
            </div>
          </div>
        </div>
        <p class="time">
  ${time} min
  </p>
      </div>
  
      </div>
      <div class="ingredients">
        <ul class="ingredients-list">
        ${ingredients.map(({name, measure} = ingredients) => `<li class="ingredients-item"><div><p>${name}</p></div><div><p>${measure}</p></div></li>`).join("")}
        </ul>
      </div>
      <div class="instructions-container">
      <p class="instructions-text">${instructions}</p></div>
      <button type="button" class="favorite-btn btn">Add to favorite</button>
      `
      
      return addHtml;
      
    
}

function onEscClose(evt) {
  if (evt.code === 'Escape') {
    closeOllPopups();
    document.removeEventListener('keydown', onEscClose);
    
  }
}





