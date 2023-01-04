const fs = require('fs')
const path = require('path')

const Cart = require('./cart')

/* Creating a path to the products.json file. */
const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
)

/**
 * It reads the file, and if there's an error, it calls the callback with an empty array, otherwise it
 * calls the callback with the parsed JSON
 */
const getProductsFromFile = (cb) => {
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
   * The constructor function is a special function that is used to create and initialize an object
   * created within a class
   * @param id - A unique identifier for the product.
   * @param title - The title of the product.
   * @param imageUrl - The URL of the image of the product.
   * @param description - The description of the product.
   * @param price - The price of the product
   */
  constructor(id, title, imageUrl, description, price) {
    this.id = id
    this.title = title
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
  }

  /**
   * If the product has an id, then it's an existing product, so we find it in the array of products and
   * update it. If it doesn't have an id, then it's a new product, so we add it to the array of products
   */
  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        )
        const updatedProducts = [...products]
        updatedProducts[existingProductIndex] = this
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err)
        })
      } else {
        this.id = Math.random().toString()
        products.push(this)
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err)
        })
      }
    })
  }

  /**
   * It gets all the products from the file, finds the product with the given id, filters out the
   * product with the given id, and then writes the updated products to the file
   * @param id - The id of the product to be deleted.
   */
  static deleteById(id) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id)
      const updatedProducts = products.filter((prod) => prod.id !== id)
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(id, product.price)
        }
      })
    })
  }

  static fetchAll(cb) {
    getProductsFromFile(cb)
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id)
      cb(product)
    })
  }
}
