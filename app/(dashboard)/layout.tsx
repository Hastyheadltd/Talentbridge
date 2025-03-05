import DashboardNav from "../components/Navbar/DashboardNav";
import SideNav from "../components/Navbar/SideNav";

interface Props {
    children: React.ReactNode;
  }
  
  export default function DashBoardLayout({ children }: Props) {
    return (
      <div className="flex">
      
      {/* {isAuthenticated && ( */}
        <div>
          <SideNav />
        </div>
      {/* )} */}
            {/* {isAuthenticated && ( */}
          <div className="flex flex-col flex-grow">
            <DashboardNav />
          <div className="flex-grow lg:p-4 p-2 w-full mx-auto overflow-auto">
            {children}
          </div>
        </div>
      {/* )} */}
     
    
    </div>
        
    );
  }