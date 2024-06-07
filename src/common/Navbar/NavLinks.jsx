import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { links } from './Mylinks';
  
const NavLinks = ({ isMobile }) => {
  const [heading, setHeading] = useState('');

  return (
    <>
      {links.map((link, index) => (
        <div key={index}>
          <div className="text-left md:cursor-pointer group">
            {!isMobile ? (
              <Link
                to={link.linktopath}
                className="py-2 flex justify-between items-center md:pr-0 pr-5 group hover:text-red-600 text-[12px]"
                onClick={() => {
                  heading !== link.name ? setHeading(link.name) : setHeading('');
                }}
              >
                {link.name}
                <span className="text-xl md:hidden inline">
                  <ion-icon
                    name={`${heading === link.name ? 'chevron-up' : 'chevron-down'}`}
                  ></ion-icon>
                </span>
              </Link>
            ) : (
              <div
                className="py-2 flex justify-between items-center md:pr-0 pr-5 group hover:text-red-600 text-[12px]"
                onClick={() => {
                  heading !== link.name ? setHeading(link.name) : setHeading('');
                }}
              >
                {link.name}
                <span className="text-xl md:hidden inline">
                  <ion-icon
                    name={`${heading === link.name ? 'chevron-up' : 'chevron-down'}`}
                  ></ion-icon>
                </span>
              </div>
            )}
            {link.submenu && (
              <div>
                <div className="relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 hidden group-hover:md:block hover:md:block w-56 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                    <div className="bg-white mx-auto p-2 grid grid-cols-1 w-52 container border-2 ">
                      {link.sublinks.map((mysublinks, subIndex) => (
                        <div key={subIndex}>
                          {mysublinks.sublink.map((slink, subLinkIndex) => (
                            <li key={subLinkIndex} className="text-sm text-gray-600 my-2.5">
                              <div className="flex items-center justify-tart">
                                <img
                                  src={slink.imageUrl}
                                  alt=""
                                  className="w-10 h-10 "
                                />
                                <Link
                                  to={`${link.linktopath}${slink.link}`}
                                  className="hover:text-red-600 duration-100 pl-3 text-[12px]"
                                >
                                  {slink.name}
                                </Link>
                              </div>
                            </li>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className={`${heading === link.name ? 'md:hidden' : 'hidden'}`}>
            {link.sublinks.map((slinks, slinkIndex) => (
              <div key={slinkIndex}>
                <div className="pl-7 font-semibold md:pr-0 pr-5 flex justify-between items-center">
                  {/* Removed slinks.Head */}
                  <span className="text-xl md:mt-1 md:ml-2 inline">
                    {/* Removed ion-icon since slinks.Head is removed */}
                  </span>
                </div>
                <div className="md:hidden">
                  {slinks.sublink.map((slink, innerSlinkIndex) => (
                    <li key={innerSlinkIndex} className="pl-14">
                      <Link to={`${link.linktopath}${slink.link}`}>{slink.name}</Link>
                    </li>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default NavLinks;
