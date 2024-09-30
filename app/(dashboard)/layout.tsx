import DashboardNav from "../components/Navbar/DashboardNav";

interface Props {
    children: React.ReactNode;
  }
  
  export default function DashBoardLayout({ children }: Props) {
    return (
      <div> 
        <DashboardNav/>
         {children}
         </div>
        
    );
  }