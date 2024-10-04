export const ToDoList: React.FC = () => {
  return (
    <>
      <div className="mt-1 grid grid-cols-12">
        <div className="p-1 h-[30px] col-span-8 sm:col-span-4 flex justify-center items-center">
          <input
            placeholder="Title"
            className="ml-1 text-center w-full h-full font-poppins font-extrabold"
          />
        </div>
        <div className=" h-[30px] col-span-4 sm:col-span-2 w-full bg-indigo-500">
          <span className="font-poppins h-full w-full font-base text-[10px] font-extrabold">
            set status
          </span>
        </div>
      </div>
      <div className="mt-1 h-[30px] w-full bg-pink-500"></div>
      <div className="h-[100px] w-full bg-red-500"></div>
      <div className="h-[100px] w-full bg-teal-500"></div>
      <div className="h-[100px] w-full bg-orange-500"></div>
    </>
  );
};
