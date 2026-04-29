import { useState } from "react";
import classes from "./CarTable.module.css";
import EditCarModal from "./EditCarModal";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import DeleteModal from "./DeleteModal";

function CarTable(props) {
  const [open, setOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const { cars } = props;

  return (
    <>
      <table className={classes.table}>
        <thead className={classes.tableHead}>
          <tr>
            <td className={classes.dateCol}>Brand</td>
            <td className={classes.carNameCol}>Model</td>
            <td className={classes.customerCol}>Year</td>
            <td className={classes.phoneNumCol}>Price</td>
            <td className={classes.priceCol}>Status</td>
            <td className={classes.editCol}>Actions</td>
          </tr>
        </thead>

        <tbody className={classes.tableBody}>
          {cars.map((car, index) => {
            return (
              <tr key={index}>
                <td>{car.brand}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>{car.price}</td>
                <td>{car.status}</td>
                <td className={classes.actionCell}>
                  <div
                    className={classes.actionIcon}
                    onClick={() => {
                      setSelectedCar(car);
                      setOpen(true);
                    }}
                  >
                    <MdOutlineModeEdit />
                  </div>
                  <div>
                    <DeleteModal id={car.id} source="cars" />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {open && (
        <EditCarModal
          open={open}
          car={selectedCar}
          onClose={() => setOpen(false)}
          mode="edit"
        />
      )}
    </>
  );
}

export default CarTable;
