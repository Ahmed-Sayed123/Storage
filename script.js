let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let mood = "create";
let gloVar;
// get total
function getTotal() {
  if (price.value != "" && taxes.value != "" && ads.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#71e054";
  } else {
    total.innerHTML = "0";
  }
}

// create product

let dataPro;
if (localStorage.products != null) {
  dataPro = JSON.parse(localStorage.products);
} else {
  dataPro = [];
}

create.onclick = function () {
  if (
    title.value != "" &&
    price.value != "" &&
    ads.value != "" &&
    taxes.value != "" &&
    category.value != "" &&
    0 < +count.value &&
    +count.value < 100
  ) {
    let newPro = {
      title: title.value.toLowerCase(),
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: total.innerHTML,
      count: count.value,
      category: category.value.toLowerCase(),
    };
    //save local storage
    //count
    if (mood == "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[gloVar] = newPro;
    }
    localStorage.setItem("products", JSON.stringify(dataPro));
    clear();
    show();
  }
};
//clear inputs
function clear() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "0";
  count.value = "";
  category.value = "";
  count.style.display = "block";
  create.innerHTML = `create`;
  mood = `create`;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
//read local storage
let Tbody = document.getElementById("Tbody");
function show() {
  Tbody.innerHTML = "";
  let deleteAll = document.getElementById("deleteAll");
  for (let i = 0; i < dataPro.length; i++) {
    Tbody.innerHTML += `
   <tr>
    <td>${i + 1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button onclick = "update(${i})">update</button></td>
    <td><button onclick ="deleteData(${i})" class ="delete">delete</button></td>
    </tr>
  
  `;
    if (dataPro.length > 0) {
      deleteAll.innerHTML = `<button onclick = "deleteAllF()" class ="delete">Delete All</button>`;
    } else {
      deleteAll.innerHTML = "";
    }
  }
}

show();
//delete
function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.products = JSON.stringify(dataPro);
  show();
}
function deleteAllF() {
  localStorage.clear();
  dataPro.splice(0);
  show();
}
//update
function update(i) {
  mood = "update";
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  ads.value = dataPro[i].ads;
  taxes.value = dataPro[i].taxes;
  discount.value = dataPro[i].discount;
  category.value = dataPro[i].category;
  count.style.display = "none";
  create.innerHTML = "update";
  getTotal();
  gloVar = i;
}
//search
let search = document.getElementById("search");

function searchMood(id) {
  search.focus();
  Tbody.innerHTML = "";

  if (id == "titleSearch") {
    search.placeholder = "search by title";

    search.onblur = function () {
      for (let i = 0; i < dataPro.length; i++) {
        if (
          search.value != "" &&
          dataPro[i].title.toLowerCase().includes(search.value.toLowerCase())
        ) {
          Tbody.innerHTML += `
            <tr>
              <td>${i + 1}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
              <td><button onclick="update(${i})">update</button></td>
              <td><button onclick="deleteData(${i})" class="delete">delete</button></td>
            </tr>
          `;
        }
      }
    };
  } else {
    search.placeholder = "search by category";

    search.onblur = function () {
      for (let i = 0; i < dataPro.length; i++) {
        if (
          search.value != "" &&
          dataPro[i].category.toLowerCase().includes(search.value.toLowerCase())
        ) {
          Tbody.innerHTML += `
            <tr>
              <td>${i + 1}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
              <td><button onclick="update(${i})">update</button></td>
              <td><button onclick="deleteData(${i})" class="delete">delete</button></td>
            </tr>
          `;
        }
      }
    };
  }
}
