const app = document.getElementById('root');
const spinner = document.createElement('div');
const helpingSpinerEl = document.createElement('div');
spinner.append(helpingSpinerEl);
spinnerClassName = "loadingio-spinner-double-ring-mvsw15l0we";
helpingSpinerElClassName = "ldio-zl13b4r9e1e"
helpingSpinerEl.innerHTML = `
  <div></div>
  <div></div>
  <div>
    <div></div>
  </div>
  <div>
    <div></div>
  </div>
`;
let userName;

const showLoader = () => {
  spinner.classList.add(spinnerClassName);
  helpingSpinerEl.classList.add(helpingSpinerElClassName);
}

const hideLoader = () => {
  spinner.classList.remove(spinnerClassName);
  helpingSpinerEl.classList.remove(helpingSpinerElClassName);
}

const getData = async () => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const response = await fetch(url);
    const data = await response.json();
    await hideLoader();
    return data;
  } catch (e) {
    console.error(e);
  }
};

const getPosts = async userId => {
  try {
    const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

const getComments = async postId => {
  try {
    const url = `https://jsonplaceholder.typicode.com/comments?postId=${postId}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

const getUserImage = async () => {
  try {
    const url = 'https://api.thecatapi.com/v1/images/search?size=full';
    const response = await fetch(url);
    const data = await response.json();
    const rundomUrl = data[0].url;
    return rundomUrl;
  } catch (e) {
    console.error(e);
  }
};

const postPage = async () => {
  app.innerHTML = '';
  app.append(spinner);
  showLoader();
  let data = await getData();
  const userList = data.length > 0 && data.map(user => `
    <div class="users__item user col-12 col-md-6">
      <div id=${user.id} class="user__wrap d-flex">
        <div class="user__image"></div>
        <div class="user__info text-center flex-grow-1">
          <p class="user__name">${user.name}</p>
          <p>${user.company.name}</p>
          <p>${user.email}</p>
          <div class="user__btns">
            <button class="user__btn--modify">Modify</button>
            <button class="user__btn--remove">Delete</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
  return `
    <h1 class="text-center">User List</h1>
    <div class="users__list container-fluid">
      <div class="row">${userList}</div>
    </div>
  `;
};

const deleteData = async id => {
  try {
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    const response = await fetch(url, {
      method: 'DELETE'
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

const modifyData = async (id, data) => {
  try {
    const headers = { 'Content-Type': 'application/json;charset=utf-8' };
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({ data })
    });
    const newData = await response.json();
    return newData;
  } catch (e) {
    console.error(e);
  }
};

const openUserPosts = async userId => {
  app.innerHTML = '';
  app.append(spinner);
  showLoader();
  const userPosts = await getPosts(userId);
  const users = await getData().then(result => result[userId - 1]);
  const postIds = userPosts.map(item => item.id);
  const userPostComments = [];
  users && ({ name } = users);

  for (let id of postIds) {
    userPostComments.push(getComments(id));
  }

  const postComments = await Promise.all(userPostComments);

  const listItems = userPosts
    .map((item, i) => `
      <div class="user__post">
        <h5 class="posts__body">Post-${i + 1}: ${item.body}</h5>
        ${postComments[i].map(comment =>`
          <div class=posts__comment><p><span class="comment__name">${comment.name} </span>${comment.body}</p></div>
        `).join('')}
      </div>`
    ).join('');
  listItems && (await hideLoader());
  return `<h1 class="text-center">Posts of ${name}</h1><div>${listItems}</div>`;
};

const routes = {
  '/': postPage(),
  '/users/:id': openUserPosts()
};

const router = async () => {
  let route = window.location.hash
    .slice(1)
    .split('/')
    .filter(Boolean);

  let url;

  if (route[0] === 'users') {
    url = '/users/:id';
  } else {
    url = route ? '/' + route : '/';
  }

  app.innerHTML = await routes[url];

  let list = document.querySelector('.users__list')
  let image = document.querySelectorAll('.user__image');
  const btnSave = document.querySelectorAll('.user__btn--save')[0];

  const href = [];
  for (let i = 1; i <= image.length; i++) {
    href.push(getUserImage());
  }

  const hrefImage = await Promise.all(href);

  for (let i = 0; i < image.length; i++) {
    let img = new Image();
    img.src = hrefImage[i];
    image[i].appendChild(img);
  }

  const handlerChangeLocationClick = (e) => {
    if (e.target.className === 'user__name') {
      const node = e.target.parentElement.parentElement;
      const userId = node.getAttribute('id');
      window.location.href = `#/users/${userId}`;
      routes['/users/:id'] = openUserPosts(userId);
    }
  }

  const handlerbtnSave = () => {
    routes['/'] = PostPage();
    window.location.href = '#/';
  }

  const handlerbtnDelete = async e => {
    if (e.target.className === 'user__btn--remove') {
      const node = e.target.parentElement.parentElement.parentElement;
      const btnId = node.getAttribute('id');
      node.parentElement.remove();
      await deleteData(btnId);
    }
  };

  const modify = e => {
    if (e.target.className === 'user__btn--modify') {
      const node = e.target.parentElement.parentElement.parentElement;
      const btns = e.target.parentElement;
      btns.innerHTML = `
        <button class="user__btn--save">Save</button>
        <button class="user__btn--cancel">Cancle</button>
      `;
      const description = node.querySelector('.user__name');
      userName = description.textContent;
      description.innerHTML = `
        <input class="input" type=text value='${description.textContent}'/>
      `;
      description.classList.remove('user__name');
    }
  };

  const save = async e => {
    if (e.target.className === 'user__btn--save') {
      const node = e.target.parentElement.parentElement.parentElement;
      const userId = node.getAttribute('id');
      const userNameElem = node.querySelector('input').parentElement;
      const val = node.querySelector('input').value;
      userNameElem.innerHTML = val;
      userNameElem.classList.add('user__name');
      const btns = e.target.parentElement;
      btns.innerHTML = `
        <button class="user__btn--modify">Modify</button>
        <button class="user__btn--remove">Delete</button>
      `;
      if (val !== userName) {
        await modifyData(userId, `name:${val}`);
      }
    }
  };

  const cancel = async e => {
    if (e.target.className === 'user__btn--cancel') {
      const node = e.target.parentElement.parentElement;
      const description = node.firstElementChild;
      const btn = e.target;
      const prevBtn = btn.previousElementSibling;
      description.innerHTML = userName;
      description.classList.add('user__name');
      prevBtn.innerText = 'Modify';
      prevBtn.classList.add('user__btn--modify');
      prevBtn.classList.remove('user__btn--save');
      btn.innerText = 'Delete';
      btn.classList.add('user__btn--remove');
      btn.classList.remove('user__btn--cancel');
    }
  };

  list && list.addEventListener('click', handlerChangeLocationClick);
  list && list.addEventListener('click', handlerbtnDelete);
  list && list.addEventListener('click', modify);
  list && list.addEventListener('click', save);
  list && list.addEventListener('click', cancel);
  btnSave && btnSave.addEventListener('click', handlerbtnSave);
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);

