import { useState } from "react";
import classes from "./SupplierTable.module.css";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import EditSupplierModal from "./EditSupplierModal";
import DeleteModal from "./DeleteModal";

function SupplierTable(props) {
  const { suppliers } = props;

  const [open, setOpen] = useState(false);
  const [selectedSupplier, setSelectedSuppliers] = useState(null);

  return (
    <>
      <table className={classes.table}>
        <thead className={classes.tableHead}>
          <tr>
            <td className={classes.dateCol}>Name</td>
            <td className={classes.carNameCol}>Phone</td>
            <td className={classes.phoneNumCol}>Address</td>
            <td className={classes.editCol}>Actions</td>
          </tr>
        </thead>

        <tbody className={classes.tableBody}>
          {suppliers.map((supplier, index) => {
            return (
              <tr key={index}>
                <td>{supplier.name}</td>
                <td>{supplier.phone}</td>
                <td>{supplier.company}</td>
                <td className={classes.actionCell}>
                  <div
                    className={classes.actionIcon}
                    onClick={() => {
                      setSelectedSuppliers(supplier);
                      setOpen(true);
                    }}
                  >
                    <MdOutlineModeEdit />
                  </div>
                  <div>
                    <DeleteModal id={supplier.id} source="suppliers" />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {open && (
        <EditSupplierModal
          open={open}
          onClose={() => setOpen(false)}
          supplier={selectedSupplier}
          mode="edit"
        />
      )}
    </>
  );
}

export default SupplierTable;
