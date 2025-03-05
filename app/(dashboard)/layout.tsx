import DashboardNav from "../components/Navbar/DashboardNav";
import SideNav from "../components/Navbar/SideNav";

interface Props {
    children: React.ReactNode;
  }
  
  export default function DashBoardLayout({ children }: Props) {
    return (
      <div className="flex">
      
  
        <div>
          <SideNav />
        </div>
  
         
          <div className="flex flex-col flex-grow">
            <DashboardNav />
          <div className=" ps-8 w-full mx-auto overflow-auto">
            {children}
          </div>
        </div>
      {/* )} */}
     
    
    </div>
        
    );
  }