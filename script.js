let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let Tbody = document.getElementById("Tbody");
let search = document.getElementById("search");
let deleteAll = document.getElementById("deleteAll");

let mood = "create";
let gloVar;

// Get Total
function getTotal() {
  if (price.value !== "" && taxes.value !== "" && ads.value !== "") {
    let result =
      +price.value + +taxes.value + +ads.value - +discount.value;

    total.innerHTML = result;
    total.style.backgroundColor = "#71e054";
  } else {
    total.innerHTML = "0";
    total.style.backgroundColor = "";
  }
}

// Get Data From Local Storage
let dataPro;

if (localStorage.products != null) {
  dataPro = JSON.parse(localStorage.products);
} else {
  dataPro = [];
}

// Create / Update Product
create.onclick = function () {
  // If count is empty, make it 1 automatically
  if (count.value === "") {
    count.value = 1;
  }

  let validCount =
    mood === "update" ||
    (+count.value > 0 && +count.value < 100);

  if (
    title.value !== "" &&
    price.value !== "" &&
    ads.value !== "" &&
    taxes.value !== "" &&
    category.value !== "" &&
    validCount
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

    if (mood === "create") {
      if (+newPro.count > 1) {
        for (let i = 0; i < +newPro.count; i++) {
          dataPro.push({ ...newPro });
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

// Clear Inputs
function clear() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "0";
  total.style.backgroundColor = "";
  count.value = "";
  category.value = "";

  count.style.display = "block";
  create.innerHTML = "create";
  mood = "create";

  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Show Products
function show() {
  Tbody.innerHTML = "";

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
        <td>
          <button onclick="update(${i})">update</button>
        </td>
        <td>
          <button onclick="deleteData(${i})" class="delete">
            delete
          </button>
        </td>
      </tr>
    `;
  }

  if (dataPro.length > 0) {
    deleteAll.innerHTML = `
      <button onclick="deleteAllF()" class="delete">
        Delete All
      </button>
    `;
  } else {
    deleteAll.innerHTML = "";
  }
}

show();

// Delete Product
function deleteData(i) {
  dataPro.splice(i, 1);

  localStorage.setItem("products", JSON.stringify(dataPro));

  show();
}

// Delete All Products
function deleteAllF() {
  dataPro = [];

  localStorage.removeItem("products");

  show();
}

// Update Product
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

  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Search
function searchMood(id) {
  search.focus();

  if (id === "titleSearch") {
    search.placeholder = "search by title";
    search.dataset.searchType = "title";
  } else {
    search.placeholder = "search by category";
    search.dataset.searchType = "category";
  }

  search.value = "";
  Tbody.innerHTML = "";

  search.onkeyup = function () {
    Tbody.innerHTML = "";

    if (search.value === "") {
      show();
      return;
    }

    let searchType = search.dataset.searchType;

    for (let i = 0; i < dataPro.length; i++) {
      let value;

      if (searchType === "title") {
        value = dataPro[i].title;
      } else {
        value = dataPro[i].category;
      }

      if (value.toLowerCase().includes(search.value.toLowerCase())) {
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
            <td>
              <button onclick="update(${i})">update</button>
            </td>
            <td>
              <button onclick="deleteData(${i})" class="delete">
                delete
              </button>
            </td>
          </tr>
        `;
      }
    }
  };
}
