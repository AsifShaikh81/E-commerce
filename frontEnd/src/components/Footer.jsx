import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="my-10 mt-40 text-sm">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14">
        {/*  bg-[#d5c8bd] */}
        {/* Column 1 */}
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            iure maiores commodi nobis fugiat. Eos tenetur debitis reprehenderit
            nihil maiores consequuntur nesciunt nulla vel soluta. Quibusdam esse
            rerum praesentium ipsum quaerat explicabo veritatis quidem quis
            magnam pariatur ipsa ut, aspernatur, repellendus, incidunt corporis
            adipisci quia sint voluptates sit iusto deleniti!
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* Column 3 (optional future content) */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91 123456789</li>
            <li>contact@example.com</li>
            <li><a href="https://github.com/AsifShaikh81" target="_blank">Github</a></li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p
          className="py-5
          text-sm text-center"
        >
          Copyright 2024@ AsifShaikh.com - All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
