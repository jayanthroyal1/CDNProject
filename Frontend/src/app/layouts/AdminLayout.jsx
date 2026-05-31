import { Outlet, NavLink } from "react-router-dom";
import Header from "../../shared/components/Header";
import Footer from "../../shared/components/Footer";

const AdminLayout = () => (
  <div className="admin-layout layout">
    <Header />
    <div className="admin-content">
      <nav className="admin-sidebar glass">
        <ul>
          <li><NavLink to="/admin" end>Dashboard</NavLink></li>
          <li><NavLink to="/admin/profile">Profile</NavLink></li>
          <li><NavLink to="/admin/contact">Contacts</NavLink></li>
          <li><NavLink to="/admin/files">Files</NavLink></li>
          <li><NavLink to="/admin/reports">Reports</NavLink></li>
        </ul>
      </nav>
      <main className="admin-main glass">
        <Outlet />
      </main>
    </div>
    <Footer />
  </div>
);

export default AdminLayout;
