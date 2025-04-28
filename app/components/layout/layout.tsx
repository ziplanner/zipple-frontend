import Footer from "./footer";
import Header from "./header/header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 mt-[74px] px-[15px] md:px-0">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
