import React from "react";
import Layout from "../../layout/Layout";
import phone from "../../assets/phone.svg";
import chat from "../../assets/liveChat.svg";
import mail from "../../assets/mail.svg";

const Contact = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-8 mt-14 mb-20">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-10 md:mb-20">
          Contact Us
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 container px-4 md:px-0 mx-auto">
          <div className="flex flex-col items-center border-2 p-6">
            <img src={phone} alt="phone" width={50} className="mb-4" />
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              Call Now
            </h2>
            <div className="w-12 h-1 bg-red-500 my-2"></div>
            <p className="text-red-500 mb-2">+91 966-7976-977</p>
            <p className="text-zinc-600 dark:text-zinc-400 text-center">
              Mon - Sat : 10:30 am - 06:00 pm
            </p>
          </div>
          <div className="flex flex-col items-center border-2 p-6">
            <img src={chat} alt="chat" width={50} className="mb-4" />
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              Chat Now
            </h2>
            <div className="w-12 h-1 bg-red-500 my-2"></div>
            <p className="text-red-500 mb-2">Chat with us.</p>
            <p className="text-zinc-600 dark:text-zinc-400 text-center">
              Mon - Sat : 10:30 am - 06:00 pm
            </p>
          </div>
          <div className="flex flex-col items-center border-2 p-6">
            <img src={mail} alt="email" width={50} className="mb-4" />
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              Drop an Email
            </h2>
            <div className="w-12 h-1 bg-red-500 my-2"></div>
            <p className="text-red-500 mb-2">support@powerlook.in</p>
            <p className="text-zinc-600 dark:text-zinc-400 text-center">
              We will try to revert you ASAP.
            </p>
          </div>
        </div>
      </div>


    </Layout>
  );
};

export default Contact;
