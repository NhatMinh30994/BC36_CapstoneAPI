var productService = new ProductService();

function domId(id) {
  return document.getElementById(id);
}

function getProductList() {
  productService.getList().then(function (response) {
    renderProductList(response.data);
  });
}

function renderProductList(data) {
  var content = "";
  for (var i = 0; i < data.length; i++) {
    content += `
            <tr>
                <td>${i + 1}</td>
                <td>${data[i].name}</td>
                <td>${data[i].price}</td>
                <td>${data[i].image}</td>
                <td>${data[i].description}</td>
                <td>
                  <button data-toggle="modal"
                  data-target="#myModal" class='btn btn-info' onclick='openUpdateModal(${
                    data[i].id
                  })'>Sửa</button>
                  <button class='btn btn-danger' onclick='deleteProduct(${
                    data[i].id
                  })'>Xóa</button>
                </td>
            </tr>
        `;
  }
  domId("tblDanhSachSP").innerHTML = content;
}

domId("btnThemSP").onclick = function () {
  document.querySelector(".modal-title").innerHTML = "Thêm sản phẩm";
  document.querySelector(".modal-footer").innerHTML =
    "<button onclick='addProduct()' class='btn btn-primary'>Thêm</button>";
  resetForm();
};

function validateForm() {
  var name = domId("TenSP").value;
  var price = domId("GiaSP").value;
  var image = domId("HinhSP").value;
  var description = domId("loaiSP").value;

  var isValid = true;

  isValid &=
    required(name, "nameProduct") &&
    checkLength(name, "nameProduct", 6, 18) &&
    checkName(name, "nameProduct");
  isValid &= required(price, "priceProduct");
  isValid &= required(image, "imgProduct");
  isValid &= required(description, "descProduct");

  return isValid;
}

function addProduct() {
  openForm();
  var isValid = validateForm();
  if (!isValid) return;

  var name = domId("TenSP").value;
  var price = domId("GiaSP").value;
  var image = domId("HinhSP").value;
  var description = domId("loaiSP").value;

  var product = new Product(name, price, image, description);

  productService.addProduct(product).then(function () {
    alert("Thêm sản phẩm thành công");
    getProductList();
    document.querySelector(".close").click();
  });
}

function openUpdateModal(id) {
  resetForm();
  document.querySelector(".modal-title").innerHTML = "Cập nhật sản phẩm";
  document.querySelector(
    ".modal-footer"
  ).innerHTML = `<button onclick='updateProduct(${id})' class='btn btn-primary'>Cập nhật</button>`;

  productService.getById(id).then(function (response) {
    domId("TenSP").value = response.data.name;
    domId("GiaSP").value = response.data.price;
    domId("HinhSP").value = response.data.image;
    domId("loaiSP").value = response.data.description;
  });
}

function updateProduct(id) {
  openForm();
  var isValid = validateForm();
  if (!isValid) return;

  var product = new Product(name, price, image, description);

  productService.updateProduct(id, product).then(function () {
    alert("Cập nhật thành công");
    getProductList();
    document.querySelector(".close").click();
  });
}

function deleteProduct(id) {
  productService.deleteProduct(id).then(function () {
    alert("Xóa sản phẩm thành công");
    getProductList();
  });
}

// === Validation ===
function required(value, spanId) {
  if (value.length === 0) {
    domId(spanId).innerHTML = "Trường này không được để trống";
    return false;
  }
  domId(spanId).innerHTML = "";
  return true;
}

function resetForm() {
  domId("TenSP").value = "";
  domId("GiaSP").value = "";
  domId("HinhSP").value = "";
  domId("loaiSP").value = "";

  domId("nameProduct").style.display = "none";
  domId("priceProduct").style.display = "none";
  domId("imgProduct").style.display = "none";
  domId("descProduct").style.display = "none";
}

function openForm() {
  domId("nameProduct").style.display = "block";
  domId("priceProduct").style.display = "block";
  domId("imgProduct").style.display = "block";
  domId("descProduct").style.display = "block";
}

function checkLength(value, spanId, min, max) {
  if (value.length < min || value.length > max) {
    domId(spanId).innerHTML = `Độ dài phải từ ${min} tới ${max} ký tự`;
    return false;
  }
  domId(spanId).innerHTML = "";
  return true;
}

function checkName(value, spanId) {
  var pattern = /^[A-Za-z0-9 ]+$/g;
  if (pattern.test(value)) {
    domId(spanId).innerHTML = "";
    return true;
  }
  domId(spanId).innerHTML = "Không đúng định dạng";
  return false;
}

window.onload = function () {
  getProductList();
};
