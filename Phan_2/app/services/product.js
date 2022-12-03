function ProductService() {
  this.getList = function () {
    return axios({
      url: "https://63720f30025414c63704f5fa.mockapi.io/product1",
      method: "GET",
    });
  };

  this.addProduct = function (data) {
    return axios({
      url: "https://63720f30025414c63704f5fa.mockapi.io/product1",
      method: "POST",
      data: data,
    });
  };

  this.getById = function (id) {
    return axios({
      url: `https://63720f30025414c63704f5fa.mockapi.io/product1/${id}`,
      method: "GET",
    });
  };

  this.updateProduct = function (id, data) {
    return axios({
      url: `https://63720f30025414c63704f5fa.mockapi.io/product1/${id}`,
      method: "PUT",
      data: data,
    });
  };

  this.deleteProduct = function (id) {
    return axios({
      url: `https://63720f30025414c63704f5fa.mockapi.io/product1/${id}`,
      method: "DELETE",
    });
  };
}
