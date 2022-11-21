var productService = new ProductService();

function domId(id){
    return document.getElementById(id);
}

function getProductList(){
    productService.getList().then(function(response){
        // console.log(response);
        renderProductList(response.data);
        renderTypeMobile(response.data);
    })
}

function renderProductList(data){
    var content = "";
    for (var i = 0; i < data.length; i++){
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
        ` 
    }
    document.querySelector(".productsList").innerHTML = content;
}

// Phần render theo select (từ 44-56) chưa đc
function renderTypeMobile(data){
    var content = "<option>Chọn loại</option>";
    for (var i = 0; i < data.length; i++){
        content += `
            <option>${data[i].type}</option>
        `
    }
    domId("productInput").innerHTML = content;
}

domId("productInput").onchange = function (event){
    console.log(event.target.value)
}



window.onload = function(){
    getProductList();
}




// Icon giỏ hàng
document.querySelector(".cart-icon").onclick = function(){
    document.querySelector(".cart").style.right = "0";
}

document.querySelector(".fa-xmark").onclick = function(){
    document.querySelector(".cart").style.right = "-100%";
}