/**
 *
 * @param {string} id  Mã sản phẩm
 * @param {number} price Giá
 * @param {string} name Tên
 * @param {number} quarity Số lượng
 */

function CartItem(id, name, price, quarity) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.quarity = quarity;

  // Tổn tiền

  this.totalPay = function () {
    return (this.totalPay = this.price * this.quarity);
  };
}
