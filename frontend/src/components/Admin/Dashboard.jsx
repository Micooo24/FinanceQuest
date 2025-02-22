// import React, { useState } from "react";
// import { Box, Typography } from "@mui/material";
// import AdminNavibar from "./AdminNavbar"; 
// import Chart from "./Chart"; 
// import UserTable from "./UserDatatable"; 
// import BudgetTable from "./BudgetingDataTable";

// const Dashboard = () => {
//   const [activeSection, setActiveSection] = useState("Dashboard"); 

//   // Dynamic content
//   const renderContent = () => {
//     switch (activeSection) {
//       case "Dashboard":
//         return (
//                 <Chart/>
//         );
//       case "User Table":
//         return <UserTable/>; 
//       case "Budget Table":
//         return <BudgetTable/>;
//       case "Savings Table":
//         return <Typography variant="h6">Content</Typography>;
//       case "Investment Table":
//         return <Typography variant="h6">Content</Typography>;
//       default:
//         return <Typography variant="h6">Select an option from the sidebar</Typography>;
//     }
//   };

//   return (
//     <Box sx={{ display: "flex" }}>
//       <AdminNavibar activeSection={activeSection} setActiveSection={setActiveSection} />
//       <Box sx={{ width: "100%", ml: 8, mt: 8, p: 3 }}>{renderContent()}</Box>
//     </Box>
//   );
// };

// export default Dashboard;

import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import AdminNavibar from "./AdminNavbar"; 
import Chart from "./Chart"; 
import UserTable from "./UserDatatable"; 
import BudgetTable from "./BudgetingDataTable";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("Dashboard"); 

  // Dynamic content
  const renderContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return (
                <Chart/>
        );
      case "User Table":
        return <UserTable/>; 
      case "Budget Table":
        return <BudgetTable/>;
      case "Savings Table":
        return <Typography variant="h6">Content</Typography>;
      case "Investment Table":
        return <Typography variant="h6">Content</Typography>;
      default:
        return <Typography variant="h6">Select an option from the sidebar</Typography>;
    }
  };

  return (
    <Box sx={{ display: "flex",  background: "linear-gradient(180deg, #5e3967, #351742)", }}>
      <AdminNavibar activeSection={activeSection} setActiveSection={setActiveSection} />
      <Box sx={{ width: "100%", ml: 8, mt: 8, p: 3 }}>{renderContent()}</Box>
    </Box>
  );
};

export default Dashboard;