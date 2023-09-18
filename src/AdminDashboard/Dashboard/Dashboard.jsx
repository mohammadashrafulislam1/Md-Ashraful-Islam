import { Link, Outlet } from "react-router-dom";


const Dashboard = () => {
  const upNavLink= <>
  <li><Link to="/dashboard">Dashboard</Link></li>
  <li className="mt-2"><Link to="/dashboard/projectsubmit">Project Submit</Link></li>
  <li className="mt-2"><Link to="/dashboard/projectlist">Project List</Link></li>
  </>
  const downNavLink =<>
  <li><Link to="/">Home</Link></li>
  </>
    return (
    <div className="md:flex gap-10">
         <div className="lg:drawer-open w-full md:w-1/4">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center md:pt-0 pt-5">
          {/* Page content here */}
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
        
        </div> 
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
          <ul className="menu p-4 w-80 h-full bg-[#cbdccb] text-base-content text-xl">
            {/* Sidebar content here */}
            {upNavLink}
          <div className="divider"></div>
          {downNavLink}
          </ul>
          
          <ul className="menu p-4 w-80 h-full bg-[#cbdccb] text-base-content">
            {/* Sidebar content here */}
            {upNavLink}
          <div className="divider"></div>
            {downNavLink}
          </ul>

        
        </div>
      </div>
      <div className="md:w-3/4 mr-10 w-full"><Outlet></Outlet>
      </div>
    </div>
    );
};

export default Dashboard;