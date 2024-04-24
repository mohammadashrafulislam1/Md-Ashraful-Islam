

const Navigation = () => {
    const navbar =<>
      <a href="#"><li className="hover:text-white">Home</li></a>
      <a href="#"><li className="hover:text-white">About</li>
      </a>        
      <a href="#"><li className="hover:text-white">Projects</li></a>
      <a href="#"><li className="hover:text-white">Contact</li></a>
    </>
    return (
        <div className="navbar">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="text-white lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="dropdown-content mt-3 z-[1] p-2 shadow bg-[#0f0f0f00] rounded-box w-52 text-[#ffffff] border border-black bg-black">
        {navbar}
      </ul>
    </div>
    <a className="btn btn-ghost normal-case text-xl text-white">Md Ashraf</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 text-[#777777] flex gap-10">
      {navbar}
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn background-blur-sm btn-[#000]">Download Resume</a>
  </div>
</div>
    );
};

export default Navigation;