import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";

// class LineChart extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       chartData: [],
//       chartOptions: {},
//     };
//   }

//   componentDidMount() {
//     const { lineChartData, lineChartOptions } = this.props;
//     console.log(this.props);

//     this.setState({
//       chartData: lineChartData,
//       chartOptions: lineChartOptions,
//     });
//   }

//   render() {
//     return (
//       <ReactApexChart
//         options={this.state.chartOptions}
//         series={this.state.chartData}
//         type="area"
//         width="100%"
//         height="100%"
//       />
//     );
//   }
// }

const LineChart = ({ lineChartData, lineChartOptions }) => {
  useEffect(() => {
    console.log(lineChartOptions);
  }, [lineChartOptions]);
  return (
    <ReactApexChart
      options={lineChartOptions}
      series={lineChartData}
      type="area"
      width="100%"
      height="100%"
    />
  );
};

export default LineChart;
