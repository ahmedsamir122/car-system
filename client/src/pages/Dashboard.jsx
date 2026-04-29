import CircleChart from "../components/CircleChart";
import LineChart from "../components/LineChart";
import RecentTable from "../components/RecentTable";
import classes from "./Dashboard.module.css";
import api from "../api/axios";
import { useQuery } from "@tanstack/react-query";
function Dashboard() {
  const currentYear = new Date().getFullYear();

  const {
    isLoading: isLoadingPayment,
    data: dataPayment,
    isError: isErrorPayment,
  } = useQuery({
    queryKey: ["payment-percentage"],
    queryFn: () => api.get(`/cars/payment-percentage`),
  });
  const {
    isLoading: isLoadingSoldCars,
    data: dataSoldCar,
    isError: isErrorSoldCars,
  } = useQuery({
    queryKey: ["car-sold-stats"],
    queryFn: () => api.get(`/cars/car-sold-stats/${currentYear}`),
  });
  const {
    isLoading: isLoadingMonthlyProfit,
    data: dataMonthlyProfit,
    isError: isErrorMonthlyProfit,
  } = useQuery({
    queryKey: ["monthlyProfit"],
    queryFn: () => api.get(`/cars/monthlyProfit`),
  });

  const currentMonth = new Date().getMonth() + 1;

  // const soldPerMonth = [
  //   { totalSold: 7, month: 4 },
  //   { totalSold: 1, month: 6 },
  // ];

  // create empty 12 months array
  const monthsArray = new Array(12).fill(0);

  // fill values
  dataSoldCar?.data.soldPerMonth.forEach((item) => {
    monthsArray[item.month - 1] = item.totalSold;
  });

  const current =
    dataSoldCar?.data.soldPerMonth.find(
      (item) => item.month === currentMonth
    ) || 0;
  {
    !isLoadingSoldCars &&
      console.log(
        current.totalSold,
        dataSoldCar?.data.soldPerMonth,
        monthsArray
      );
  }

  return (
    <div>
      <div className={classes.cardsContainer}>
        <div className={classes.card}>
          <div className={classes.topCard}>Total Cars</div>
          <div className={classes.bottomCard}>
            <h4 className={classes.monthText}>this month</h4>
            <h4 className={classes.carNumber}>{`${
              dataSoldCar?.data.availableCars + current.totalSold
            } car`}</h4>
          </div>
        </div>
        <div className={classes.card}>
          <div className={classes.topCard}>Available Cars</div>
          <div className={classes.bottomCard}>
            <h4 className={classes.monthText}>this month</h4>
            <h4
              className={classes.carNumber}
            >{`${dataSoldCar?.data.availableCars} car`}</h4>
          </div>
        </div>
        <div className={classes.card}>
          <div className={classes.topCard}>Sold Cars</div>
          <div className={classes.bottomCard}>
            <h4 className={classes.monthText}>this month</h4>
            <h4 className={classes.carNumber}>{`${
              current?.totalSold || 0
            } car`}</h4>
          </div>
        </div>
        <div className={classes.card}>
          <div className={classes.topCard}>Profit</div>
          <div className={classes.bottomCard}>
            <h4 className={classes.monthText}>this month</h4>
            {isLoadingMonthlyProfit && (
              <h4 className={classes.carNumber}>loading...</h4>
            )}
            {!isLoadingMonthlyProfit && (
              <h4
                className={classes.carNumber}
              >{`${dataMonthlyProfit.data.profit} LE`}</h4>
            )}
          </div>
        </div>
      </div>
      <div className={classes.chartsContainer}>
        <div className={classes.lineChart}>
          <h3 className={classes.lineChartTitle}>Sales</h3>
          {!isLoadingSoldCars && <LineChart data={monthsArray} />}
        </div>
        <div className={classes.circleChart}>
          <h3 className={classes.circleChartTitle}>Pay</h3>
          {!isLoadingPayment && (
            <CircleChart
              data={dataPayment?.data.data}
              loading={isLoadingPayment}
            />
          )}
        </div>
      </div>
      <div className={classes.recentSalesContainer}>
        <h3 className={classes.recentTableTitle}>Recent sales</h3>
        <RecentTable />
      </div>
    </div>
  );
}

export default Dashboard;
