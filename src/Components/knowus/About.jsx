import React from "react";
import Layout from "../../layout/Layout";

const About = () => {
  return (
    <Layout>
      <div className="sm:min-h-screen flex flex-col justify-center items-center mt-4">
        <div className="w-full sm:max-w-6xl mx-4 sm:mx-auto py-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="flex justify-center items-center">
              <img
                src="https://placehold.co/600x400"
                alt="About Us"
                className="max-h-[300px] rounded-lg shadow-lg "
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="space-y-5 p-4 sm:p-16 text-justify">
                <h1 className="text-4xl sm:text-5xl font-bold font-serif">
                  About Us
                </h1>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Welcome to [Your Company Name], your premier destination for a diverse range of high-quality products. Since our inception in [Year], we have been committed to offering a seamless and enjoyable shopping experience. Our extensive catalog includes everything from the latest fashion trends and cutting-edge electronics to stylish home goods and essential beauty products. We take pride in our rigorous quality checks and carefully curated collections to ensure that you receive only the best.
                </p>
        
              </div>
            </div>
          </div>
        </div>

        <section className="bg-gray-100 w-full py-12">
          <div className="container mx-auto text-center px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Features Guaranteed
            </h2>
            <div className="flex flex-wrap justify-center -mx-4">
              <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
                <div className="bg-white p-8 shadow-lg rounded-lg">
                  <i className="ri-secure-payment-fill text-4xl text-blue-500 mb-4"></i>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Secure Payment
                  </h3>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
                <div className="bg-white p-8 shadow-lg rounded-lg">
                  <i className="ri-medal-line text-4xl text-blue-500 mb-4"></i>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Premium Quality
                  </h3>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
                <div className="bg-white p-8 shadow-lg rounded-lg">
                  <i className="ri-timer-line text-4xl text-blue-500 mb-4"></i>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Timely Delivery
                  </h3>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </div>
              <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8">
                <div className="bg-white p-8 shadow-lg rounded-lg">
                  <i className="ri-text-wrap text-4xl text-blue-500 mb-4"></i>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Easy Return
                  </h3>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
