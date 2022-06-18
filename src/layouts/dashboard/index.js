/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { Card, LinearProgress, Stack, Typography } from "@mui/material";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import linearGradient from "assets/theme/functions/linearGradient";

// Vision UI Dashboard React base styles
import typography from "assets/theme/base/typography";
import colors from "assets/theme/base/colors";

// Dashboard layout components
import WelcomeMark from "layouts/dashboard/components/WelcomeMark";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";
import SatisfactionRate from "layouts/dashboard/components/SatisfactionRate";
import ReferralTracking from "layouts/dashboard/components/ReferralTracking";

// React icons
import { IoIosRocket } from "react-icons/io";
import { IoGlobe } from "react-icons/io5";
import { IoBuild } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";
import { IoDocumentText } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";

// Data
import LineChart from "examples/Charts/LineCharts/LineChart";
import BarChart from "examples/Charts/BarCharts/BarChart";
import { lineChartDataDashboard } from "layouts/dashboard/data/lineChartData";
import { lineChartOptionsDashboard } from "layouts/dashboard/data/lineChartOptions";
import { barChartDataDashboard } from "layouts/dashboard/data/barChartData";
import { barChartOptionsDashboard } from "layouts/dashboard/data/barChartOptions";
import { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useEffect } from "react";

function Dashboard() {
  const { gradients } = colors;
  const { cardContent } = gradients;
  const [fromDate, setFromDate] = useState("2021-11");
  const [toDate, setToDate] = useState(
    new Date().getFullYear() + "-" + ("0" + (new Date().getMonth() + 1)).slice(-2)
  );
  const [customOverview, setCustomOverview] = useState({
    Total_Days: 0,
    Total_Flexitime: 0,
    Total_Holiday: 0,
    Total_Hours: 0,
    Total_SickLeave: 0,
    Total_Vacation: 0,
    Total_WorkDay: 0,
    Total_Worked: 0,
  });
  const [lineChartData, setLineChartData] = useState([{ name: "Hours Worked", data: [] }]);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [lineChartOptions, setLineChartOptions] = useState(lineChartOptionsDashboard);

  const getCustomWorktimeData = () => {
    const numberOfDayInMonth = new Date(toDate.slice(0, 4), toDate.slice(5, 7), 0).getDate();

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/data/worktime/custom/${fromDate}-01/${toDate}-${numberOfDayInMonth}/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((data) => {
        setCustomOverview(data.data.Overview);
        console.log(data.data);
        let workHours = [];
        let dates = [];
        data.data.Total_data.forEach((value) => {
          workHours.push(value.WorkHours);
          dates.push(value.WorkDate);
        });
        setLineChartData([{ name: "Hours Worked", data: workHours }]);

        let temp = lineChartOptions;
        temp["xaxis"]["categories"] = dates;
        setLineChartOptions(temp);
      });
  };

  useEffect(() => {
    getCustomWorktimeData();
  }, [toDate, fromDate]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "today's money", fontWeight: "regular" }}
                count="$53,000"
                percentage={{ color: "success", text: "+55%" }}
                icon={{ color: "info", component: <IoWallet size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "today's users" }}
                count="2,300"
                percentage={{ color: "success", text: "+3%" }}
                icon={{ color: "info", component: <IoGlobe size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "new clients" }}
                count="+3,462"
                percentage={{ color: "error", text: "-2%" }}
                icon={{ color: "info", component: <IoDocumentText size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "total sales" }}
                count="$103,430"
                percentage={{ color: "success", text: "+5%" }}
                icon={{ color: "info", component: <FaShoppingCart size="20px" color="white" /> }}
              />
            </Grid>
          </Grid>
        </VuiBox>
        {/* <VuiBox mb={3}>
          <Grid container spacing="18px">
            <Grid item xs={12} lg={12} xl={5}>
              <WelcomeMark />
            </Grid>
            <Grid item xs={12} lg={6} xl={3}>
              <SatisfactionRate />
            </Grid>
            <Grid item xs={12} lg={6} xl={4}>
              <ReferralTracking />
            </Grid>
          </Grid>
        </VuiBox> */}
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6} xl={7}>
              <Card>
                <VuiBox sx={{ height: "100%" }}>
                  <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                    Custom Worktime Overview
                  </VuiTypography>
                  <VuiBox>
                    <div style={{ display: "flex", marginTop: "20px", marginBottom: "20px" }}>
                      <div>
                        <p style={{ color: "grey", fontWeight: "bold" }}>From:</p>

                        <input
                          type="month"
                          name="from"
                          id=""
                          value={fromDate}
                          min="2021-11"
                          max={toDate}
                          onChange={(e) => {
                            setFromDate(e.target.value);
                          }}
                        />
                      </div>
                      <div style={{ marginLeft: "80px" }}>
                        <p style={{ color: "grey", fontWeight: "bold" }}>To:</p>

                        <input
                          type="month"
                          name="from"
                          id=""
                          value={toDate}
                          min={fromDate}
                          max={
                            new Date().getFullYear() +
                            "-" +
                            ("0" + (new Date().getMonth() + 1)).slice(-2)
                          }
                          onChange={(e) => {
                            setToDate(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </VuiBox>
                  <VuiBox sx={{ height: "310px" }}>
                    <LineChart lineChartData={lineChartData} lineChartOptions={lineChartOptions} />
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6} xl={5}>
              <Card >
                <VuiBox
                
                >
                  <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                    {" "}
                    Custom Total Worktime Overview
                  </VuiTypography>
                  <div style={{ marginTop: "20px" }}>
                    <p style={{ fontWeight: "bold", color: "#bababf", fontSize: "18px" }}>
                      Total Days:{" "}
                      <span style={{ marginLeft: "10px" }}> {customOverview.Total_Days}</span>
                    </p>
                    <p style={{ fontWeight: "bold", color: "#bababf", fontSize: "18px" }}>
                      Total Days:{" "}
                      <span style={{ marginLeft: "10px" }}> {customOverview.Total_Flexitime}</span>
                    </p>
                    <p style={{ fontWeight: "bold", color: "#bababf", fontSize: "18px" }}>
                      Total Days:{" "}
                      <span style={{ marginLeft: "10px" }}> {customOverview.Total_Holiday}</span>
                    </p>
                    <p style={{ fontWeight: "bold", color: "#bababf", fontSize: "18px" }}>
                      Total Days:{" "}
                      <span style={{ marginLeft: "10px" }}> {customOverview.Total_Hours}</span>
                    </p>
                    <p style={{ fontWeight: "bold", color: "#bababf", fontSize: "18px" }}>
                      Total Days:{" "}
                      <span style={{ marginLeft: "10px" }}> {customOverview.Total_SickLeave}</span>
                    </p>
                    <p style={{ fontWeight: "bold", color: "#bababf", fontSize: "18px" }}>
                      Total Days:{" "}
                      <span style={{ marginLeft: "10px" }}> {customOverview.Total_Vacation}</span>
                    </p>
                    <p style={{ fontWeight: "bold", color: "#bababf", fontSize: "18px" }}>
                      Total Days:{" "}
                      <span style={{ marginLeft: "10px" }}> {customOverview.Total_WorkDay}</span>
                    </p>
                    <p style={{ fontWeight: "bold", color: "#bababf", fontSize: "18px" }}>
                      Total Days:{" "}
                      <span style={{ marginLeft: "10px" }}>
                        {" "}
                        {customOverview.Total_Worked.toFixed(3)}
                      </span>
                    </p>
                  </div>
                </VuiBox>
              </Card>
            </Grid>
          </Grid>
        </VuiBox>
        {/* <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
          <Grid item xs={12} md={6} lg={8}>
            <Projects />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <OrderOverview />
          </Grid>
        </Grid> */}
      </VuiBox>
    </DashboardLayout>
  );
}

export default Dashboard;
