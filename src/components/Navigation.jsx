import React, { useState, useEffect } from "react";
import { Hash, User, MessageCircle } from 'lucide-react';

const Navigation = ({ setActiveComponent, defaultActive }) => {
  const Menus = [
    { name: "Topics", icon: Hash },
    { name: "Rooms", icon: User },
    { name: "Blogs", icon: MessageCircle },
  ];

  const defaultIndex = Menus.findIndex(menu => menu.name === defaultActive);
  const [active, setActive] = useState(defaultIndex);

  useEffect(() => {
    setActiveComponent(Menus[defaultIndex].name);
  }, [defaultIndex, setActiveComponent]);

  const handleClick = (i, name) => {
    setActive(i);
    setActiveComponent(name);
  };

  return (
    <div className="fixed bottom-0 left-20 right-20 bg-customBackground1 max-h-[4.4rem] px-6 rounded-t-xl w-[calc(100%-5.5rem)]">
      <ul className="flex relative justify-around">
        {Menus.map((menu, i) => (
          <li key={i} className="w-16">
            <a
              className="flex flex-col text-center pt-6 cursor-pointer"
              onClick={() => handleClick(i, menu.name)}
            >
              <span
                className={`text-xl duration-500 ${
                  i === active && "-mt-4 text-white"
                }`}
              >
                <menu.icon
                  className={`mx-auto ${i === 0 ? 'text-orange-500' : i === 1 ? 'text-blue-600' : 'text-green-500'} group-hover:bg-gray-200 group-hover:rounded-full`}
                />
              </span>
              <span
                className={`text-gray-400 ${
                  active === i
                    ? "translate-y-2 duration-700 opacity-100"
                    : "opacity-0 translate-y-8"
                }`}
              >
                {menu.name}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navigation;
