import { useState } from "react";
import DisassociationModal from "../modal/disassociationModal";
import AlertMessage from "../alert/alertMessage";

interface TableDataProps {
  data: any[];
}

const TableCard = ({ data }: TableDataProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

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
                onClick={() => {
                  setOpen(true);
                }}
              >
                {row.affiliation}
              </div>
            </div>
          </div>
        </div>
      ))}
      {open && (
        <DisassociationModal
          onClose={() => {
            setOpen(false);
          }}
          onSubmit={() => {
            setOpen(false);
            setShowAlert(true);
          }}
        />
      )}
      {showAlert && (
        <AlertMessage
          text="해제 되었습니다!"
          onClose={() => {
            setShowAlert(false);
          }}
        />
      )}
    </div>
  );
};

export default TableCard;
