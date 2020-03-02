const todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

showSeachingElements();

$("#search-input").change(showSeachingElements);

$("#add-submit").click(function(event) {
  event.preventDefault();
  const textVal = $("#add-input").val();
  if (textVal !== "" && !todos.some(el => el.text.toLowerCase() === textVal.toLowerCase())) {
    todos.push({ text : textVal , done: false });
    $("#add-input").val("");
    saveData();
    showSeachingElements();
  }
})

function toggleDone(event) {
  event.preventDefault();
  $(event.delegateTarget).toggleClass("done");
  todos.some(el => {
    if (el.text === $(event.delegateTarget).text()) {
      el.done = !el.done;
      return true;
    }
  });
  saveData();
};

function removeItem(event) {
  $(event.delegateTarget).parent(".item").remove();
  const i = todos.findIndex(el => el.text === $(event.delegateTarget).prev().text());
  todos.splice(i, 1);
  saveData();
};

function createElement(text, isDone = false) {
  $(".list").append(`
    <li class="item">
      <span class="item-text ${isDone ? 'done' : ''}">${text}</span>
      <button class="item-remove">Remove</button>
    </li>
  `);
};

function addEventListners() {
  $(".item-remove").click(removeItem);
  $(".item-text").click(toggleDone);
}

function saveData() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function showSeachingElements() {
  $(".list").empty();
  const serchVal = $("#search-input").val();
  todos.filter(el => {
    return el.text.toUpperCase().indexOf(serchVal.toUpperCase()) > -1;
  }).forEach(el => {
    createElement(el.text, el.done);
  });
  saveData();
  addEventListners();
}
