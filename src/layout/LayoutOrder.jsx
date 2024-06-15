import React, { useEffect, useState } from "react";
import Footer from "../common/footer/Footer";
import { Link, useLocation } from "react-router-dom";
import NavbarOrder from "../common/Navbar/NavbarOrder";
import axios from "axios";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Ensure that ScrollToTop component returns null or JSX
}

const LayoutOrder = ({ children ,cart , addressIndex }) => {

  console.log(cart,'this ismy cart')
  const { pathname } = useLocation();
  const [orderData,setOrderData] = useState()


  // useEffect(()=>{
  //   const transformedProducts = cart.products.map(item => ({
  //     product: item.product._id,
  //     count: item.count,
  //     color: item.color,
  //     size: item.size
  //   }));
    
  //   setOrderData({ products: transformedProducts,paymentIntent: {
  //   "id": "pi_1GqIC8Ez4e5GAbFDS7hJI9K5",
  //   "amount": 1000,
  //   "currency": "usd",
  //   "status": "succeeded"
  // },orderby: cart.orderby, addressIndex:addressIndex });
  // },[cart])

  // const Order = async()=>{
  //   const url = `http://localhost:5000/api/order/create-order`
  //   const Response = await axios.post(url,{orderData},{
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${bearerToken.token}`,
  //     },
  //   })
  //   console.log(Response)
  // } 

  return (
    <>
      <NavbarOrder />

      <ScrollToTop />

      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 mt-9">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            {children}

            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  Order summary
                </p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Original price
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        $7,592.00
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Savings
                      </dt>
                      <dd className="text-base font-medium text-green-600">
                        -$299.00
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Store Pickup
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        $99
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Tax
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        $799
                      </dd>
                    </dl>
                  </div>
                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                        {Math.trunc(cart?.cartTotal)}
                    </dd>
                  </dl>
                </div>
                {pathname !== "/checkout" && (
                  <Link
                    to={"/checkout"}
                    className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Proceed to Checkout
                  </Link>
                )}
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {" "}
                    or{" "}
                  </span>
                  <Link
                    to={"/view-products"}
                    title=""
                    className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 underline hover:no-underline dark:text-blue-500"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default LayoutOrder;
