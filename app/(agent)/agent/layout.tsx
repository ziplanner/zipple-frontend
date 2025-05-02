"use client";

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex w-full gap-10 md:gap-0 flex-col md:flex-row
  max-w-screen-xl2 justify-self-center md:px-4 lx:px-20"
    >
      {children}
    </div>
  );
}
