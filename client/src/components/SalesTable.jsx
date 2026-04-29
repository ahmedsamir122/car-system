import { useState } from "react";
import classes from "./SalesTable.module.css";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import EditCustomerModal from "./EditCustomerModal";
import EditSalesModal from "./EditSalesModal";
import DeleteModal from "./DeleteModal";

function SalesTable(props) {
  const { sales } = props;

  const [open, setOpen] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedSale, setSelectedSale] = useState(null);
  console.log(selectedSale, sales, selectedCar, selectedCustomers);
  console.log(sales);
  return (
    <>
      <table className={classes.table}>
        <thead className={classes.tableHead}>
          <tr>
            <td className={classes.dateCol}>Car</td>
            <td className={classes.carNameCol}>Customer</td>
            <td className={classes.customerCol}>Price</td>
            <td className={classes.phoneNumCol}>Payment</td>
            <td className={classes.editCol}>Actions</td>
          </tr>
        </thead>

        <tbody className={classes.tableBody}>
          {sales.map((sale, index) => {
            return (
              <tr key={index}>
                <td>{sale.car.brand}</td>
                <td>{sale.customer.name}</td>
                <td>{sale.price}</td>
                <td>{sale.paymentType}</td>
                <td className={classes.actionCell}>
                  <div
                    className={classes.actionIcon}
                    onClick={() => {
                      setSelectedCustomers(sale.customer);
                      setSelectedCar(sale.car);
                      setSelectedSale(sale);

                      setOpen(true);
                    }}
                  >
                    <MdOutlineModeEdit />
                  </div>
                  <div>
                    <DeleteModal id={sale._id} source="sales" />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {open && (
        <EditSalesModal
          open={open}
          onClose={() => setOpen(false)}
          customer={selectedCustomers}
          car={selectedCar}
          sale={selectedSale}
          mode="edit"
        />
      )}
    </>
  );
}

export default SalesTable;
