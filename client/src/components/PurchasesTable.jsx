import { useState } from "react";
import classes from "./PurchasesTable.module.css";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import EditCustomerModal from "./EditCustomerModal";
import EditSalesModal from "./EditSalesModal";
import EditPurchasesModal from "./EditPurchasesModal";
import DeleteModal from "./DeleteModal";

function PurchasesTable(props) {
  const { purchases } = props;

  const [open, setOpen] = useState(false);
  const [selectedSuppliers, setSelectedSuppliers] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  return (
    <>
      <table className={classes.table}>
        <thead className={classes.tableHead}>
          <tr>
            <td className={classes.dateCol}>Car</td>
            <td className={classes.carNameCol}>Supplier</td>
            <td className={classes.customerCol}>Price</td>
            <td className={classes.editCol}>Actions</td>
          </tr>
        </thead>

        <tbody className={classes.tableBody}>
          {purchases.map((purchase, index) => {
            return (
              <tr key={index}>
                <td>{purchase.car.brand}</td>
                <td>{purchase.supplier.name}</td>
                <td>{purchase.price}</td>
                <td className={classes.actionCell}>
                  <div
                    className={classes.actionIcon}
                    onClick={() => {
                      setSelectedSuppliers(purchase.supplier);
                      setSelectedCar(purchase.car);
                      setSelectedPurchase(purchase);

                      setOpen(true);
                    }}
                  >
                    <MdOutlineModeEdit />
                  </div>
                  <div>
                    <DeleteModal id={purchase._id} source="purchases" />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {open && (
        <EditPurchasesModal
          open={open}
          onClose={() => setOpen(false)}
          supplier={selectedSuppliers}
          car={selectedCar}
          purchase={selectedPurchase}
          mode="edit"
        />
      )}
    </>
  );
}

export default PurchasesTable;
