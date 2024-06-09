import {Product} from '../model/productModel.js'
import { Order } from '../model/orderModels.js';


export const createOrder = async (req, res) => {
    const { products, paymentIntent, orderby } = req.body;
  
    try {
      // Validate the products array
      if (!products || !Array.isArray(products)) {
        return res.status(400).json({ error: "Products array is required" });
      }
  
      // Check product availability and update quantities and sold counts
      for (let i = 0; i < products.length; i++) {
        const productData = products[i];
        if (!productData.product || productData.count === undefined) {
          return res.status(400).json({ error: "Product ID and count are required" });
        }
  
        // Convert count to a number and validate it
        const count = Number(productData.count);
        if (isNaN(count) || count <= 0) {
          return res.status(400).json({ error: `Invalid count for product: ${productData.product}` });
        }
  
        let product = await Product.findById(productData.product).select("+quantity +sold");
        if (!product) {
          return res.status(404).json({ error: "Product not found" });
        }
        if (product.quantity < count) {
          return res.status(400).json({ error: `Not enough quantity for product: ${product.title}` });
        }
  
        // Deduct product quantity and update sold count
        product.quantity -= count;
        product.sold += count;
        await product.save();
      }
  
      // Create the order
      const newOrder = new Order({
        products,
        paymentIntent,
        orderby,
      });
  
      await newOrder.save();
      res.status(201).json(newOrder);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: error.message });
    }
  };
  

// Function to update product quantity
export const updateProductQuantity = async (req, res) => {
  const { productId, count } = req.body;

  try {
    if (!productId || !count) {
      return res.status(400).json({ error: "Product ID and count are required" });
    }

    // Convert count to a number and validate it
    const countNumber = Number(count);
    if (isNaN(countNumber) || countNumber <= 0) {
      return res.status(400).json({ error: "Invalid count" });
    }

    let product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.quantity < countNumber) {
      return res.status(400).json({ error: `Not enough quantity for product: ${product.title}` });
    }

    product.quantity -= countNumber;
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    console.error("Error updating product quantity:", error);
    res.status(500).json({ error: error.message });
  }
};
