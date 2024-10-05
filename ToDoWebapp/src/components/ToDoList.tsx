import { useState } from "react";

export const ToDoList: React.FC = () => {
  const [isSetStatusClick, setStatusClick] = useState<boolean>(false);
  const ToogleSetStatus = () => {
    setStatusClick((prev) => !prev);
    console.log("clicked");
  };
  return (
    <>
      <div className="mt-1 grid grid-cols-12">
        <div className="p-1 h-[30px] col-span-8 sm:col-span-2 flex justify-center items-center">
          <input
            placeholder="Title"
            className="ml-1 text-center w-full h-full font-poppins font-extrabold"
          />
        </div>
        <div className="relative flex flex-inline justify-center items-center h-[30px] col-span-4 sm:col-span-1 w-full">
          <span
            onClick={ToogleSetStatus}
            className="flex justify-center items-center font-poppins h-full w-full font-base text-[8px] sm:text-[10px] font-extrabold cursor-pointer"
          >
            set status
          </span>
          <svg
            onClick={ToogleSetStatus}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6 cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
            />
          </svg>
          {isSetStatusClick && (
            <aside className="rounded-lg shadow absolute top-6 -right-5 w-[100px] h-[60px] bg-teal-500"></aside>
          )}
        </div>
      </div>
      <div className="mt-1 h-[30px] w-full bg-pink-500"></div>
      <div className="h-[100px] w-full bg-red-500"></div>
      <div className="h-[100px] w-full bg-teal-500"></div>
      <div className="h-[100px] w-full bg-orange-500"></div>
    </>
  );
};
