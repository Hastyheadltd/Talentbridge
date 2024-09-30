interface Props {
    children: React.ReactNode;
  }
  
  export default function DashBoardLayout({ children }: Props) {
    return (
      <div> 
         {children}
         </div>
        
    );
  }