interface TabProps {
  activeTab: string;
  setActiveTab: (val: string) => void;
  setActiveData: (val: any[]) => void;
  tabs: { name: string; counts: number,data:any[] }[];
}
const TabsNavigation = ({ activeTab, setActiveTab, tabs,setActiveData }: TabProps) => {
  return (
    <div className="flex gap-3 text-sm my-3">
      {tabs.map((tab,index:number) => (
        <p
          className={
            activeTab == tab.name
              ? "border-b-2 rounded-sm  border-blue-600 text-blue-600"
              : "hover:cursor-pointer p-1"
          }
          onClick={() =>{setActiveTab(tab.name)
            setActiveData(tab.data)
          }}
          key={index}
        >
          <span>{tab.name}</span>
          <span
            className={`px-2 py-[1px] ${
              activeTab == tab.name
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            } rounded-lg ml-2  text-xs`}
          >
            {tab.counts}
          </span>
        </p>
      ))}
    </div>
  );
};
export default TabsNavigation;
