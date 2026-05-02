import { useEffect, useState } from "react";
import classes from "./EditExpensesModal.module.css";
import api from "../api/axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

function EditExpensesModal(props) {
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
      return api.post("/expenses", data);
    }
    if (props.mode === "edit") {
      return api.patch(`/expenses/${props.bill._id}`, data);
    }
  };

  const { mutate, error, isError } = useMutation({
    mutationFn: mutateFu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      props.onClose();
    },
  });

  const onsubmit = async (data) => {
    const [type, date, amount] = getValues(["type", "date", "amount"]);
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

  const formatDate = (date) => {
    return date ? new Date(date).toISOString().split("T")[0] : "";
  };

  return (
    <div onClick={props.onClose} className={classes.overlay}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={classes.modalContainer}
      >
        <div className={classes.topModal}>
          <h3>{props.mode === "add" ? "add bill" : "Edit bill"}</h3>
          <div className={classes.closeIcon} onClick={() => props.onClose()}>
            X
          </div>
        </div>
        <form className={classes.form} onSubmit={handleSubmit(onsubmit)}>
          <div className={classes.inputContainer}>
            <span> Type</span>
            <input
              defaultValue={props.mode === "add" ? "" : props.bill?.type}
              {...register("type", { required: true })}
            />
          </div>
          {errors.type?.type === "required" && (
            <p className={classes.error}>please enter the type</p>
          )}
          <div className={classes.inputContainer}>
            <span> Date</span>
            <input
              type="date"
              defaultValue={
                props.mode === "add" ? "" : formatDate(props.bill?.date)
              }
              {...register("date", { required: true })}
            />
          </div>
          {errors.date?.type === "required" && (
            <p className={classes.error}>please enter the date</p>
          )}
          <div className={classes.inputContainer}>
            <span>Amount</span>
            <input
              type="number"
              defaultValue={props.mode === "add" ? "" : props.bill?.amount}
              {...register("amount", { required: true })}
            />
          </div>
          {errors.amount?.type === "required" && (
            <p className={classes.error}>please enter the amount</p>
          )}
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

export default EditExpensesModal;
