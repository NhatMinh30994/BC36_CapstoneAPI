function ProductService() {
  this.getList = function () {
    return axios({
      url: "https://63720f30025414c63704f5fa.mockapi.io/products",
      method: "GET",
    });
  };
}
