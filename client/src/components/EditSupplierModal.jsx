import { useEffect } from "react";
import classes from "./EditSupplierModal.module.css";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
function EditSupplierModal(props) {
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
      return api.post("/suppliers", data);
    }
    if (props.mode === "edit") {
      return api.patch(`/suppliers/${props.supplier.id}`, data);
    }
  };

  const { mutate, error, isError } = useMutation({
    mutationFn: mutateFu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      props.onClose();
    },
  });

  const onsubmit = async (data) => {
    const [name, phone, company] = getValues(["name", "phone", "company"]);
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
          <h3>{props.mode === "add" ? "Add" : "Edit "}</h3>
          <div className={classes.closeIcon} onClick={() => props.onClose()}>
            X
          </div>
        </div>
        <form className={classes.form} onSubmit={handleSubmit(onsubmit)}>
          <div className={classes.inputContainer}>
            <span> Name</span>
            <input
              defaultValue={props.mode === "add" ? "" : props.supplier?.name}
              {...register("name", { required: true })}
            />
          </div>
          {errors.name?.type === "required" && (
            <p className={classes.error}>please enter the name</p>
          )}
          <div className={classes.inputContainer}>
            <span> Phone</span>
            <input
              type="number"
              defaultValue={props.mode === "add" ? "" : props.supplier?.phone}
              {...register("phone", { required: true })}
            />
          </div>
          {errors.phone?.type === "required" && (
            <p className={classes.error}>please enter the phone number</p>
          )}
          <div className={classes.inputContainer}>
            <span>Company</span>
            <input
              type="text"
              defaultValue={props.mode === "add" ? "" : props.supplier?.company}
              {...register("company", { required: true })}
            />
          </div>
          {errors.company?.type === "required" && (
            <p className={classes.error}>please enter the company name</p>
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

export default EditSupplierModal;
