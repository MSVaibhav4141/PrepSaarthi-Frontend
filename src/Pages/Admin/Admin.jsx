import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Dashboard from "./Dashboard";
import Requests from "./Requests";
import { DateRange } from "react-date-range";
import "./admin.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
// import Connection from "./Connection";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Doughnut, Line } from "react-chartjs-2";
import { Divider } from "@mui/material";
import Students from "../Students/Students";
import MentorAll from "../MentorAll/MentorAll.jsx";
import AllAdmin from "../AllAdmin/AllAdmin.jsx";
import ManageConnection from './ManageConnection.jsx'
import Allconnction from "./Allconnction.jsx";
import MetaData from "../../utils/Metadata.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllConnections,
  getAllMentors,
  getAllStudents,
  getVisitsData,
} from "../../action/userAction.js";

export default function AdminDashboard() {
  const [open, setOpen] = useState(false);
  const { visits, loading, error } = useSelector((state) => state.visitReducer);
  const [menudata, setMenuData] = useState("Dashboard");
  const dispatch = useDispatch();
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  useEffect(() => {
    dispatch(getAllStudents());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllMentors());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllConnections());
  }, [dispatch]);
  useEffect(() => {
    const page = sessionStorage.getItem("menu");
    if (Boolean(page)) {
      setMenuData(page);
    }
  }, []);
  const naviagteMenu = (text) => {
    setMenuData(text);
    sessionStorage.setItem("menu", text);
  };
  let currentDate = new Date();
  let currentDate1 = new Date();
  currentDate1.setDate(currentDate.getDate() + 2);
  let ISTOffset = 330;
  let ISTTime = new Date(currentDate.getTime() + ISTOffset * 60000);
  let ISTTime1 = new Date(currentDate1.getTime() + ISTOffset * 60000);

  const getDate = (ISTTime) => {
    let day = String(ISTTime.getDate()).padStart(2, "0");
    let month = String(ISTTime.getMonth() + 1).padStart(2, "0");
    let year = ISTTime.getFullYear();

    return `${day}/${month}/${year}`;
  };
  const startDate = getDate(ISTTime);
  const endDate = getDate(ISTTime1);

  const [state, setState] = useState([
    {
      startDate: new Date(currentDate.getTime() + ISTOffset * 60000),
      endDate: new Date(currentDate1.getTime() + ISTOffset * 60000),
      key: "selection",
    },
  ]);

  const formatDate = (date) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    };
    return new Intl.DateTimeFormat("en-GB", options).format(date);
  };

  useEffect(() => {
    const formattedStartDate = formatDate(state[0].startDate);
    const formattedEndDate = formatDate(state[0].endDate);
    dispatch(
      getVisitsData({
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      })
    );
  }, [state, dispatch]);
  useEffect(() => {
    dispatch(getVisitsData(startDate, endDate));
  }, [dispatch, startDate, endDate]);
  //   useEffect(() => {
  //     if(loading === false){
  //       // let parts = dateString.split('/');
  // // let day = parseInt(parts[0], 10);
  // // let month = parseInt(parts[1], 10) - 1;
  // // let year = parseInt(parts[2], 10);
  //     }
  //   }, [loading])

  // const dataset2 = [
  //   {
  //     label: "Jan1",
  //     student: 23,
  //     mentor: 14,
  //   },
  //   {
  //     label: "Feb",
  //     student: 33,
  //     mentor: 17,
  //   },
  //   {
  //     label: "March",
  //     student: 13,
  //     mentor: 4,
  //   },
  //   {
  //     label: "April",
  //     student: 3,
  //     mentor: 0,
  //   },
  //   {
  //     label: "May",
  //     student: 2,
  //     mentor: 1,
  //   },
  //   {
  //     label: "June",
  //     student: 3,
  //     mentor: 0,
  //   },
  //   {
  //     label: "July",
  //     student: 0,
  //     mentor: 0,
  //   },
  //   {
  //     label: "Aug",
  //     student: 0,
  //     mentor: 14,
  //   },
  //   {
  //     label: "Sept",
  //     student: 0,
  //     mentor: 1,
  //   },
  //   {
  //     label: "Oct",
  //     student: 3,
  //     mentor: 1,
  //   },
  //   {
  //     label: "Nov",
  //     student: 3,
  //     mentor: 12,
  //   },
  //   {
  //     label: "Dec",
  //     student: 33,
  //     mentor: 4,
  //   },
  // ];

  class FenwickTree {
    constructor(size) {
      this.size = size;
      this.tree = Array(size + 1).fill(0);
    }

    update(index, value) {
      while (index <= this.size) {
        this.tree[index] += value;
        index += index & -index;
      }
    }

    query(index) {
      let sum = 0;
      while (index > 0) {
        sum += this.tree[index];
        index -= index & -index;
      }
      return sum;
    }

    rangeQuery(left, right) {
      return this.query(right) - this.query(left - 1);
    }
  }

  const [sums, setSums] = useState({
    countsVisit: 0,
    countsVisitYT: 0,
    countsVisitLin: 0,
    countsVisitInsta: 0,
    countsVisitMail: 0,
    // countsView: 0
  });

  useEffect(() => {
    if (visits?.visits?.length > 0) {
      const size = visits?.visits?.length;
      const fenwickCountsVisit = new FenwickTree(size);
      const fenwickCountsVisitYT = new FenwickTree(size);
      const fenwickCountsVisitLin = new FenwickTree(size);
      const fenwickCountsVisitInsta = new FenwickTree(size);
      const fenwickCountsVisitMail = new FenwickTree(size);
      // const fenwickCountsView = new FenwickTree(size);

      visits?.visits?.forEach((item, index) => {
        fenwickCountsVisit.update(index + 1, item.countsVisit || 0);
        fenwickCountsVisitYT.update(index + 1, item.countsVisitYT || 0);
        fenwickCountsVisitLin.update(index + 1, item.countsVisitLin || 0);
        fenwickCountsVisitInsta.update(index + 1, item.countsVisitInsta || 0);
        fenwickCountsVisitMail.update(index + 1, item.countsVisitMail || 0);
        // fenwickCountsView.update(index + 1, item.countsView || 0);
      });

      const calculatedSums = {
        countsVisit: fenwickCountsVisit.rangeQuery(1, size),
        countsVisitYT: fenwickCountsVisitYT.rangeQuery(1, size),
        countsVisitLin: fenwickCountsVisitLin.rangeQuery(1, size),
        countsVisitInsta: fenwickCountsVisitInsta.rangeQuery(1, size),
        countsVisitMail: fenwickCountsVisitMail.rangeQuery(1, size),
        // countsView: fenwickCountsView.rangeQuery(1, size)
      };

      setSums(calculatedSums);
    }
  }, [visits?.visits]);

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List sx={{ display: "flex", flexDirection: "column" }}>
        {[
          "Dashboard",
          "Request",
          "Connection",
          "Students",
          "Mentors",
          "Admins",
          "Manage Connection"
        ].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            onClick={() => naviagteMenu(text)}
          >
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );
  const [minDate, setMinDate] = useState(new Date());
  const [maxDate, setMaxDate] = useState(new Date());
  useEffect(() => {
    if (loading === false && !error) {
      const [day, month, year] = visits?.maxMonth.split("/");
      const [dayMin, monthMin, yearMin] = visits?.minMonth.split("/");
      setMaxDate(new Date(`${year}/${month}/${day}`));
      setMinDate(new Date(`${yearMin}/${monthMin}/${dayMin}`));
    }
  }, [loading, visits, error]);

  defaults.maintainAspectRatio = false;
  defaults.responsive = true;
  defaults.plugins.title.display = true;
  defaults.plugins.title.align = "center";
  defaults.plugins.title.font.size = 20;
  defaults.plugins.title.color = "black";
  return (
    <div>
      <MetaData title="Admin Dashboard" />
      <Box display="flex" justifyContent="flex-end" bgcolor="var(--text2)">
        <Button onClick={toggleDrawer(true)} sx={{ color: "var(--button1)" }}>
          Admin Menu
        </Button>
      </Box>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {menudata === "Dashboard" && <Dashboard />}
        {menudata === "Request" && <Requests />}
        {menudata === "Connection" && <Allconnction />}
        {menudata === "Students" && <Students />}
        {menudata === "Mentors" && <MentorAll />}
        {menudata === "Admins" && <AllAdmin />}
        {menudata === "Manage Connection" && <ManageConnection />}
      </Box>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        <Box sx={{ margin: "0 auto" }}>
          <DateRange
            className="range_calender"
            editableDateInputs={true}
            onChange={(item) => {
              setState([item.selection]);
            }}
            moveRangeOnFirstSelection={false}
            ranges={state}
            minDate={minDate}
            maxDate={maxDate}
          />
        </Box>
        <Box
          sx={{
            width: { xs: "100vw", md: "70vw" },
            height: "500px",
            margin: "0 auto",
            padding: "5px",
          }}
        >
          <Line
            data={{
              labels: visits?.visits?.map((data) => data.date),
              datasets: [
                {
                  label: " Organic Visits",
                  data: visits?.visits?.map((data) => data.countsVisit),
                  backgroundColor: "#42cbf5",
                  borderColor: "#42cbf5",
                },
                {
                  label: " Insta Visits",
                  data: visits?.visits?.map((data) => data.countsVisitInsta),
                  backgroundColor: "#ff66cc",
                  borderColor: "#ff66cc",
                },
                {
                  label: " YT Visits",
                  data: visits?.visits?.map((data) => data.countsVisitYT),
                  backgroundColor: "#ff0000",
                  borderColor: "#ff0000",
                },
                {
                  label: " Linkedin Visits",
                  data: visits?.visits?.map((data) => data.countsVisitLin),
                  backgroundColor: "#0A66C2",
                  borderColor: "#0A66C2",
                },
                {
                  label: "Mail Visits",
                  data: visits?.visits?.map((data) => data.countsVisitMail),
                  backgroundColor: "#EA4335",
                  borderColor: "#EA4335",
                },
                {
                  label: "Views",
                  data: visits?.visits?.map((data) => data.countsView),
                  backgroundColor: "#34A853",
                  borderColor: "#34A853",
                },
              ],
            }}
            options={{
              elements: {
                line: {
                  tension: 0.1,
                },
              },
              plugins: {
                title: {
                  text: "Visitors chart",
                },
              },
            }}
          />
        </Box>
        <Box
          sx={{
            width: { xs: "100vw", md: "70vw" },
            height: "500px",
            margin: "0 auto",
            padding: "5px",
          }}
        >
          <Doughnut
            data={{
              labels: [
                "Org. Visit",
                "Youtube",
                "Instagram",
                "Linkedin",
                "Mail",
              ],
              // label: ['Org. Visit','Youtube','Instagram','Linkedin', 'Mail', 'Views'],
              // labels: visits?.visits?.map((data) => data.date),
              datasets: [
                {
                  data: [
                    sums.countsVisit,
                    sums.countsVisitYT,
                    sums.countsVisitInsta,
                    sums.countsVisitLin,
                    sums.countsVisitMail,
                  ],
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  text: "Visitors Source",
                },
              },
            }}
          />
        </Box>
      </Box>
    </div>
  );
}
