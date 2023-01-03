const fs = require('fs')
const path = require('path')

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
)

const getProductsFromFile = (cb) => {
  /* It's reading the file and then passing the content of the file to the callback function. */
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([])
    } else {
      cb(JSON.parse(fileContent))
    }
  })
}

module.exports = class Product {
  /**
   * The constructor function is a special function that is used to create an instance of a class
   * @param title - The title of the product.
   * @param imageUrl - The URL of the image for the product.
   * @param description - A string that describes the product.
   * @param price - The price of the product
   */
  constructor(title, imageUrl, description, price) {
    this.title = title
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
  }

  /**
   * We're creating a new product, and then we're getting all the products from the file, and then
   * we're pushing the new product to the products array, and then we're writing the products array to
   * the file
   */
  save() {
    this.id = Math.random().toString()
    getProductsFromFile((products) => {
      products.push(this)
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err)
      })
    })
  }

  /**
   * It fetches all the products from the file and then passes them to the callback function
   * @param cb - callback function
   */
  static fetchAll(cb) {
    getProductsFromFile(cb)
  }

  /**
   * It gets all the products from the file, then it finds the product with the given id and returns it
   * @param id - The id of the product we want to find.
   * @param cb - callback function
   */
  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id)
      cb(product)
    })
  }
}
