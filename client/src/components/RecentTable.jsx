import classes from "./RecentTable.module.css";

function RecentTable() {
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
          <td>04-june-2024</td>
          <td>Toyota Rush 2026 v1 hgghjhgjhgjhjhgjhgjgjggjgjgjgj</td>
          <td>Ahmed adel</td>
          <td>01055336369</td>
          <td>900000</td>
        </tr>
      </tbody>
    </table>
  );
}

export default RecentTable;
