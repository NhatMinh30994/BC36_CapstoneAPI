/**
 *
 * @param {string} id  Mã sản phẩm
 * @param {number} price Giá
 * @param {string} name Tên
 * @param {string} name Tên
 * @param {number} quantity Số lượng
 */

function CartItem(id, name, imgURL, price, quantity) {
  this.id = id;
  this.name = name;
  this.imgURL = imgURL;
  this.price = price;
  this.quantity = quantity;

  // Tổn tiền

  this.totalPrice = function () {
    return this.price * this.quantity;
  };
}
