import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

function CircleChart(props) {
  const size = { width: 200, height: 200 };
  // Test data
  const desktopOS = [
    { id: "Cash", value: props.data[0]?.percentage || 0 },
    { id: "Credit", value: props.data[1]?.percentage || 0 },
  ];

  const valueFormatter = (value) => `${value}%`;
  if (props.isLaoading) return <div>is loading ...</div>;

  return (
    <PieChart
      series={[
        {
          data: desktopOS,
          valueFormatter: valueFormatter,
          arcLabel: (item) => `${item.value}% ${item.id}`,
          arcLabelMinAngle: 35,
          arcLabelRadius: "60%",
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fontWeight: "bold",
        },
      }}
      {...size}
    />
  );
}

export default CircleChart;
