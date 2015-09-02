var items = [];
var deletedItem;

//Android callbacks
function initItems(itemsJson) {
  items = JSON.parse(itemsJson);
  renderItems();
}


function deleteItem(item) {
  deletedItem = item;
  Android.requestDelete('Are you sure?', 'Yes', 'No')
}

function addPhoto(base64, timestamp) {
  items.push({
    id: guid(),
    base64: base64,
    timestamp: timestamp
  });
  renderItems();
}

//called from android when user say Yes/No
function confirmDelete(result) {
  switch (result) {
    case 1:
      var index = items.indexOf(deletedItem);
      if (index > -1) {
        items.splice(index, 1);
        deletedItem = undefined;
        renderItems();
      }
      break;
  }
}

//Helpers
function findItemById(id) {
  var i;
  for (i = 0; i < items.length; i++) {
    if(items[i].id.toString() == id.toString()){
      return items[i];
    }
  }
}

function save(){
  Android.saveItems(JSON.stringify(items));
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function setEventListners() {
  var addButton = document.getElementById('add-button');
  addButton.addEventListener('click', function () {
    Android.requestPhoto();
  });

  var removeButtons = document.getElementsByClassName('remove');

  var i;
  for (i = 0; i < removeButtons.length; i++) {
    var button = removeButtons[i];
    button.addEventListener('click', function () {
      var itemId = button.getAttribute('id');
      deleteItem(findItemById(itemId));
    });
  }
}

function renderItems() {
  var itemsList = '';
  var i;
  for (i = 0; i < items.length; i++) {
    var item = items[i];
    itemsList += ('<li class="item-wrapper"> ' +
    '<span class="image-wrapper">' +
      '<span class="image" style="background-image: url(data:image/jpeg;base64,' +item.base64 + ')"></span>' +
    '</span>' +
    '<span class="timestamp">' + item.timestamp + '</span>' +
    '<span class="remove" id="' + item.id + '">X</span>' +
    '</li>')
  }
  document.getElementById('items').innerHTML = '<ul class="list-item">' + itemsList + '</ul>';
  setEventListners();
}

document.addEventListener("DOMContentLoaded", function (event) {
  Android.onReady();
  //initItems('[{ "base64": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAACAAIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDxLxl8Pvh/L4y8XSy+BvCEkkniXXXkkk8M6I7u76tqLO7u1iWZ3b5mZiWZiSSTliUUV559Af/Z", "id": 0, "timestamp": "01.09.2015" }, { "base64": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAACAAIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDxLxl8Pvh/L4y8XSy+BvCEkkniXXXkkk8M6I7u76tqLO7u1iWZ3b5mZiWZiSSTliUUV559Af/Z", "id": 1, "timestamp": "01.09.2015" }]')
});

