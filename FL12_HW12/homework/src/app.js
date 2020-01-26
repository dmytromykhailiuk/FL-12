function checkLocation() {
  if (window.location.hash === '#/add') {
    openAnotherPage(addBlock, changeItemBlock, mainBlock);  
  } else if (window.location.hash.startsWith('#/modify/:item_id-')) {
    openAnotherPage(changeItemBlock, mainBlock, addBlock);
  } else if (window.location.hash === '#/' || window.location.hash === '') {
    openAnotherPage(mainBlock, addBlock, changeItemBlock);
  }
}

function openAnotherPage(show, hide1, hide2) {
  if (show.classList.contains('hide')) {
    show.classList.remove('hide');
  }
  if (!hide1.classList.contains('hide')) {
    hide1.classList.add('hide');
  }
  if (!hide2.classList.contains('hide')) {
    hide2.classList.add('hide');
  }
}

function createNewSet(term, def) {
  list.insertAdjacentHTML('afterbegin', `
    <li>
      <input type="checkbox" class="checkbox">
      <div class="li-text">
        <p class="change-set">${term}</p>
        <p class="change-set">${def}</p>
      </div>
      <button class="delate-set">remove</button>
    </li>
  `); 
}

function saveExistingItem() {
  if (inputChangingTerm.value !== '' && inputChangingDef.value !== '' && 
  (inputChangingTerm.value !== currentTerm || inputChangingDef.value !== currentDef)) {
    namesOfSets.delete(changingTerm.textContent);
    if (!namesOfSets.has(inputChangingTerm.value)) {
      changingTerm.textContent = inputChangingTerm.value;
      changingDef.textContent = inputChangingDef.value;
      namesOfSets.add(inputChangingTerm.value);
      inputChangingTerm.value = inputChangingDef.value = '';
      window.location.hash = '#/';
    } else {
      namesOfSets.add(changingTerm.textContent);
    }
  }
}

function saveNewItem() {
  if (!namesOfSets.has(inputNewTerm.value) && inputNewTerm.value !== '' && inputNewDefinition.value !== '') {
    createNewSet(inputNewTerm.value, inputNewDefinition.value);
    namesOfSets.add(inputNewTerm.value)
    inputNewTerm.value = inputNewDefinition.value = '';
    window.location.hash = '#/';
  }
}

const setsList = localStorage.getItem('sets') ? localStorage.getItem('sets') : '';
const namesOfSets = localStorage.getItem('namesOfSets') ? 
new Set(JSON.parse(localStorage.getItem('namesOfSets'))) : new Set();
const root = document.getElementById('root');
root.innerHTML = `
  <div id="main-block" class="hide"></div>
  <div id="add-block" class="hide"></div>
  <div id="change-item-block" class="hide"></div>
`;

const mainBlock = document.getElementById('main-block');
mainBlock.innerHTML = `
  <h2>Main page</h2>
  <button class="new-set">Add new set</button>
  <ul id="list">${setsList}</ul>
  <p class="empty ${setsList ? 'hide' : ''}">List is empty</p>
`;
const list = document.getElementById('list');
const showEmpty = document.querySelector('.empty');
const addBlock = document.getElementById('add-block');
addBlock.innerHTML = `
  <h2>Add new set</h2>
  <div class="input-block">
    <input type="text" id="newTerm" placeholder="Enter term">
    <input type="text" id="newDefinition" placeholder="Enter definition">
  </div>
  <div class="button-block">
    <button class="cancel">Cancel</button>
    <button class="save">Create</button>
  </div>
`;
const inputNewTerm = document.getElementById('newTerm');
const inputNewDefinition = document.getElementById('newDefinition');
const changeItemBlock = document.getElementById('change-item-block');
changeItemBlock.innerHTML = `
  <h2>Modify set</h2>
  <div class="input-block">
    <input type="text" id="changeTerm" placeholder="Enter term">
    <input type="text" id="changeDefinition" placeholder="Enter definition">
  </div>
  <div class="button-block">
    <button class="cancel">Cancel</button>
    <button class="save-changes">Save changes</button>
  </div>
`;
const inputChangingTerm = document.getElementById('changeTerm');
const inputChangingDef = document.getElementById('changeDefinition');
let changingItem, changingTerm, changingDef, currentTerm, currentDef, index;
const zeroNumb = 0;

checkLocation();
root.addEventListener('click', e => {
  if (e.target.classList.contains('cancel')) {
    window.location.hash = '#/';
    inputNewTerm.value = inputNewDefinition.value = '';
    inputChangingTerm.value = inputChangingDef.value = '';
  }
  if (e.target.classList.contains('new-set')) {
    window.location.hash = '#/add';
  }
  if (e.target.classList.contains('delate-set')) {
    namesOfSets.delete(e.target.previousElementSibling.firstElementChild.textContent);
    e.target.parentNode.remove();
  }
  if (e.target.classList.contains('change-set')) {
    changingTerm = e.target.parentElement.firstElementChild;
    changingDef = e.target.parentElement.firstElementChild.nextElementSibling;
    currentTerm = e.target.parentElement.firstElementChild.textContent;
    currentDef = e.target.parentElement.firstElementChild.nextElementSibling.textContent;
    document.getElementById('changeTerm').value = changingTerm.textContent;
    document.getElementById('changeDefinition').value = changingDef.textContent;
    window.location.hash = `#/modify/:item_id-${currentTerm}`;
  }
  if (e.target.classList.contains('checkbox')) {
    e.target.hasAttribute('checked') ? e.target.removeAttribute('checked') : 
    e.target.setAttribute('checked', 'checked');
    e.target.parentElement.classList.toggle('completed');
  }
  if (e.target.classList.contains('save')) {
    saveNewItem();
  }
  if (e.target.classList.contains('save-changes')) {
    saveExistingItem();
  }
  if ([...namesOfSets].length === zeroNumb && showEmpty.classList.contains('hide')) {
    showEmpty.classList.remove('hide');
  } else if ([...namesOfSets].length > zeroNumb && !showEmpty.classList.contains('hide')) {
    showEmpty.classList.add('hide');
  }
  localStorage.setItem('namesOfSets', JSON.stringify([...namesOfSets]));
  localStorage.setItem('sets', list.innerHTML);
});

const enterKeyNumber = 13;
const inputs = document.querySelectorAll('input[type="text"]');
for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('keydown', (e) => {
    if (e.keyCode === enterKeyNumber) {
      saveNewItem();
      saveExistingItem();
      if ([...namesOfSets].length === zeroNumb && showEmpty.classList.contains('hide')) {
        showEmpty.classList.remove('hide');
      } else if ([...namesOfSets].length > zeroNumb && !showEmpty.classList.contains('hide')) {
        showEmpty.classList.add('hide');
      }
      localStorage.setItem('namesOfSets', JSON.stringify([...namesOfSets]));
      localStorage.setItem('sets', list.innerHTML);
    }
  });
}

window.addEventListener('hashchange', function () {
  checkLocation();
});


