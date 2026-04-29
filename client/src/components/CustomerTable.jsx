import { useState } from "react";
import classes from "./CustomerTable.module.css";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import EditCustomerModal from "./EditCustomerModal";
import DeleteModal from "./DeleteModal";

function CustomerTable(props) {
  const { customers } = props;

  const [open, setOpen] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState(null);

  return (
    <>
      <table className={classes.table}>
        <thead className={classes.tableHead}>
          <tr>
            <td className={classes.dateCol}>Name</td>
            <td className={classes.carNameCol}>Phone</td>
            <td className={classes.customerCol}>ID</td>
            <td className={classes.phoneNumCol}>Address</td>
            <td className={classes.editCol}>Actions</td>
          </tr>
        </thead>

        <tbody className={classes.tableBody}>
          {customers.map((customer, index) => {
            return (
              <tr key={index}>
                <td>{customer.name}</td>
                <td>{customer.phone}</td>
                <td>{customer.ID}</td>
                <td>{customer.address}</td>
                <td className={classes.actionCell}>
                  <div
                    className={classes.actionIcon}
                    onClick={() => {
                      setSelectedCustomers(customer);
                      setOpen(true);
                    }}
                  >
                    <MdOutlineModeEdit />
                  </div>
                  <div>
                    <DeleteModal id={customer.id} source="customers" />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {open && (
        <EditCustomerModal
          open={open}
          onClose={() => setOpen(false)}
          customer={selectedCustomers}
          mode="edit"
        />
      )}
    </>
  );
}

export default CustomerTable;
