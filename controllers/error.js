exports.get404 = (req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found', path: '/404' })
}
/* This is the getProducts function. It is getting all of the products from the database and
then rendering the admin/products.ejs file. */
