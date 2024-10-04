interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
}
interface SidebarProps {
  children: React.ReactNode;
  isSidebarExpanded: boolean;
}
export const Sidebar: React.FC<SidebarProps> = ({
  children,
  isSidebarExpanded,
}) => {
  return (
    <aside
      className={`h-screen sm:w-[250px] transition-all duration-300 ${
        isSidebarExpanded ? "left-0" : "-left-full"
      } absolute`}
    >
      <nav className=" h-full flex flex-col bg-gray-700 border-r shadow-sm">
        <ul className="flex-1 px-3">{children}</ul>
        <div className="gap-1 border-t p-3 grid grid-cols-1 justify-items-center">
          <button className="inline-flex h-full border border-white rounded p-1 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="mr-1 size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            Invite Teammates
          </button>

          <span className="text-white">Help with ToDoWebapp</span>
        </div>
      </nav>
    </aside>
  );
};

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  text,
  active,
  alert,
}) => {
  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer 
        transition-colors transition-colors ${
          active ? "bg-gray-500" : "hover:bg-gray-500"
        }`}
    >
      {icon}
      <span className="text-white w-52 ml-3">{text}</span>
      {alert && (
        <div className={`absolute right-2 w-2 h-2 rounded bg-amber-400`} />
      )}
    </li>
  );
};
