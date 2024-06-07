import React from 'react'
import Layout from '../../layout/Layout'

const HowToOrder  = () => {
  return (
    <Layout>


<div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 mt-20 mb-6">
      <h1 className="text-3xl font-bold mb-4 text-center">How to Order</h1>
      <section className="mb-6">
        <p className="text-gray-700 mb-4">
          Ordering from our website is simple and straightforward. Just follow these easy steps:
        </p>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Step 1: Browse Products</h2>
          <p className="text-gray-700">
            Start by browsing our collection of products. You can use the search bar or navigate through the categories to find what you're looking for.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Step 2: Add to Cart</h2>
          <p className="text-gray-700">
            Once you find a product you like, select the desired size, color, and quantity, then click on the "Add to Cart" button. You can view your cart at any time by clicking on the cart icon at the top right corner of the page.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Step 3: Review Your Cart</h2>
          <p className="text-gray-700">
            Before proceeding to checkout, review the items in your cart to ensure you have everything you need. You can update quantities or remove items if necessary.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Step 4: Checkout</h2>
          <p className="text-gray-700">
            When you are ready, click the "Checkout" button. You will be prompted to enter your shipping information, select a shipping method, and provide your payment details. Ensure all information is correct before submitting your order.
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Step 5: Confirmation</h2>
          <p className="text-gray-700">
            After placing your order, you will receive a confirmation email with your order details. We will also notify you once your order has been shipped, along with tracking information.
          </p>
        </div>
      </section>
    </div>
    </Layout>
  )
}

export default HowToOrder 