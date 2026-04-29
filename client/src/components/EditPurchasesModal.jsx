import { useEffect, useState } from "react";
import classes from "./EditPurchasesModal.module.css";
import api from "../api/axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

function EditPurchasesModal(props) {
  const queryClient = useQueryClient();

  const [selectedCar, setSelectedCar] = useState(
    props.mode === "add" ? "" : props.car
  );
  const [selectedSupplier, setSelectedSupplier] = useState(
    props.mode === "add" ? "" : props.supplier
  );
  const [selectedPurchase, setSelectedPurchase] = useState(
    props.mode === "add" ? "" : props.purchase
  );
  const [openSelectedCarList, setOpenSelectedCarList] = useState(null);
  const [openSelectedSupplierList, setOpenSelectedSupplierList] =
    useState(null);
  const [payment, setPayment] = useState(
    props.mode === "edit" ? selectedPurchase?.paymentType : "cash"
  );
  const [carSearch, setCarSearch] = useState(
    props.mode === "add" ? "" : props.car.brand
  );
  const [supplierSearch, setSupplierSearch] = useState(
    props.mode === "add" ? "" : props.supplier.name
  );
  const [errors, setErrors] = useState({});

  const {
    handleSubmit,
    formState: { isValid },
  } = useForm({ mode: "onSubmit" });

  const mutateFu = (data) => {
    if (props.mode === "add") {
      return api.post("/purchases", data);
    }
    if (props.mode === "edit") {
      return api.patch(`/purchases/${props.purchase._id}`, data);
    }
  };

  const { mutate, error, isError } = useMutation({
    mutationFn: mutateFu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
      props.onClose();
    },
  });

  const onsubmit = async (data) => {
    const newErrors = {};

    if (!selectedCar?._id) newErrors.car = "please choose a car";
    if (!selectedSupplier?._id) newErrors.customer = "please choose a supplier";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;
    console.log({
      car: selectedCar._id,
      supplier: selectedSupplier._id,
      price: selectedCar.price,
    });
    mutate({
      car: selectedCar._id,
      supplier: selectedSupplier._id,
      price: selectedCar.price,
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
      return api.get(`/cars?brand=${search}`);
    },
    enabled: selectedCar.length > 0,
  });
  const { data: suppliersData } = useQuery({
    queryKey: ["suppliers", selectedSupplier],
    queryFn: ({ queryKey }) => {
      const [, search] = queryKey;
      return api.get(`/suppliers?name=${search}`);
    },
    enabled: selectedSupplier.length > 0,
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
      ? setOpenSelectedSupplierList(null)
      : setOpenSelectedSupplierList(true);
    setSupplierSearch(e.target.value);

    setSelectedSupplier(e.target.value);
  };

  return (
    <div onClick={props.onClose} className={classes.overlay}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setOpenSelectedCarList(false);
          setOpenSelectedSupplierList(false);
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
          <div className={classes.inputContainer}>
            <span> Supplier</span>
            <input
              value={selectedSupplier.name}
              onChange={handleChangeCustomerList}
            />
            {openSelectedSupplierList && (
              <div className={classes.carList}>
                {suppliersData?.data.data.data.map((supplier) => (
                  <div
                    key={supplier.id}
                    onClick={() => {
                      setSelectedSupplier(supplier);
                      setSupplierSearch(supplier.name);
                    }}
                    className={classes.option}
                  >
                    {supplier.name}
                  </div>
                ))}
              </div>
            )}
            <div className={classes.carDataContainer}>
              <div className={classes.carData}>
                <span>name</span>
                <input
                  className={classes.inputReadOnly}
                  value={selectedSupplier.name || ""}
                  disabled
                />
              </div>
              <div className={classes.carData}>
                <span>phone</span>
                <input
                  className={classes.inputReadOnly}
                  value={selectedSupplier.phone || ""}
                  disabled
                />
              </div>

              <div className={classes.carData}>
                <span>address</span>
                <input
                  className={classes.inputReadOnly}
                  value={selectedSupplier.company || ""}
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

export default EditPurchasesModal;
