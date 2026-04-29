import classes from "./Expenses.module.css";
import { useState } from "react";
import EditExpensesModal from "../components/EditExpensesModal";
import ExpensesTable from "../components/ExpensesTable";
import EditInstallmentsModal from "../components/EditInstallmentsModal";
import InstallmentsTable from "../components/InstallmentsTable";

function Installments() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className={classes.topCars}>
        <div className={classes.searchContainer}>
          <button className={classes.searchButton}>Search</button>
          <input className={classes.carSearch} />
        </div>
        <div className={classes.addCarButton} onClick={() => setOpen(true)}>
          new installment
        </div>
        {open && (
          <EditInstallmentsModal
            open={open}
            onClose={() => setOpen(false)}
            mode="add"
          />
        )}
      </div>
      <InstallmentsTable />{" "}
    </div>
  );
}

export default Installments;
