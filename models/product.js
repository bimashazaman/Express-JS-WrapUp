const fs = require('fs')
const path = require('path')

const products = []

module.exports = class Product {
  /**
   * The constructor function is a special function that is called when a new object is created
   * @param t - The title of the book.
   */
  constructor(t) {
    this.title = t
  }

  save() {
    const p = path.join(
      path.dirname(process.mainModule.filename),
      'data',
      'products.json'
    )
    /* Reading the file and then writing the file. */
    fs.readFile(p, (err, fileContent) => {
      /* Creating an empty array. */
      /* Checking if there is an error and if there is not an error, it is parsing the file content. */
      let products = []
      if (!err) {
        products = JSON.parse(fileContent)
      }
      /* Pushing the product into the products array. */
      /* Writing the file. */
      products.push(this)
      fs.writeFile(
        p,
        JSON.stringify(products),

        (err) => {
          console.log(err)
        }
      )
    })
  }

  static fetchAll(cb) {
    const p = path.join(
      path.dirname(process.mainModule.filename),
      'data',
      'products.json'
    )

    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([])
      }
      cb(JSON.parse(fileContent))
    })
  }
}
