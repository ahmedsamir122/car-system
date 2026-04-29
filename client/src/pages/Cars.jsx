import CarTable from "../components/CarTable";
import classes from "./Cars.module.css";
import EditCarModal from "../components/EditCarModal";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useQuery } from "@tanstack/react-query";
import PaginationOutlined from "../components/PaginationOutlined";

function Cars() {
  const [open, setOpen] = useState(false);
  const [carName, setCarName] = useState("");
  const [pageNum, setPageNum] = useState(1);

  const { isLoading, data, isError, error, refetch } = useQuery({
    queryKey: ["cars", pageNum],
    queryFn: () => api.get(`/cars?brand=${carName}&limit=10&page=${pageNum}`),
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
            onChange={(e) => setCarName(e.target.value)}
            placeholder="write the car brand..."
          />
        </div>
        <div className={classes.addCarButton} onClick={() => setOpen(true)}>
          add car
        </div>
        {open && (
          <EditCarModal open={open} onClose={() => setOpen(false)} mode="add" />
        )}
      </div>
      {isLoading && <div className={classes.loader}></div>}
      {!isLoading && data.data.data.data.length > 0 && (
        <CarTable cars={data.data.data.data} />
      )}
      {!isLoading && data.data.data.data.length === 0 && <p>no cars found</p>}
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

export default Cars;
