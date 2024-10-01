interface NavbarProps {
  toggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <div className=" grid grid-cols-12 bg-gray-700">
      <div className="grid grid-cols-12 col-span-3 min-h-[50px]  bg-gray-700 shadow">
        <div className="col-span-6 sm:col-span-2 flex justify-center items-center min-h-[40px] shadow">
          <span
            onClick={toggleSidebar}
            aria-label="Toogle Menu"
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="cursor-pointer size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </span>
        </div>
        <div className="col-span-6 sm:col-span-10 flex items-center min-h-[40px] shadow">
          <button className="hidden text-white border min-w-[85px] min-h-[30px] sm:inline-flex items-center rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="red"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              className="flex justify-center size-7"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Create
          </button>
        </div>
      </div>
      <div className=" p-1 flex sm:justify-center sm:items-center col-span-6 min-h-[50px] shadow">
        <div className=" p-2 w-[500px] rounded-full shadow-lg bg-gray-500 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="white"
            className=" cursor-pointer size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            className="col-span-4 w-full h-full text-xl border-none outline-none bg-transparent"
            placeholder="Search"
          ></input>
        </div>
      </div>
      <div className="col-span-3 min-h-[50px]   shadow"></div>
    </div>
  );
};
