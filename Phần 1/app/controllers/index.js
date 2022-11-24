var productService = new ProductService();

function domId(id) {
  return document.getElementById(id);
}

var productsList = [];

function getProductList() {
  productService.getList().then(function (response) {
    for (var i = 0; i < response.data.length; i++) {
      productsList.push(response.data[i]);
    }
    renderProductList(response.data);
    renderTypeMobile(response.data);
  });
}

function renderProductList(data) {
  // console.log(data);
  var content = "";
  for (var i = 0; i < data.length; i++) {
    content += `
        <div class="product-item">
            <div class="product-tumb">
                <img src="${data[i].img}">
            </div>
            <div class="product-details">
                <div class="product-info">
                    <span class="product-catagory">${data[i].type}</span>
                    <h4>${data[i].name}</h4>
                    <p>${data[i].desc}</p>
                    <p>${data[i].screen}</p>
                    <p>${data[i].backCamera}</p>
                    <p>${data[i].frontCamera}</p>
                </div>
                <div class="product-bottom-details">
                    <div class="product-price">${data[i].price}</div>
                    <button type="button" class="btn btn-primary" onclick="createCartItem('${data[i].id}')">Thêm</button>
                </div>
            </div>
        </div>
        `;
  }
  document.querySelector(".productsList").innerHTML = content;
}
var typeMobile = {};

function renderTypeMobile(data) {
  var content = "<option value='all'>Tất cả</option>";
  for (var i = 0; i < data.length; i++) {
    if (!typeMobile[data[i].type]) {
      typeMobile[data[i].type] = [];
      content += `<option value='${data[i].type}'>${data[i].type}</option>`;
    }
    typeMobile[data[i].type].push(data[i]);
  }
  // console.log(typeMobile);

  domId("productInput").innerHTML = content;
  // console.log(data);
}

domId("productInput").onchange = function (event) {
  var type = event.target.value;
  // console.log(type);

  if (type === "samsung") {
    var showType = typeMobile.samsung;
  }

  if (type === "iphone") {
    var showType = typeMobile.iphone;
  }

  if (type === "all") {
    var showType = [...typeMobile.samsung, ...typeMobile.iphone];
  }

  renderProductList(showType);
  // console.log(showType);
};

window.onload = function () {
  getProductList();
  getCart();
};

// Phần Giỏ hàng chưa hoàn thành dòng 91 - 136

var cartItemList = [];

function cleanProduct() {
  cartItemList = [];
  renderCart();
}

function createCartItem(id) {
  for (var i = 0; i < productsList.length; i++) {
    if (productsList[i].id === id) {
      var quantity = 1;
      if (cartItemList) {
        for (var j = 0; j < cartItemList.length; j++) {
          if (cartItemList[j].id === id) {
            cartItemList[j].quantity += 1;
            renderCart();
            saveCart();
            return;
          }
        }
      }
      var cartItemId = productsList[i].id;
      var cartItemName = productsList[i].name;
      var cartItemImgURL = productsList[i].img;
      var cartItemPrice = productsList[i].price;
    }
  }

  var cartItem = new CartItem(
    cartItemId,
    cartItemName,
    cartItemImgURL,
    cartItemPrice,
    quantity
  );
  cartItemList.push(cartItem);
  renderCart();
  saveCart();
}

function renderCart() {
  var content = "";
  if (!cartItemList) {
    domId("tableCartProduct").innerHTML = content;
    return;
  }
  if (cartItemList) {
    for (var i = 0; i < cartItemList.length; i++) {
      content += `
    <tr>
    <td>
      <img src="${cartItemList[i].imgURL}" alt="">
    </td>
    <td>${cartItemList[i].name}</td>
    <td>
      <input style="width: 50px" type="number" 
      id="${cartItemList[i].id}"
      onchange="setQuantity(${cartItemList[i].id})"
      value="${cartItemList[i].quantity}"
      min="0" data-dashlane-rid="fff27122747b9aab" data-form-type="other">
    </td>
    <td class="totalPrice">${cartItemList[i].totalPrice()}</td>
    <td>
    <button onclick="deleteCartItem(${
      cartItemList[i].id
    })" class="btn btn-primary">Xóa</button>
    </td>   
    </tr>
    `;
    }
  }

  domId("tableCartProduct").innerHTML = content;

  renderPay();
}

function setQuantity(id) {
  var quantityValue = +domId(id).value;
  id = id.toString();
  if (quantityValue <= 0) {
    deleteCartItem(id);
  }
  for (var i = 0; i < cartItemList.length; i++) {
    if (cartItemList[i].id === id) {
      cartItemList[i].quantity = quantityValue;
      // console.log(cartItemList[i].quantity);
    }
  }
  renderCart();

  saveCart();
}

function deleteCartItem(id) {
  id = id.toString();

  for (var i = 0; i < cartItemList.length; i++) {
    if (cartItemList[i].id === id) {
      var index = i;
      cartItemList.splice(index, 1);
      console.log(cartItemList);
    }
  }
  renderCart();

  saveCart();
}

function renderPay() {
  var totalPrice = 0;
  for (var i = 0; i < cartItemList.length; i++) {
    totalPrice += cartItemList[i].totalPrice();
  }
  domId("totalPay").innerHTML = totalPrice;
}

//Phần save cart vao localStorage 202 - 203

function saveCart() {
  var cartItemListJSON = JSON.stringify(cartItemList);
  localStorage.setItem("CartLocal", cartItemListJSON);
}

function getCart() {
  var cartItemListJSON = localStorage.getItem("CartLocal");
  if (!cartItemListJSON) return;
  var cartItemListLocal = JSON.parse(cartItemListJSON);

  cartItemList = mapCartLocal(cartItemListLocal);

  renderCart();
}

function mapCartLocal(data) {
  var result = [];

  for (var i = 0; i < data.length; i++) {
    var oldCartItem = data[i];
    var newCartItem = new CartItem(
      oldCartItem.id,
      oldCartItem.name,
      oldCartItem.imgURL,
      oldCartItem.price,
      oldCartItem.quantity
    );
    result.push(newCartItem);
  }

  return result;
}

// Icon giỏ hàng
document.querySelector(".cart-icon").onclick = function () {
  document.querySelector(".cart").style.right = "0";
};

document.querySelector(".fa-xmark").onclick = function () {
  document.querySelector(".cart").style.right = "-100%";
};
