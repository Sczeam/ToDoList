interface SidebarItemProps {
  icon: React.ReactNode; // This can be any valid JSX element (like an icon component)
  text: string; // Text for the sidebar item
  active?: boolean; // Optional prop for active state
  alert?: boolean; // Optional prop for alert state
}
interface SidebarProps {
  children: React.ReactNode;
}
export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <aside className="h-screen sm:w-[250px]">
      <nav className="h-full flex flex-col bg-gray-700 border-r shadow-sm">
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
      className={
        "relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors ${active ?:}"
      }
    >
      {icon}
      <span>{text}</span>
    </li>
  );
};
