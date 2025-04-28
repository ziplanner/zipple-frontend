const NavMenu = () => {
  const menus = [
    "중개사매칭",
    "생활서비스",
    "집플래너",
    "커뮤니티",
    "고객안내",
  ];

  return (
    <nav className="flex lg:space-x-10 md:space-x-5">
      {menus.map((menu) => (
        <span
          key={menu}
          className={`cursor-pointer text-text-primary hover:text-main 
            lg:text-18m md:text-14m`}
        >
          {menu}
        </span>
      ))}
    </nav>
  );
};

export default NavMenu;
