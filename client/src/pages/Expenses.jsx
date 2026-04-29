import classes from "./Expenses.module.css";
import { useState } from "react";
import EditExpensesModal from "../components/EditExpensesModal";
import ExpensesTable from "../components/ExpensesTable";
import api from "../api/axios";
import { useQuery } from "@tanstack/react-query";
import PaginationOutlined from "../components/PaginationOutlined";

const getData = () => {
  return api.get("/expenses");
};

function Expenses() {
  const [open, setOpen] = useState(false);
  const [typeName, setTypeName] = useState("");
  const [pageNum, setPageNum] = useState(1);

  const { isLoading, data, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["expenses", pageNum],
    queryFn: () =>
      api.get(`/expenses?type=${typeName}&limit=10&page=${pageNum}`),
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
            onChange={(e) => setTypeName(e.target.value)}
            placeholder="write the type..."
          />
        </div>
        <div className={classes.addCarButton} onClick={() => setOpen(true)}>
          new bill
        </div>
        {open && (
          <EditExpensesModal
            open={open}
            onClose={() => setOpen(false)}
            mode="add"
          />
        )}
      </div>
      {isLoading && <div className={classes.loader}></div>}
      {!isLoading && data.data.data.data.length > 0 && (
        <ExpensesTable expenses={data.data.data.data} />
      )}
      {!isLoading && data.data.data.data.length === 0 && (
        <p>no expenses found</p>
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

export default Expenses;
