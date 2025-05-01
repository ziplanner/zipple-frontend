interface TableDataProps {
  data: any[];
}

const TableCard = ({ data }: TableDataProps) => {
  return (
    <div className="space-y-4">
      {data.map((row, idx) => (
        <div
          key={idx}
          className="border border-line-light rounded-[10px] overflow-hidden"
        >
          <div className="flex">
            <div
              className="bg-background-extraSoft w-[35%] text-center px-4 py-3
            text-16r space-y-2 text-text-primary"
            >
              <div>이름</div>
              <div>생년월일</div>
              <div>번호</div>
              <div>승인 상태</div>
              <div>소속</div>
            </div>
            <div
              className="w-[65%] text-center px-4 py-3 text-16r space-y-2
            text-text-secondary"
            >
              <div>{row.name}</div>
              <div>{row.birth}</div>
              <div>{row.phone}</div>
              <div className={`text-16m ${row.statusColor}`}>{row.status}</div>
              <div
                className="underline text-15r text-text-secondary cursor-pointer"
                onClick={() => alert("소속 해제")}
              >
                {row.affiliation}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableCard;
