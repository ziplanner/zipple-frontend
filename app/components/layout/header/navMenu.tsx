import { usePathname, useRouter } from "next/navigation";

const menus = [
  { label: "중개사매칭", url: "/agent" },
  { label: "생활서비스", url: "/service" },
  { label: "집플래너", url: "/planner" },
  { label: "커뮤니티", url: "/community" },
  { label: "고객안내", url: "/help" },
];

const NavMenu = () => {
  const router = useRouter();
  const pathnmame = usePathname();

  return (
    <nav className="flex lg:space-x-10 md:space-x-5">
      {menus.map((menu) => (
        <span
          key={menu.label}
          className={`cursor-pointer hover:text-main 
            lg:text-18m md:text-14m ${
              pathnmame === menu.url ? "text-main" : "text-text-primary"
            }`}
          onClick={() => {
            router.push(menu.url);
          }}
        >
          {menu.label}
        </span>
      ))}
    </nav>
  );
};

export default NavMenu;
