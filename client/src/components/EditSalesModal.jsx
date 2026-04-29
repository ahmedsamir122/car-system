import { useEffect, useState } from "react";
import classes from "./EditSalesModal.module.css";
import api from "../api/axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

function EditSalesModal(props) {
  const queryClient = useQueryClient();

  const [selectedCar, setSelectedCar] = useState(
    props.mode === "add" ? "" : props.car
  );
  const [selectedCustomer, setSelectedCustomer] = useState(
    props.mode === "add" ? "" : props.customer
  );
  const [selectedSale, setSelectedSale] = useState(
    props.mode === "add" ? "" : props.sale
  );
  const [openSelectedCarList, setOpenSelectedCarList] = useState(null);
  const [openSelectedCustomerList, setOpenSelectedCustomerList] =
    useState(null);
  const [payment, setPayment] = useState(
    props.mode === "edit" ? selectedSale?.paymentType : "cash"
  );
  const [carSearch, setCarSearch] = useState(
    props.mode === "add" ? "" : props.car.brand
  );
  const [customerSearch, setCustomerSearch] = useState(
    props.mode === "add" ? "" : props.customer.name
  );
  const [errors, setErrors] = useState({});

  const {
    handleSubmit,
    formState: { isValid },
  } = useForm({ mode: "onSubmit" });

  const mutateFu = (data) => {
    if (props.mode === "add") {
      return api.post("/sales", data);
    }
    if (props.mode === "edit") {
      return api.patch(`/sales/${props.sale._id}`, data);
    }
  };

  const { mutate, error, isError } = useMutation({
    mutationFn: mutateFu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      props.onClose();
    },
  });

  const onsubmit = async (data) => {
    const newErrors = {};

    if (!selectedCar?._id) newErrors.car = "please choose a car";
    if (!selectedCustomer?._id) newErrors.customer = "please choose a customer";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;
    mutate({
      car: selectedCar._id,
      customer: selectedCustomer._id,
      price: selectedCar.price,
      paymentType: payment,
    });
  };
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

  const { data: carsData } = useQuery({
    queryKey: ["cars", selectedCar],
    queryFn: ({ queryKey }) => {
      const [, search] = queryKey;
      return api.get(`/cars?brand=${search}&status=available`);
    },
    enabled: selectedCar.length > 0,
  });
  const { data: customersData } = useQuery({
    queryKey: ["customers", selectedCustomer],
    queryFn: ({ queryKey }) => {
      const [, search] = queryKey;
      return api.get(`/customers?name=${search}`);
    },
    enabled: selectedCustomer.length > 0,
  });

  const handleChangeCarList = (e) => {
    e.target.value.length === 0
      ? setOpenSelectedCarList(null)
      : setOpenSelectedCarList(true);
    setCarSearch(e.target.value);
    setSelectedCar(e.target.value);
  };
  const handleChangeCustomerList = (e) => {
    e.target.value.length === 0
      ? setOpenSelectedCustomerList(null)
      : setOpenSelectedCustomerList(true);
    setCustomerSearch(e.target.value);
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
        <form className={classes.form} onSubmit={handleSubmit(onsubmit)}>
          <div className={classes.inputContainer}>
            <span> Car</span>
            <input value={carSearch} onChange={handleChangeCarList} />

            {openSelectedCarList && carsData?.data.data.data.length > 0 && (
              <div className={classes.carList}>
                {carsData?.data.data.data.map((car) => (
                  <div
                    key={car.id}
                    onClick={() => {
                      setSelectedCar(car);
                      setCarSearch(car.brand);
                    }}
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
          {errors.car && <p className={classes.error}>{errors.car}</p>}
          <div className={classes.inputContainer}>
            <span> Customer</span>
            <input
              value={selectedCustomer.name}
              onChange={handleChangeCustomerList}
            />
            {openSelectedCustomerList &&
              customersData?.data.data.data.length > 0 && (
                <div className={classes.carList}>
                  {customersData?.data.data.data.map((customer) => (
                    <div
                      key={customer.id}
                      onClick={() => {
                        setSelectedCustomer(customer);
                        setCustomerSearch(customer.name);
                      }}
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
                  value={selectedCustomer.ID || ""}
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

          {/* <div className={classes.inputContainer}>
            {" "}
            <span> Price</span>
            <input type="number" value={selectedCar.price || ""} />
          </div> */}
          {errors.customer && (
            <p className={classes.error}>{errors.customer}</p>
          )}
          <div className={classes.inputContainer}>
            <span>Payment</span>
            <div className={classes.paymentContainer}>
              <div className={classes.paymentInput}>
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={"cash" === payment}
                  onChange={(e) => setPayment(e.target.value)}
                />
                <label>Cash</label>
              </div>

              <div className={classes.paymentInput}>
                <input
                  type="radio"
                  name="payment"
                  value="credit"
                  checked={"credit" === payment}
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

export default EditSalesModal;
