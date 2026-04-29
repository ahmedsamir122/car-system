import { useState } from "react";
import classes from "./InstallmentsTable.module.css";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import EditExpensesModal from "./EditExpensesModal";

function InstallmentsTable() {
  const bills = [
    {
      type: "ahmed samir abdelhamid elmiwalli",
      date: "04/05/2026",
      supplier: "adel mansour company",
      amount: "500000",
    },
    {
      type: "ahmed samir abdelhamid elmiwalli",
      date: "04/05/2026",
      supplier: "adel mansour company",
      amount: "500000",
    },
    {
      type: "ahmed samir abdelhamid elmiwalli",
      date: "04/05/2026",
      supplier: "adel mansour company",
      amount: "500000",
    },
    {
      type: "ahmed samir abdelhamid elmiwalli",
      date: "04/05/2026",
      supplier: "adel mansour company",
      amount: "500000",
    },
    {
      type: "ahmed samir abdelhamid elmiwalli",
      date: "04/05/2026",
      supplier: "adel mansour company",
      amount: "500000",
    },
    {
      type: "ahmed samir abdelhamid elmiwalli",
      date: "04/05/2026",
      supplier: "adel mansour company",
      amount: "500000",
    },
    {
      type: "ahmed samir abdelhamid elmiwalli",
      date: "04/05/2026",
      supplier: "adel mansour company",
      amount: "500000",
    },
  ];

  const [open, setOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  return (
    <>
      <table className={classes.table}>
        <thead className={classes.tableHead}>
          <tr>
            <td className={classes.dateCol}>Type</td>
            <td className={classes.carNameCol}>Date</td>
            <td className={classes.phoneNumCol}>supplier</td>
            <td className={classes.customerCol}>Amount</td>
            <td className={classes.editCol}>Actions</td>
          </tr>
        </thead>

        <tbody className={classes.tableBody}>
          {bills.map((bill, index) => {
            return (
              <tr key={index}>
                <td>{bill.type}</td>
                <td>{bill.date}</td>
                <td>{bill.supplier}</td>
                <td>{bill.amount}</td>
                <td className={classes.actionCell}>
                  <div
                    className={classes.actionIcon}
                    onClick={() => {
                      setSelectedBill(bill);
                      setOpen(true);
                    }}
                  >
                    <MdOutlineModeEdit />
                  </div>
                  <div
                    className={classes.actionIcon}
                    onClick={() => {
                      setSelectedBill(bill);
                      setOpen(true);
                    }}
                  >
                    <MdDeleteOutline />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {open && (
        <EditExpensesModal
          open={open}
          onClose={() => setOpen(false)}
          bill={selectedBill}
          mode="edit"
        />
      )}
    </>
  );
}

export default InstallmentsTable;
