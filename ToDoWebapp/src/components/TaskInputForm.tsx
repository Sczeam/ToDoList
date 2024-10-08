interface TaskInputFormProps {
  todo: string;
  isAddTaskTable: boolean;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => void;
  addTask: () => void;
}

export const TaskInputForm: React.FC<TaskInputFormProps> = ({
  todo,
  isAddTaskTable,
  setTodo,
  handleSubmit,
  addTask,
}) => {
  return (
    <div className="Static border-none col-span-12 min:h-[50px] pr-6">
      {isAddTaskTable && (
        <form onSubmit={handleSubmit}>
          <div className="border min:h-[30px] w-full grid grid-cols-12 divide-x-2">
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

      <div className={`mt-1 ${isAddTaskTable ? "" : "border-none"}`}>
        <span
          className="border-none select-none cursor-pointer"
          onClick={addTask}
        >
          Add tasks...
        </span>
      </div>
    </div>
  );
};
