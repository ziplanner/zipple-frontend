interface TableDataProps {
  data: any[];
}

const Table = ({ data }: TableDataProps) => {
  return (
    <div className="overflow-x-auto custom-scrollbar rounded-[10px] border border-line-light">
      <table className="min-w-full text-center table-fixed">
        <thead className="bg-background-extraSoft text-text-primary text-18r">
          <tr>
            <th className="px-6 py-2.5 w-[20%]">이름</th>
            <th className="px-6 py-2.5 w-[20%]">생년월일</th>
            <th className="px-6 py-2.5 w-[20%]">번호</th>
            <th className="px-6 py-2.5 w-[20%]">승인 상태</th>
            <th className="px-6 py-2.5 w-[20%]">소속</th>
          </tr>
        </thead>
      </table>
      <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
        <table className="min-w-full text-center table-fixed">
          <tbody className="text-18r text-text-secondary">
            {data.map((row, idx) => (
              <tr key={idx} className="">
                <td className="px-6 py-4 w-[20%]">{row.name}</td>
                <td className="px-6 py-4 w-[20%]">{row.birth}</td>
                <td className="px-6 py-4 w-[20%]">{row.phone}</td>
                <td className={`px-6 py-4 w-[20%] ${row.statusColor}`}>
                  {row.status}
                </td>
                <td
                  className="px-6 py-4 w-[20%] underline cursor-pointer"
                  onClick={() => {
                    alert("소속 해제");
                  }}
                >
                  {row.affiliation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
