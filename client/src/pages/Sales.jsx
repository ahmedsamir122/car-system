import classes from "./Sales.module.css";
import { useState } from "react";
import SalesTable from "../components/SalesTable";
import EditSalesModal from "../components/EditSalesModal";
import api from "../api/axios";
import { useQuery } from "@tanstack/react-query";
import PaginationOutlined from "../components/PaginationOutlined";

function Sales() {
  const [open, setOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [pageNum, setPageNum] = useState(1);

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["sales", pageNum],
    queryFn: () =>
      api.get(`/sales?name=${customerName}&limit=10&page=${pageNum}`),
    staleTime: 5000,
  });

  const totalPages = Math.ceil(data?.data?.totalNum / 10);
  console.log(data?.data.data.data);
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
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="write the customer name..."
          />
        </div>
        <div className={classes.addCarButton} onClick={() => setOpen(true)}>
          new
        </div>
        {open && (
          <EditSalesModal
            open={open}
            onClose={() => setOpen(false)}
            mode="add"
          />
        )}
      </div>
      {isLoading && <div className={classes.loader}></div>}
      {!isLoading && data.data.data.data.length > 0 && (
        <SalesTable sales={data?.data.data.data} />
      )}{" "}
      {!isLoading && data.data.data.data.length === 0 && <p>no sales found</p>}
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

export default Sales;
