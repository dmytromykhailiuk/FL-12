const todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [
  { text : "Buy milk" , done: false }, { text : "Play with dog" , done: true }
];

todos.forEach(el => {
  createElement(el.text, el.done);
});

$("#add-submit").click(function(event) {
  event.preventDefault();
  const textVal = $("#add-input").val();
  if (textVal !== "" && !todos.some(el => el.text.toLowerCase() === textVal.toLowerCase())) {
    createElement(textVal);
    addEventListners();
    todos.push({ text : textVal , done: false });
    $("#add-input").val("");
    saveData();
  }
})

$(".item-remove").click(removeItem);


$(".item-text").click(toggleDone);

saveData();

function toggleDone(event) {
  event.preventDefault();
  $(event.delegateTarget).toggleClass("done");
  todos.forEach( el => {
    if (el.text === $(event.delegateTarget).text()) {
      el.done = !el.done;
    }
  });
  saveData();
};

function removeItem(event) {
  $(event.delegateTarget).parent(".item").remove();
  todos.forEach( (el, i) => {
    if (el.text === $(event.delegateTarget).prev().text()) {
      todos.splice(i, 1);
    }
  });
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
  $(".list .item:last-child .item-remove").click(removeItem);
  $(".list .item:last-child .item-text").click(toggleDone);
}

function saveData() {
  localStorage.setItem('todos', JSON.stringify(todos));
}



