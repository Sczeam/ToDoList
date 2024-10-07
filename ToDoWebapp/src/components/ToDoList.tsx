import { useState, useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";

type Todo = {
  taskName: string;
  dueDate?: Date;
  priority?: "Low" | "Medium" | "High";
  status?: "On track" | "Off track";
  isDone: boolean;
};

export const ToDoList: React.FC = () => {
  const [isSetStatusClick, setStatusClick] = useState<boolean>(false); //useState for setStatus box
  const [statusText, setStatusText] = useState<string>("Set Status");
  const [statusEmoji, setStatusEmoji] = useState<JSX.Element>(
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
      />
    </svg>
  );

  const [isToDoExpand, setToDoExpand] = useState<boolean>(true);
  const [isDoingExpand, setDoingExpand] = useState<boolean>(true);
  const [isAddTaskTable, setIsAddTaskTable] = useState<boolean>(false);
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const parentRef = useRef(null);
  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, [parentRef]);

  const ToogleSetStatus = () => {
    setStatusClick((prev) => !prev);
    console.log("clicked");
  };

  const OnTrack = () => {
    setStatusText("On Track");
    setStatusEmoji(
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
        />
      </svg>
    );
    setStatusClick(false);
  };

  const AtRisk = () => {
    setStatusText("At Risk");
    setStatusEmoji(
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
        />
      </svg>
    );
    setStatusClick(false);
  };

  const ExpandToDoTable = () => {
    setToDoExpand((prev) => !prev);
  };

  const ExpandDoingTable = () => {
    setDoingExpand((prev) => !prev);
  };

  const AddTask = () => {
    setIsAddTaskTable((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo: Todo = {
      taskName: todo,
      isDone: false,
    };
    setTodos([...todos, newTodo]);
    setTodo("");
    setIsAddTaskTable(false);
  };

  const finishedTask = (index: number) => {
    const updatedTodos = todos.map((task, i) =>
      i === index ? { ...task, isDone: !task.isDone } : task
    );
    setTodos(updatedTodos);
  };

  return (
    <>
      <div className="mt-1 col-span-2 grid grid-cols-12">
        <div className="p-1 h-[30px] col-span-4 sm:col-span-1 flex justify-center items-center">
          <input
            placeholder="Title"
            className="ml-1 text-center w-full h-full font-poppins font-extrabold"
          />
        </div>
        <div className="relative flex flex-inline justify-center items-center h-[30px] col-span-2 sm:col-span-1 w-full">
          <span
            onClick={ToogleSetStatus}
            className="select-none flex justify-center items-center font-poppins h-full w-full font-base text-[8px] sm:text-[10px] font-extrabold cursor-pointer"
          >
            {statusText}
          </span>
          {/*display emoji dynamically here*/}
          {statusEmoji}

          {isSetStatusClick && (
            <aside className="flex justify-center items-center flex-col rounded-lg shadow-lg absolute top-7 w-[80px] h-[60px] border border-black">
              <span
                onClick={OnTrack}
                className="hover:bg-gray-500 rounded select-none flex justify-center items-center font-poppins h-full w-full font-base text-[8px] sm:text-[10px] font-extrabold cursor-pointer"
              >
                On track
              </span>
              <span
                onClick={AtRisk}
                className="hover:bg-gray-500 rounded select-none flex justify-center items-center font-poppins h-full w-full font-base text-[8px] sm:text-[10px] font-extrabold cursor-pointer"
              >
                At risk
              </span>
            </aside>
          )}
        </div>
      </div>
      <div className="p-1 h-[30px] flex items-center w-full col-span-2">
        <button className="flex flex-inline justify-center items-center ml-1 rounded border shadow font-poppins p-1 text-[13px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add Task
        </button>
      </div>
      <div className="Relative ml-3 border-t-[1px] min-h-[30px] w-full col-span-2 divide-y divide-slate-200">
        <div className="h-[30px] w-full grid grid-cols-12 divide-x-2">
          <div className="col-span-3 font-poppins flex items-center">
            Task Name
          </div>
          <div className="hidden sm:flex col-span-3 font-poppins items-center pl-1">
            Due Date
          </div>
          <div className="hidden sm:flex col-span-3 font-poppins  items-center pl-1">
            Priority
          </div>
          <div className="hidden sm:flex col-span-3 font-poppins  items-center pl-1">
            Status
          </div>
        </div>

        {/* To Do start */}
        <div className="Static col-span-12 min:h-[50px] divide-y pr-6 ">
          <div className="flex flex-inline items-center py-3">
            <span onClick={ExpandToDoTable} className="cursor-pointer">
              {/* expand icon here */}
              {isToDoExpand ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              )}
            </span>

            <span className="font-extrabold font-poppins sm:text-[20px] select-none">
              To Do
            </span>
          </div>

          {isToDoExpand && (
            <div className="inline-block h-full w-full ">
              <div
                className={`${
                  isAddTaskTable ? "border-b-2" : ""
                }  min:h-[50px] w-full`}
              >
                <ul
                  ref={parentRef}
                  className="divide-y border-b-2 font-poppins"
                >
                  {todos.map((task, index) => (
                    <li
                      className="min:h-[30px] w-full grid grid-cols-12 divide-x-2 p-1"
                      key={index}
                    >
                      <span className="col-span-12 sm:col-span-3 flex items-center">
                        {/* task icon */}
                        <span onClick={() => finishedTask(index)}>
                          {task.isDone ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="mr-3 size-6"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="mr-3 size-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              />
                            </svg>
                          )}
                        </span>

                        {task.taskName}
                      </span>
                      <span className="hidden sm:flex col-span-3"></span>
                      <span className="hidden sm:flex col-span-3"></span>
                      <span className="hidden sm:flex col-span-3"></span>
                    </li>
                  ))}
                </ul>
                {isAddTaskTable && (
                  <form onSubmit={handleSubmit}>
                    <div className=" h-[30px] w-full grid grid-cols-12 divide-x-2">
                      <div className=" flex justify-center items-center col-span-12 sm:col-span-3 p-1">
                        <input
                          onChange={(e) => setTodo(e.target.value)}
                          value={todo}
                          type="text"
                          placeholder="Task Name"
                          className="font-poppins w-full h-full border-none"
                        />
                      </div>
                      <div className="hidden sm:flex col-span-3"></div>
                      <div className="hidden sm:flex col-span-3"></div>
                      <div className="hidden sm:flex col-span-3"></div>
                    </div>
                  </form>
                )}
              </div>

              <span onClick={AddTask} className="select-none cursor-pointer">
                Add tasks...
              </span>
            </div>
          )}
        </div>
        {/* To Do End */}

        {/* Doing start */}
        <div className="Static col-span-12 min:h-[50px] divide-y pr-6 ">
          <div className="flex flex-inline items-center py-3">
            <span
              onClick={ExpandDoingTable}
              className="select-none cursor-pointer"
            >
              {/* expand icon here */}
              {isDoingExpand ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              )}
            </span>

            <span className="font-extrabold font-poppins sm:text-[20px] select-none">
              Doing
            </span>
          </div>

          {isDoingExpand && (
            <div className="inline-block h-full w-full ">
              <div
                className={`${
                  isAddTaskTable ? "border-b-2" : ""
                }  min:h-[50px] w-full`}
              >
                <ul className="divide-y border-b-2 font-poppins">
                  <li className="min:h-[30px] w-full grid grid-cols-12 divide-x-2 p-1">
                    <span className="col-span-12 sm:col-span-3 flex items-center"></span>
                    <span className="hidden sm:flex col-span-3"></span>
                    <span className="hidden sm:flex col-span-3"></span>
                    <span className="hidden sm:flex col-span-3"></span>
                  </li>
                </ul>
                {isAddTaskTable && (
                  <form>
                    <div className=" h-[30px] w-full grid grid-cols-12 divide-x-2">
                      <div className=" flex justify-center items-center col-span-12 sm:col-span-3 p-1">
                        <input
                          type="text"
                          placeholder="Task Name"
                          className="font-poppins w-full h-full border-none"
                        />
                      </div>
                      <div className="hidden sm:flex col-span-3"></div>
                      <div className="hidden sm:flex col-span-3"></div>
                      <div className="hidden sm:flex col-span-3"></div>
                    </div>
                  </form>
                )}
              </div>

              <span className="select-none cursor-pointer">Add tasks...</span>
            </div>
          )}
        </div>
        {/* Doing end */}
      </div>

      <div className="h-[100px] w-full"></div>
    </>
  );
};
