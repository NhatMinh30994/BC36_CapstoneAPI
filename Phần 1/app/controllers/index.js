var productService = new ProductService();

function domId(id) {
  return document.getElementById(id);
}

function getProductList() {
  productService.getList().then(function (response) {
    // console.log(response);
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
                    <button type="button" class="btn btn-primary">Thêm</button>
                </div>
            </div>
        </div>
        `;
  }
  document.querySelector(".productsList").innerHTML = content;
}
var result = {};

var renderTypeMobile = function (data) {
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
};

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

//

// Icon giỏ hàng
document.querySelector(".cart-icon").onclick = function () {
  document.querySelector(".cart").style.right = "0";
};

document.querySelector(".fa-xmark").onclick = function () {
  document.querySelector(".cart").style.right = "-100%";
};
