const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
  /* Rendering the edit-product.ejs file and passing in the pageTitle, path, and editing variables. */
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  })
}

exports.postAddProduct = (req, res, next) => {
  /* Getting the data from the form. */
  const title = req.body.title
  const imageUrl = req.body.imageUrl
  const price = req.body.price
  const description = req.body.description
  /* Creating a new product object and passing in the data from the form. */
  const product = new Product(null, title, imageUrl, description, price)
  product.save()
  res.redirect('/')
}

exports.getEditProduct = (req, res, next) => {
  /* Checking to see if the editMode is true or false. */
  const editMode = req.query.edit
  /* If the editMode is false, then it will redirect to the home page. */
  if (!editMode) {
    return res.redirect('/')
  }
  /* Getting the productId from the URL. */
  const prodId = req.params.productId
  /* Finding the product by the productId and then rendering the edit-product.ejs file. */
  Product.findById(prodId, (product) => {
    if (!product) {
      return res.redirect('/')
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product,
    })
  })
}

/* This is the postEditProduct function. It is getting the productId, title, price, imageUrl, and
description from the form. It is then creating a new product object and passing in the productId,
title, imageUrl, description, and price. It is then saving the product and redirecting to the
admin/products page. */
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId
  const updatedTitle = req.body.title
  const updatedPrice = req.body.price
  const updatedImageUrl = req.body.imageUrl
  const updatedDesc = req.body.description
  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedDesc,
    updatedPrice
  )
  updatedProduct.save()
  res.redirect('/admin/products')
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
    })
  })
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.deleteById(prodId)
  res.redirect('/admin/products')
}
