import { useEffect, useState } from "react";
import classes from "./EditInstallmentsModal.module.css";

function EditInstallmentsModal(props) {
  const [selectedCar, setSelectedCar] = useState(
    props.mode === "add" ? "" : props.car
  );
  const [selectedCustomer, setSelectedCustomer] = useState(
    props.mode === "add" ? "" : props.customer
  );
  const [openSelectedCarList, setOpenSelectedCarList] = useState(null);
  const [openSelectedCustomerList, setOpenSelectedCustomerList] =
    useState(null);
  const [payment, setPayment] = useState("cash");
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        props.onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [props]);

  const cars = [
    {
      brand: "toyota",
      model: "corolla",
      year: "2020",
      price: "900000",
      status: "available",
    },
    {
      brand: "toyota",
      model: "corolla",
      year: "2020",
      price: "900000",
      status: "available",
    },
    {
      brand: "toyota",
      model: "corolla",
      year: "2020",
      price: "900000",
      status: "available",
    },
    {
      brand: "toyota",
      model: "corolla",
      year: "2020",
      price: "900000",
      status: "available",
    },
    {
      brand: "toyota",
      model: "corolla",
      year: "2020",
      price: "900000",
      status: "available",
    },
    {
      brand: "toyota",
      model: "corolla",
      year: "2020",
      price: "900000",
      status: "available",
    },
  ];
  const customers = [
    {
      name: "ahmed samir abdelhamid elmiwalli",
      phone: "01555666666",
      id: "299660012125",
      address: "5 st. gedeelah mansoura",
    },
    {
      name: "ahmed samir abdelhamid elmiwalli",
      phone: "01555666666",
      id: "299660012125",
      address: "5 st. gedeelah mansoura",
    },
    {
      name: "ahmed samir abdelhamid elmiwalli",
      phone: "01555666666",
      id: "299660012125",
      address: "5 st. gedeelah mansoura",
    },
    {
      name: "ahmed samir abdelhamid elmiwalli",
      phone: "01555666666",
      id: "299660012125",
      address: "5 st. gedeelah mansoura",
    },
    {
      name: "ahmed samir abdelhamid elmiwalli",
      phone: "01555666666",
      id: "299660012125",
      address: "5 st. gedeelah mansoura",
    },
    {
      name: "ahmed samir abdelhamid elmiwalli",
      phone: "01555666666",
      id: "299660012125",
      address: "5 st. gedeelah mansoura",
    },
    {
      name: "ahmed samir abdelhamid elmiwalli",
      phone: "01555666666",
      id: "299660012125",
      address: "5 st. gedeelah mansoura",
    },
  ];

  const handleChangeCarList = (e) => {
    e.target.value.length === 0
      ? setOpenSelectedCarList(null)
      : setOpenSelectedCarList(true);
    setSelectedCar(e.target.value);
  };
  const handleChangeCustomerList = (e) => {
    e.target.value.length === 0
      ? setOpenSelectedCustomerList(null)
      : setOpenSelectedCustomerList(true);
    setSelectedCustomer(e.target.value);
  };

  return (
    <div onClick={props.onClose} className={classes.overlay}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setOpenSelectedCarList(false);
          setOpenSelectedCustomerList(false);
        }}
        className={classes.modalContainer}
      >
        <div className={classes.topModal}>
          <h3>{props.mode === "add" ? "add " : "Edit "}</h3>
          <div className={classes.closeIcon} onClick={() => props.onClose()}>
            X
          </div>
        </div>
        <form className={classes.form}>
          <div className={classes.inputContainer}>
            <span> Car</span>
            <input value={selectedCar.brand} onChange={handleChangeCarList} />
            {openSelectedCarList && (
              <div className={classes.carList}>
                {cars.map((car) => (
                  <div
                    key={car.id}
                    onClick={() => setSelectedCar(car)}
                    className={classes.option}
                  >
                    {car.brand}
                  </div>
                ))}
              </div>
            )}
            <div className={classes.carDataContainer}>
              <div className={classes.carData}>
                <span>brand</span>
                <input
                  className={classes.inputReadOnly}
                  value={selectedCar.brand || ""}
                  disabled
                />
              </div>
              <div className={classes.carData}>
                <span>model</span>
                <input
                  className={classes.inputReadOnly}
                  value={selectedCar.model || ""}
                  disabled
                />
              </div>
              <div className={classes.carData}>
                <span>Year</span>
                <input
                  className={classes.inputReadOnly}
                  value={selectedCar.year || ""}
                  disabled
                />
              </div>
              <div className={classes.carData}>
                <span>Price</span>
                <input
                  className={classes.inputReadOnly}
                  value={selectedCar.price || ""}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className={classes.inputContainer}>
            <span> Customer</span>
            <input
              value={selectedCustomer.name}
              onChange={handleChangeCustomerList}
            />
            {openSelectedCustomerList && (
              <div className={classes.carList}>
                {customers.map((customer) => (
                  <div
                    key={customer.id}
                    onClick={() => setSelectedCustomer(customer)}
                    className={classes.option}
                  >
                    {customer.name}
                  </div>
                ))}
              </div>
            )}
            <div className={classes.carDataContainer}>
              <div className={classes.carData}>
                <span>name</span>
                <input
                  className={classes.inputReadOnly}
                  value={selectedCustomer.name || ""}
                  disabled
                />
              </div>
              <div className={classes.carData}>
                <span>phone</span>
                <input
                  className={classes.inputReadOnly}
                  value={selectedCustomer.phone || ""}
                  disabled
                />
              </div>
              <div className={classes.carData}>
                <span>id</span>
                <input
                  className={classes.inputReadOnly}
                  value={selectedCustomer.id || ""}
                  disabled
                />
              </div>
              <div className={classes.carData}>
                <span>address</span>
                <input
                  className={classes.inputReadOnly}
                  value={selectedCustomer.address || ""}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className={classes.inputContainer}>
            {" "}
            <span> Price</span>
            <input type="number" />
          </div>
          <div className={classes.inputContainer}>
            <span>Payment</span>
            <div className={classes.paymentContainer}>
              <div className={classes.paymentInput}>
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={payment === "cash"}
                  onChange={(e) => setPayment(e.target.value)}
                />
                <label>Cash</label>
              </div>

              <div className={classes.paymentInput}>
                <input
                  type="radio"
                  name="payment"
                  value="credit"
                  checked={payment === "credit"}
                  onChange={(e) => setPayment(e.target.value)}
                />
                <label>Credit</label>
              </div>
            </div>
            {payment === "credit" && (
              <div className={classes.paymentInstallmentsContainer}>
                <div className={classes.paymentInstallments}>
                  <span>Down Payment</span>
                  <input type="number" />
                </div>
                <div className={classes.paymentInstallments}>
                  <span>Number of installments</span>
                  <input type="number" />
                </div>
                <div className={classes.paymentInstallments}>
                  <span>Installment value</span>
                  <input type="number" />
                </div>
              </div>
            )}
          </div>

          <div className={classes.modalBottom}>
            <button className={classes.button} onClick={() => props.onClose()}>
              Cancel
            </button>
            <button className={classes.button}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditInstallmentsModal;
