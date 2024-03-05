let times = document.querySelector(".crud .outputs span"); // not important
let outputs = document.querySelector(".crud .outputs"); // not important

let namee = document.querySelector(".crud .inputs #namee");
let category = document.querySelector(".crud .inputs #category");
let price = document.querySelector(".crud .inputs #price");
let description = document.querySelector(".crud .inputs #description");

let btno = document.querySelector(".btno");
let search = document.querySelector(".crud .outputs input");

let form = document.querySelector(".crud .inputs form");

let tmp;

//create
let dataPro;
if (localStorage.getItem("product") != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

btno.addEventListener("click", function () {
  let newPro = {
    namee: namee.value,
    category: category.value,
    price: price.value,
    description: description.value,
  };

  if (
    namee.value != "" &&
    category.value != "" &&
    price.value != "" &&
    description.value != ""
  ) {
    if (this.innerHTML == "add product") {
      dataPro.push(newPro);
    } else {
      //btno.innerHTML = "update"
      dataPro[tmp] = newPro;
    }
  }

  localStorage.setItem("product", JSON.stringify(dataPro));

  readData();
  search.value = "";
});

//read
function readData() {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
    <tr>
      <td>${i}</td>
      <td>${dataPro[i].namee}</td>
      <td>${dataPro[i].category}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].description}</td>
      <td><button onclick="deleteData(${i})" class="btn-delete">delete</button></td>
      <td><button onclick="updateData(${i})" class="btn-update">update</button></td>
    </tr>
    `;
  }

  document.querySelector("#tbody").innerHTML = table;
}
readData();

//update
function updateData(i) {
  namee.value = dataPro[i].namee;
  category.value = dataPro[i].category;
  price.value = dataPro[i].price;
  description.value = dataPro[i].description;
  btno.innerHTML = "update";
  tmp = i;
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
  search.value = "";
}

// delete
function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  readData(); //we use this function to reload page to remove any item you want
  search.value = "";
}

//search
function searchData(value) {
  console.log(value);
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    if (dataPro[i].namee.includes(value)) {
      table += `
          <tr>
            <td>${i}</td>
            <td>${dataPro[i].namee}</td>
            <td>${dataPro[i].category}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].description}</td>
            <td><button onclick="deleteData(${i})" class="btn-delete">delete</button></td>
            <td><button onclick="updateData(${i})" class="btn-update">update</button></td>
          </tr>
          `;
    }
  }
  document.querySelector("#tbody").innerHTML = table;
}

search.addEventListener("keyup", function () {
  if (search.value != "") {
    times.style.display = "block";
  } else {
    times.style.display = "none";
  }
});
times.addEventListener("click", function () {
  search.value = "";
  times.style.display = "none";
});
