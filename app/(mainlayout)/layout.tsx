import Navbar from "../components/Navbar/Navbar";


interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div>
        <Navbar/>
      {children}
      
    </div>
  );
}
