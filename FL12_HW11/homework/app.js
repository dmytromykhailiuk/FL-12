const structure = [
    {
      'folder': true,
      'title': 'Films',
      'children': [
        {
          'title': 'Iron Man.avi'
        },
        {
          'folder': true,
          'title': 'Fantasy',
          'children': [
            {
              'title': 'The Lord of the Rings.avi'
            },
            {
              'folder': true,
              'title': 'New folder 1',
              'children': false
            }
          ]
        }
      ]
    },
    {
      'folder': true,
      'title': 'Documents',
      'children': [
        {
          'folder': true,
          'title': 'EPAM Homework answers',
          'children': null
        }
      ]
    }
];

const rootNode = document.getElementById('root');

function createNewElement(parent, obj) {
  const element = document.createElement('li')
  const icon = document.createElement('i');
  const title = document.createElement('span');
  element.classList.add('element');
  icon.classList.add('material-icons');
  title.textContent = obj.title;
  if (obj.folder === true) {
    icon.textContent = 'folder';
    element.classList.add('folder');
  } else {
    icon.textContent = 'insert_drive_file';
  }
  element.append(icon, title);
  parent.append(element); 
}

function createFoldersListLevel (parent, struct) {
  const elem = document.createElement('ul');
  parent.append(elem);
  struct.forEach((el, i) => {
    createNewElement(elem, struct[i])
    if (struct[i]['folder'] === true) {
      if (struct[i]['children']) {
        createFoldersListLevel(elem, struct[i]['children']);
      } else {
        const emptyFolder = document.createElement('p');
        emptyFolder.textContent = 'Folder is empty';
        elem.append(emptyFolder);
      }
    }
  });
}

function toggleFolder(e) {
  const target = e.target.parentNode;
  const icon = target.firstChild;
  if (target.classList.contains('folder') === true) {
    target.classList.toggle('openedFolder');
    icon.textContent = icon.textContent === 'folder' ? 'folder_open' : 'folder';
  }
}

createFoldersListLevel(rootNode, structure);
rootNode.addEventListener('click', toggleFolder); 
