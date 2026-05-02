import { useEffect } from "react";
import classes from "./EditCarModal.module.css";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

function EditCarModal(props) {
  const queryClient = useQueryClient();
  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm({ mode: "onSubmit" });

  const mutateFu = (data) => {
    if (props.mode === "add") {
      return api.post("/cars", data);
    }
    if (props.mode === "edit") {
      return api.patch(`/cars/${props.car._id}`, data);
    }
  };

  const { mutate, error, isError } = useMutation({
    mutationFn: mutateFu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      props.onClose();
    },
  });

  const onsubmit = async (data) => {
    const [brand, model, year, price, status] = getValues([
      "brand",
      "model",
      "year",
      "price",
      "status",
    ]);
    console.log(brand, model, year, price, status);
    mutate(data);
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

  return (
    <div onClick={props.onClose} className={classes.overlay}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={classes.modalContainer}
      >
        <div className={classes.topModal}>
          <h3>{props.mode === "add" ? "add Car" : "Edit Car"}</h3>
          <div className={classes.closeIcon} onClick={() => props.onClose()}>
            X
          </div>
        </div>
        <form className={classes.form} onSubmit={handleSubmit(onsubmit)}>
          <div className={classes.inputContainer}>
            <span> Brand</span>
            <input
              defaultValue={props.mode === "add" ? "" : props.car?.brand}
              {...register("brand", { required: true })}
            />
          </div>
          {errors.brand?.type === "required" && (
            <p className={classes.error}>please enter the brand</p>
          )}
          <div className={classes.inputContainer}>
            <span> Model</span>
            <input
              defaultValue={props.mode === "add" ? "" : props.car?.model}
              {...register("model", { required: true })}
            />
          </div>
          {errors.model?.type === "required" && (
            <p className={classes.error}>please enter the model</p>
          )}

          <div className={classes.inputContainer}>
            <span>Year</span>
            <input
              type="number"
              defaultValue={props.mode === "add" ? "" : props.car?.year}
              {...register("year", { required: true })}
            />
          </div>
          {errors.year?.type === "required" && (
            <p className={classes.error}>please enter the year</p>
          )}
          <div className={classes.inputContainer}>
            <span>Price</span>
            <input
              type="number"
              defaultValue={props.mode === "add" ? "" : props.car?.price}
              {...register("price", { required: true })}
            />
          </div>
          {errors.price?.type === "required" && (
            <p className={classes.error}>please enter the price</p>
          )}
          <div className={classes.inputContainer}>
            <span>Status</span>
            <select
              name="status"
              id="status-select"
              defaultValue={
                props.mode === "add" ? "available" : props.car?.status
              }
              {...register("status", { required: true })}
            >
              <option value="available">available</option>
              <option value="sold">sold</option>
            </select>
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

export default EditCarModal;
