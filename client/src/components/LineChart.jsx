import { BarChart } from "@mui/x-charts/BarChart";

const dataset = [
  { month: "Jan", sales: 35 },
  { month: "Feb", sales: 44 },
  { month: "Mar", sales: 24 },
  { month: "Apr", sales: 34 },
  { month: "May", sales: 34 },
  { month: "Jun", sales: 34 },
  { month: "Jul", sales: 34 },
  { month: "Aug", sales: 34 },
  { month: "Sep", sales: 34 },
  { month: "Oct", sales: 34 },
  { month: "Nov", sales: 34 },
  { month: "Dec", sales: 34 },
];

const chartSetting = {
  yAxis: [{ label: "Sales" }],
  width: 500,
  height: 300,
};

function LineChart(props) {
  dataset.forEach((item, i) => (item.sales = props.data[i]));
  return (
    <BarChart
      dataset={dataset}
      xAxis={[
        {
          dataKey: "month",
          tickLabelStyle: {
            fill: "var(--text)",
            fontSize: 12,
          },
        },
      ]}
      yAxis={[
        {
          tickLabelStyle: { fill: "var(--text)" },
        },
      ]}
      series={[{ dataKey: "sales" }]}
      width={700}
      height={300}
      margin={{ top: 20, right: 20, bottom: 30, left: 0 }}
    />
  );
}

export default LineChart;
