import { Outlet } from "react-router-dom";
import Header from "../../shared/components/Header";
import Footer from "../../shared/components/Footer";

const MainLayout = () => (
  <div className="layout">
    <Header />
    <main className="content">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default MainLayout;
