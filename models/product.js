const products = []

module.exports = class Product {
  /**
   * The constructor function is a special function that is called when a new object is created
   * @param t - The title of the book.
   */
  constructor(t) {
    this.title = t
  }

  /**
   * The save function pushes the current object into the products array
   */
  save() {
    products.push(this)
  }

  /**
   * It returns the products array
   * @returns An array of objects
   */
  static fetchAll() {
    return products
  }
}
