interface ButtonProps {
  onClick: () => void;
}

const PortfolioBtn = ({ onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-5 md:bottom-20 md:right-10
          z-50 bg-main shadow-lg rounded-full py-3.5 px-9 md:py-4 md:px-10"
    >
      <p className="text-white text-16s md:text-18s">
        + &nbsp; 포토폴리오 등록
      </p>
    </button>
  );
};

export default PortfolioBtn;
