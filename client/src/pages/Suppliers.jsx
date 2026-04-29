import classes from "./Suppliers.module.css";
import EditCarModal from "../components/EditCarModal";
import { useState } from "react";
import EditSupplierModal from "../components/EditSupplierModal";
import SupplierTable from "../components/SupplierTable";
import api from "../api/axios";
import { useQuery } from "@tanstack/react-query";
import PaginationOutlined from "../components/PaginationOutlined";

const getData = () => {
  return api.get("/suppliers");
};
function Suppliers() {
  const [open, setOpen] = useState(false);
  const [supplierName, setSupplierName] = useState("");
  const [pageNum, setPageNum] = useState(1);

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["suppliers", pageNum],
    queryFn: () =>
      api.get(`/suppliers?name=${supplierName}&limit=10&page=${pageNum}`),
    staleTime: 5000,
  });

  const totalPages = Math.ceil(data?.data?.totalNum / 10);
  if (isError) return <p>{error.message}</p>;

  return (
    <div>
      <div className={classes.topCars}>
        <div className={classes.searchContainer}>
          <button className={classes.searchButton} onClick={() => refetch()}>
            Search
          </button>
          <input
            className={classes.carSearch}
            onChange={(e) => setSupplierName(e.target.value)}
            placeholder="write the supplier name..."
          />
        </div>
        <div className={classes.addCarButton} onClick={() => setOpen(true)}>
          new supplier
        </div>
        {open && (
          <EditSupplierModal
            open={open}
            onClose={() => setOpen(false)}
            mode="add"
          />
        )}
      </div>
      {isLoading && <div className={classes.loader}></div>}
      {!isLoading && data.data.data.data.length > 0 && (
        <SupplierTable suppliers={data.data.data.data} />
      )}{" "}
      {!isLoading && data.data.data.data.length === 0 && (
        <p>no suppliers found</p>
      )}
      {totalPages > 1 && (
        <div className={classes.pagination}>
          <PaginationOutlined
            count={totalPages}
            page={pageNum}
            onChange={(event, value) => setPageNum(value)}
          />
        </div>
      )}
    </div>
  );
}

export default Suppliers;
