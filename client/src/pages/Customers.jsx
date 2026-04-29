import classes from "./Customers.module.css";
import { useState } from "react";
import CustomerTable from "../components/CustomerTable";
import EditCustomerModal from "../components/EditCustomerModal";
import api from "../api/axios";
import { useQuery } from "@tanstack/react-query";
import PaginationOutlined from "../components/PaginationOutlined";

function Customers() {
  const [open, setOpen] = useState(false);
  const [customerID, setCustomerID] = useState("");
  const [pageNum, setPageNum] = useState(1);

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["customers", pageNum],
    queryFn: () =>
      api.get(`/customers?ID=${customerID}&limit=10&page=${pageNum}`),
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
            onChange={(e) => setCustomerID(e.target.value)}
            placeholder="write the customer ID..."
          />
        </div>
        <div className={classes.addCarButton} onClick={() => setOpen(true)}>
          new customer
        </div>
        {open && (
          <EditCustomerModal
            open={open}
            onClose={() => setOpen(false)}
            mode="add"
          />
        )}
      </div>
      {isLoading && <div className={classes.loader}></div>}
      {!isLoading && data.data.data.data.length > 0 && (
        <CustomerTable customers={data?.data.data.data} />
      )}{" "}
      {!isLoading && data.data.data.data.length === 0 && (
        <p>no customers found</p>
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

export default Customers;
