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
                    <button type="button" class="btn btn-primary" onclick="addCart('${data[i].id}')">Thêm</button>
                </div>
            </div>
        </div>
        `;
  }
  document.querySelector(".productsList").innerHTML = content;
}
var result = {};

function renderTypeMobile(data) {
  var content = "<option value='all'>Tất cả</option>";
  for (var i = 0; i < data.length; i++) {
    if (!result[data[i].type]) {
      result[data[i].type] = [];
      content += `<option value='${data[i].type}'>${data[i].type}</option>`;
    }
    result[data[i].type].push(data[i]);
  }

  // console.log(result);

  domId("productInput").innerHTML = content;
  // console.log(data);
}

domId("productInput").onchange = function (event) {
  var type = event.target.value;
  // console.log(type);

  if (type === "samsung") {
    var showType = result.samsung;
  }

  if (type === "iphone") {
    var showType = result.iphone;
  }

  if (type === "all") {
    var showType = [...result.samsung, ...result.iphone];
  }

  renderProductList(showType);
  // console.log(showType);
};

window.onload = function () {
  getProductList();
};

// Phần Giỏ hàng

var cartProductID = [];

var quarity = 0;
function addCart(id) {
  for (var i = 0; i < productsList.length; i++) {
    if (productsList[i].id === id) {
      if (!cartProductID[i]) {
        quarity++;
        var cartItem = new CartItem(
          productsList[i].id,
          productsList[i].name,
          productsList[i].price,
          quarity
        );

        cartProductID.push(cartItem);
      }
      if (cartProductID[i]) {
      }
    }
  }
  renderCart(cartProductID);
}

function renderCart(cart) {
  var content = ``;
  for (var i = 0; i < cart.length; i++) {
    content += `
    <tr>
    <td>
      <img src="https://cdn.tgdd.vn/Products/Images/42/114115/iphone-x-64gb-hh-600x600.jpg" alt="">
    </td>
    <td>${cart[i].name}</td>
    <td>
      <input style="width: 50px" type="number" name="" id="${
        cart[i].quarity
      }" value="1" min="0" data-dashlane-rid="fff27122747b9aab" data-form-type="other">
    </td>
    <td>${cart[i].totalPay()}</td>
    <td>Xóa</td>
  </tr>
    `;
  }

  domId("tableCartProduct").innerHTML = content;
}

// Icon giỏ hàng
document.querySelector(".cart-icon").onclick = function () {
  document.querySelector(".cart").style.right = "0";
};

document.querySelector(".fa-xmark").onclick = function () {
  document.querySelector(".cart").style.right = "-100%";
};
