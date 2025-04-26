const NavMenu = () => {
  const menus = [
    "중개사매칭",
    "생활서비스",
    "집플래너",
    "커뮤니티",
    "고객안내",
  ];

  return (
    <nav className="flex space-x-12">
      {menus.map((menu) => (
        <span
          key={menu}
          className={`cursor-pointer text-text-primary hover:text-main text-18m`}
        >
          {menu}
        </span>
      ))}
    </nav>
  );
};

export default NavMenu;
