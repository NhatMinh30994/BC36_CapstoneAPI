/**
 *
 * @param {string} id  Mã sản phẩm
 * @param {number} price Giá
 * @param {string} name Tên
 * @param {number} quantity Số lượng
 */

function CartItem(id, name, price, quantity) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.quantity = quantity;

  // Tổn tiền

  this.totalPrice = function () {
    return this.price * this.quantity;
  };
}
