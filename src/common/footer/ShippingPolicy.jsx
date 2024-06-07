import React from 'react'
import Layout from '../../layout/Layout'

const ShippingPolicy = () => {
  return (
    <Layout>
 <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 mt-16 mb-16">
      <h1 className="text-3xl font-bold mb-4 text-center">Shipping Policy</h1>

      <section className="mb-6">
        <p className="text-gray-700 mb-4">
          We know how important it is to receive your order on time, so we have the best courier partners to deliver your product to you as soon as we can.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Standard Delivery</h2>
        <p className="text-gray-700 mb-4">
          We have a standard delivery option in which the product will be dispatched within 24-48 hours of the order.
        </p>
        <p className="text-gray-700 mb-4">
          Depending on the location, the product will be delivered in the below mentioned time after your order has been dispatched.
        </p>
        
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Delivery Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border-b border-gray-200">Mumbai</td>
                <td className="px-4 py-2 border-b border-gray-200">3-4 working days</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-2 border-b border-gray-200">Metro</td>
                <td className="px-4 py-2 border-b border-gray-200">5-7 working days</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-gray-200">Other Region</td>
                <td className="px-4 py-2 border-b border-gray-200">10 working days</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Shipping Charges</h2>
        
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Value of Order</th>
                <th className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Shipping Charges</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border-b border-gray-200">Below Rs. 750</td>
                <td className="px-4 py-2 border-b border-gray-200">Rs. 50</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-2 border-b border-gray-200">Rs. 751-1299</td>
                <td className="px-4 py-2 border-b border-gray-200">Rs. 100</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-gray-200">Rs. 1300 & Above</td>
                <td className="px-4 py-2 border-b border-gray-200">Free</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <p className="text-gray-700 mb-4">
          *If you don't receive your order in 7-10 days, please email us with all the details or you may contact us at +91 9667976977 between 10.30 - 06.00 on Monday to Saturday.
        </p>
        <p className="text-gray-700">
          *For every COD order above Rs. 5000, customers have to make half payment before the order dispatch.
        </p>
      </section>
    </div>
    </Layout>
  )
}

export default ShippingPolicy