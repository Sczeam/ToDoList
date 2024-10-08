import { useState, useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragEndEvent,
} from "@dnd-kit/core";

import { CSS } from "@dnd-kit/utilities";

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

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [doing, setDoing] = useState<Todo[]>([]);
  const [isAddTaskTable, setIsAddTaskTable] = useState<boolean>(false);
  const ToogleSetStatus = () => {
    setStatusClick((prev) => !prev);
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

  // const finishedTask = (index: number) => {
  //   const updatedTodos = todos.map((task, i) =>
  //     i === index ? { ...task, isDone: !task.isDone } : task
  //   );
  //   setTodos(updatedTodos);
  // };
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return; // Exit if no valid drop target

    if (over.id === "doing" && active.data.current?.type === "todo") {
      const task = todos.find((task) => task.taskName === active.id);
      if (task) {
        setTodos((prev) => prev.filter((t) => t.taskName !== task.taskName));
        setDoing((prev) => [...prev, task]);
      }
    }

    if (over.id === "todo" && active.data.current?.type === "doing") {
      const task = doing.find((task) => task.taskName === active.id);
      if (task) {
        setDoing((prev) => prev.filter((t) => t.taskName !== task.taskName));
        setTodos((prev) => [...prev, task]);
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
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
      <div className="Relative flex-colum ml-3  min-h-[30px] w-full col-span-2 divide-y divide-slate-200">
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
        <TaskColum id="todo" tasks={todos} title="To Do" />
        <div className="Static border-none col-span-12 min:h-[50px] pr-6">
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
        <div className={`mt-1 ${isAddTaskTable ? "" : "border-none"}`}>
          <span
            onClick={AddTask}
            className="border-none select-none cursor-pointer"
          >
            Add tasks...
          </span>
        </div>

        {/* To Do End */}

        {/* Doing Start */}
        <TaskColum id="doing" tasks={doing} title="Doing" />
        {/* Doing End */}
      </div>
    </DndContext>
  );
};

interface TaskColumnProps {
  id: string;
  tasks: Todo[];
  title: string;
}

export const TaskColum: React.FC<TaskColumnProps> = ({ id, tasks, title }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  const [isToDoExpand, setToDoExpand] = useState<boolean>(true);

  const parentRef = useRef(null);
  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, [parentRef]);

  const ExpandToDoTable = () => {
    setToDoExpand((prev) => !prev);
  };
  return (
    <div ref={setNodeRef} className="Static col-span-12 min:h-[50px] pr-6 ">
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
              className="size-6"
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
              className="size-6"
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
          {title}
        </span>
      </div>

      {isToDoExpand && (
        <div className="inline-block h-full w-full ">
          <div className={`  min:h-[50px] w-full`}>
            <ul ref={parentRef} className=" border divide-y font-poppins">
              {tasks.map((task, index) => (
                <TaskItem key={index} task={task} type={id} />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

interface TaskItemProps {
  task: Todo;
  type: string;
}
const TaskItem: React.FC<TaskItemProps> = ({ task, type }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.taskName,
      data: {
        type,
      },
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="min:h-[30px] w-full grid grid-cols-12 divide-x-2 p-1"
    >
      <span className="col-span-12 sm:col-span-3 flex items-center">
        {/* task icon */}
        {task.taskName}
      </span>
      <span className="hidden sm:flex col-span-3"></span>
      <span className="hidden sm:flex col-span-3"></span>
      <span className="hidden sm:flex col-span-3"></span>
    </li>
  );
};
