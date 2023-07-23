import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  // Fetch all products from the database
  const pageSize = process.env.PAGINATION;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  // Return the products as a JSON response
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch a single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  // Find a product by its ID in the database
  const product = await Product.findById(req.params.id);

  // If the product is found, return it as a JSON response
  if (product) {
    return res.json(product);
  } else {
    // If the product is not found, set the status to 404 (Not Found)
    res.status(404);
    // Throw an error with a custom message
    throw new Error("Product not found");
  }
});

// @desc    Fetch a single product by ID
// @route   POST /api/products
// @access  PRIVATE/ADMIN
const createProduct = asyncHandler(async (req, res) => {
  const product = await Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
  });
  const createdProduct = await product.save();
  res.status(200).json(createdProduct);
});

// @desc    Fetch a single product by ID
// @route   PUT /api/products/:id
// @access  PRIVATE/ADMIN
const editProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Fetch a single product by ID
// @route   PUT /api/products/:id
// @access  PRIVATE/ADMIN
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product deleted successfully" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Fetch a single product by ID
// @route   POST /api/products/:id/reviews
// @access  PRIVATE
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;
    await product.save();
    res.status(200).json({ message: "Product is rated successfully" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Fetch a TOP products
// @route   GET /api/products
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.json(products);
});

export {
  getTopProducts,
  createProductReview,
  deleteProduct,
  editProduct,
  getProductById,
  getProducts,
  createProduct,
};
