"use client";

export default function ServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex w-full gap-10 md:gap-0 flex-col md:flex-row
  max-w-screen-xl2 justify-self-center px-[15px] lx:px-20"
    >
      {children}
    </div>
  );
}
