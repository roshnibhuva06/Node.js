import Product from "../models/productModel.js";

const checkEmpty = (data, res) => {
  if (!data || data.length === 0) {
    return res.status(404).json({ message: "No products found" });
  }
};

//  Fetch all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (checkEmpty(products, res)) return;
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Fetch product by ID

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "No products found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Search products by productName (case insensitive)
export const searchByProductName = async (req, res) => {
  try {
    const { name } = req.query;
    const products = await Product.find({
      productName: { $regex: name, $options: "i" }
    });
    if (checkEmpty(products, res)) return;
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Search by brand
export const searchByBrand = async (req, res) => {
  try {
    const { brand } = req.query;
    const products = await Product.find({ brand });
    if (checkEmpty(products, res)) return;
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Search by productName + category + brand
export const searchMultiple = async (req, res) => {
  try {
    const { name, category, brand } = req.query;

    const filter = {};
    if (name) filter.productName = { $regex: name, $options: "i" };
    if (category) filter.category = category;
    if (brand) filter.brand = brand;

    const products = await Product.find(filter);
    if (checkEmpty(products, res)) return;
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch by category

export const getByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    const products = await Product.find({ category });
    if (checkEmpty(products, res)) return;
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Filter by price range

export const filterByPriceRange = async (req, res) => {
  try {
    const { min, max } = req.query;

    const products = await Product.find({
      price: { $gte: min, $lte: max }
    });

    if (checkEmpty(products, res)) return;
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Filter by rating above a given value

export const filterByRating = async (req, res) => {
  try {
    const { minRating } = req.query;

    const products = await Product.find({
      rating: { $gte: minRating }
    });

    if (checkEmpty(products, res)) return;
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Sort products by price (asc / desc)
export const sortProducts = async (req, res) => {
  try {
    const { order } = req.query; // asc OR desc
    const sortOrder = order === "desc" ? -1 : 1;

    const products = await Product.find().sort({ price: sortOrder });
    if (checkEmpty(products, res)) return;
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Pagination Route

export const paginateProducts = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = Number(page);
    limit = Number(limit);

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find().skip(skip).limit(limit),
      Product.countDocuments()
    ]);

    if (checkEmpty(products, res)) return;

    res.json({
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      products
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Combined Filters (category + price + rating + sort + page)

export const combinedFilters = async (req, res) => {
  try {
    const { category, min, max, minRating, sort, page = 1, limit = 10 } = req.query;

    let filter = {};

    if (category) filter.category = category;
    if (min && max) filter.price = { $gte: min, $lte: max };
    if (minRating) filter.rating = { $gte: minRating };

    const sortOrder = sort === "desc" ? -1 : 1;
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort({ price: sortOrder })
        .skip(skip)
        .limit(Number(limit)),
      Product.countDocuments(filter)
    ]);

    if (checkEmpty(products, res)) return;

    res.json({
      total,
      totalPages: Math.ceil(total / limit),
      page: Number(page),
      products
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
