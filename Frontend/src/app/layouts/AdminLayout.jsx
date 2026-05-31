import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      <aside>Admin Menu</aside>
      <section>
        <Outlet />
      </section>
    </div>
  );
};

export default AdminLayout;
