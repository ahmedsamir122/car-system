import classes from "./RecentTable.module.css";
import api from "../api/axios";
import { useQuery } from "@tanstack/react-query";

function RecentTable() {
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery({
    queryKey: "sales",
    queryFn: () => api.get(`/sales?limit=1&page=1`),
    staleTime: 5000,
  });

  if (isLoading) {
    return <p>loading...</p>;
  }

  console.log(data.data.data.data);
  return (
    <table className={classes.table}>
      <thead className={classes.tableHead}>
        <tr>
          <td className={classes.dateCol}>Date</td>
          <td className={classes.carNameCol}>Car Name</td>
          <td className={classes.customerCol}>Customer</td>
          <td className={classes.phoneNumCol}>Phone Number</td>
          <td className={classes.priceCol}>price</td>
        </tr>
      </thead>

      <tbody className={classes.tableBody}>
        <tr>
          <td>{data.data.data.data[0].createdAt}</td>
          <td>{data.data.data.data[0].car.brand}</td>
          <td>{data.data.data.data[0].name}</td>
          <td>{data.data.data.data[0].customer.phone}</td>
          <td>{data.data.data.data[0].price}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default RecentTable;
