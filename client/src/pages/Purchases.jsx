import classes from "./Purchases.module.css";
import { useState } from "react";
import api from "../api/axios";
import { useQuery } from "@tanstack/react-query";
import EditPurchasesModal from "../components/EditPurchasesModal";
import PurchasesTable from "../components/PurchasesTable";
import PaginationOutlined from "../components/PaginationOutlined";

function Purchases() {
  const [open, setOpen] = useState(false);
  const [supplierName, setSupplierName] = useState("");
  const [pageNum, setPageNum] = useState(1);

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["purchases", pageNum],
    queryFn: () =>
      api.get(`/purchases?name=${supplierName}&limit=10&page=${pageNum}`),
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
          new
        </div>
        {open && (
          <EditPurchasesModal
            open={open}
            onClose={() => setOpen(false)}
            mode="add"
          />
        )}
      </div>
      {isLoading && <div className={classes.loader}></div>}
      {!isLoading && data.data.data.data.length > 0 && (
        <PurchasesTable purchases={data?.data.data.data} />
      )}{" "}
      {!isLoading && data.data.data.data.length === 0 && (
        <p>no purchases found</p>
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

export default Purchases;
