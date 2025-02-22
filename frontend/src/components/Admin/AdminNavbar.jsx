// import React, { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Typography,
//   Box,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   Menu,
//   MenuItem,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Collapse,
// } from "@mui/material";
// import {
//   Notifications,
//   Search,
//   Settings,
//   Dashboard,
//   Person,
//   TableChart,
//   Logout,
//   ArrowDropDown,
//   ExpandLess,
//   ExpandMore,
// } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import toast from 'react-hot-toast';

// const AdminNavbar = ({ activeSection, setActiveSection }) => {
//   const [anchorEl, setAnchorEl] = useState(null); 
//   const [logoutDialogOpen, setLogoutDialogOpen] = useState(false); 
//   const [miniGamesOpen, setMiniGamesOpen] = useState(false); 
//   const navigate = useNavigate();

//   const userName = "User 1";

//   const menuItems = [
//     { text: "Dashboard", icon: <Dashboard /> },
//     { text: "Notifications", icon: <Notifications /> },
//     { text: "User Table", icon: <Person /> },
//   ];

//   const miniGamesItems = [
//     { text: "Budget Table", icon: <TableChart /> },
//     { text: "Savings Table", icon: <TableChart /> },
//     { text: "Investment Table", icon: <TableChart /> },
//   ];

//   const handleItemClick = (text) => {
//     setActiveSection(text);
//   };

//   const handleProfileMenuClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleCloseMenu = () => {
//     setAnchorEl(null);
//   };

//   const handleLogoutClick = () => {
//     setLogoutDialogOpen(true); 
//   };

//   const handleLogoutConfirm = () => {
//     localStorage.clear();
//     toast.success("Logged out successfully!");
//     navigate("/login");
//     setLogoutDialogOpen(false);
//   };

//   const handleLogoutCancel = () => {
//     setLogoutDialogOpen(false); 
//   };

//   const handleMiniGamesClick = () => {
//     setMiniGamesOpen(!miniGamesOpen); 
//   };

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
//       {/* Navbar */}
//       <AppBar position="fixed" sx={{ backgroundColor: "#1e1e2f", zIndex: 1300 }}>
//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>{activeSection}</Typography>
//           <IconButton color="inherit"><Search /></IconButton>
//           <IconButton color="inherit"><Notifications /></IconButton>
//           <IconButton color="inherit"><Settings /></IconButton>

//           {/* Profile Menu Dropdown */}
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <IconButton color="inherit"><Person /></IconButton>
//             <Typography variant="body1" sx={{ color: "white", marginRight: "8px" }}>{userName}</Typography>
//             <IconButton color="inherit" onClick={handleProfileMenuClick}>
//               <ArrowDropDown />
//             </IconButton>
            
//             <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu} > 
//               <MenuItem onClick={handleCloseMenu}>View Profile</MenuItem>
//               <MenuItem onClick={handleLogoutClick}>Log Out</MenuItem>
//             </Menu>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* Sidebar */}
//       <Box
//         sx={{
//           width: 250,
//           height: "100vh",
//           background: "rgba(0, 0, 0, 0.3)",
//           padding: "20px",
//           borderRadius: "12px",
//           backdropFilter: "blur(10px)",
//           color: "white",
//           mt: 8,
//         }}
//       >
//         <Box sx={{ textAlign: "center", pb: 2 }}>
//           <Typography variant="h6" sx={{ fontWeight: "bold" }}>FinanceQuest</Typography>
//         </Box>
//         <Divider sx={{ backgroundColor: "white" }} />
//         <List>
//           {menuItems.map((item, index) => (
//             <ListItem
//               button
//               key={index}
//               sx={{
//                 backgroundColor: activeSection === item.text ? "#3f51b5" : "transparent",
//                 borderRadius: "4px",
//                 transition: "background-color 0.3s",
//                 "&:hover": { backgroundColor: "#2c387e" },
//               }}
//               onClick={() => handleItemClick(item.text)}
//             >
//               <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
//               <ListItemText primary={item.text} sx={{ color: "white" }} />
//             </ListItem>
//           ))}

//           {/* Mini Games Dropdown */}
//           <ListItem
//             button
//             onClick={handleMiniGamesClick}
//             sx={{
//               borderRadius: "4px",
//               transition: "background-color 0.3s",
//               "&:hover": { backgroundColor: "#2c387e" },
//             }}
//           >
//             <ListItemIcon sx={{ color: "white" }}><TableChart /></ListItemIcon>
//             <ListItemText primary="Mini Games" sx={{ color: "white" }} />
//             {miniGamesOpen ? <ExpandLess sx={{ color: "white" }} /> : <ExpandMore sx={{ color: "white" }} />}
//           </ListItem>
//           <Collapse in={miniGamesOpen} timeout="auto" unmountOnExit>
//             <List component="div" disablePadding>
//               {miniGamesItems.map((item, index) => (
//                 <ListItem
//                   button
//                   key={index}
//                   sx={{
//                     pl: 4,
//                     backgroundColor: activeSection === item.text ? "#3f51b5" : "transparent",
//                     borderRadius: "4px",
//                     transition: "background-color 0.3s",
//                     "&:hover": { backgroundColor: "#2c387e" },
//                   }}
//                   onClick={() => handleItemClick(item.text)}
//                 >
//                   <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
//                   <ListItemText primary={item.text} sx={{ color: "white" }} />
//                 </ListItem>
//               ))}
//             </List>
//           </Collapse>
//         </List>
//         <Divider sx={{ backgroundColor: "white" }} />

//         {/* Log Out Button */}
//         <ListItem
//           button
//           sx={{
//             color: "#f44336",
//             borderRadius: "4px",
//             transition: "background-color 0.3s",
//             "&:hover": { backgroundColor: "#ff7961" },
//           }}
//           onClick={handleLogoutClick}
//         >
//           <ListItemIcon sx={{ color: "#f44336" }}>
//             <Logout />
//           </ListItemIcon>
//           <ListItemText primary="Log Out" sx={{ color: "#f44336" }} />
//         </ListItem>
//       </Box>

//       {/* Logout Confirmation Dialog */}
//       <Dialog open={logoutDialogOpen} onClose={handleLogoutCancel}>
//         <DialogTitle sx={{ backgroundColor: "#1e1e2f", color: "white", textAlign: "center" }}>
//           Do you want to Log out?
//         </DialogTitle>
//         <DialogContent sx={{ backgroundColor: "#1e1e2f", color: "white", textAlign: "center" }}>
//           <Typography variant="body1">You will be logged out of your account.</Typography>
//         </DialogContent>
//         <DialogActions sx={{ backgroundColor: "#1e1e2f", justifyContent: "center" }}>
//           <Button onClick={handleLogoutCancel} sx={{ color: "white", border: "1px solid white", "&:hover": { backgroundColor: "#2c387e" } }}>
//             No
//           </Button>
//           <Button onClick={handleLogoutConfirm} sx={{ color: "#f44336", border: "1px solid #f44336", "&:hover": { backgroundColor: "#ff7961" } }}>
//             Yes
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default AdminNavbar;


import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Collapse,
} from "@mui/material";
import {
  Notifications,
  Search,
  Settings,
  Dashboard,
  Person,
  TableChart,
  Logout,
  ArrowDropDown,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";

const AdminNavbar = ({ activeSection, setActiveSection }) => {
  const [anchorEl, setAnchorEl] = useState(null); 
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false); 
  const [miniGamesOpen, setMiniGamesOpen] = useState(false); 

  const userName = "User 1";

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard /> },
    { text: "Notifications", icon: <Notifications /> },
    { text: "User Table", icon: <Person /> },
  ];

  const miniGamesItems = [
    { text: "Budget Table", icon: <TableChart /> },
    { text: "Savings Table", icon: <TableChart /> },
    { text: "Investment Table", icon: <TableChart /> },
  ];

  const handleItemClick = (text) => {
    setActiveSection(text);
  };

  const handleProfileMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true); 
  };

  const handleLogoutConfirm = () => {
    console.log("Logged out");
    setLogoutDialogOpen(false);
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false); 
  };

  const handleMiniGamesClick = () => {
    setMiniGamesOpen(!miniGamesOpen); 
  };

  return (
    <Box 
      sx={{ 
        display: "flex", 
        flexDirection: "column", 
        width: "100%",  
        background: "linear-gradient(180deg, #5e3967, #351742)",
        }}
      >
      {/* Navbar */}
      <AppBar position="fixed" sx={{ backgroundColor: "#351742", zIndex: 1300 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>{activeSection}</Typography>
          <IconButton color="inherit"><Search /></IconButton>
          <IconButton color="inherit"><Notifications /></IconButton>
          <IconButton color="inherit"><Settings /></IconButton>

          {/* Profile Menu Dropdown */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton color="inherit"><Person /></IconButton>
            <Typography variant="body1" sx={{ color: "white", marginRight: "8px" }}>{userName}</Typography>
            <IconButton color="inherit" onClick={handleProfileMenuClick}>
              <ArrowDropDown />
            </IconButton>
            
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu} > 
              <MenuItem onClick={handleCloseMenu}>View Profile</MenuItem>
              <MenuItem onClick={handleLogoutClick}>Log Out</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box
        sx={{
          width: 250,
          height: "100vh",
          background: "rgba(0, 0, 0, 0.3)",
          padding: "20px",
          borderRadius: "12px",
          backdropFilter: "blur(10px)",
          color: "white",
          mt: 8,
        }}
      >
        <Box sx={{ textAlign: "center", pb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>FinanceQuest</Typography>
        </Box>
        <Divider sx={{ backgroundColor: "white" }} />
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              button
              key={index}
              sx={{
                backgroundColor: activeSection === item.text ? "#5e3967" : "transparent",
                borderRadius: "4px",
                transition: "background-color 0.3s",
                "&:hover": { backgroundColor: "#5e3967" },
              }}
              onClick={() => handleItemClick(item.text)}
            >
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: "white" }} />
            </ListItem>
          ))}

          {/* Mini Games Dropdown */}
          <ListItem
            button
            onClick={handleMiniGamesClick}
            sx={{
              borderRadius: "4px",
              transition: "background-color 0.3s",
              "&:hover": { backgroundColor: "#5e3967" },
            }}
          >
            <ListItemIcon sx={{ color: "white" }}><TableChart /></ListItemIcon>
            <ListItemText primary="Mini Games" sx={{ color: "white" }} />
            {miniGamesOpen ? <ExpandLess sx={{ color: "white" }} /> : <ExpandMore sx={{ color: "white" }} />}
          </ListItem>
          <Collapse in={miniGamesOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {miniGamesItems.map((item, index) => (
                <ListItem
                  button
                  key={index}
                  sx={{
                    pl: 4,
                    backgroundColor: activeSection === item.text ? "#5e3967" : "transparent",
                    borderRadius: "4px",
                    transition: "background-color 0.3s",
                    "&:hover": { backgroundColor: "#5e3967" },
                  }}
                  onClick={() => handleItemClick(item.text)}
                >
                  <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} sx={{ color: "white" }} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>
        <Divider sx={{ backgroundColor: "white" }} />

        {/* Log Out Button */}
        <ListItem
          button
          sx={{
            color: "#f44336",
            borderRadius: "4px",
            transition: "background-color 0.3s",
            "&:hover": { backgroundColor: "#5e3967" },
          }}
          onClick={handleLogoutClick}
        >
          <ListItemIcon sx={{ color: "#f44336" }}>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Log Out" sx={{ color: "#f44336" }} />
        </ListItem>
      </Box>

      {/* Logout Confirmation Dialog */}
      <Dialog open={logoutDialogOpen} onClose={handleLogoutCancel}>
        <DialogTitle sx={{ backgroundColor: "#5e3967", color: "white", textAlign: "center" }}>
          Do you want to Log out?
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "#5e3967", color: "white", textAlign: "center" }}>
          <Typography variant="body1">You will be logged out of your account.</Typography>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "#5e3967", justifyContent: "center" }}>
          <Button onClick={handleLogoutCancel} sx={{ color: "white", border: "1px solid white", "&:hover": { backgroundColor: "#351742" } }}>
            No
          </Button>
          <Button onClick={handleLogoutConfirm} sx={{ color: "#f44336", border: "1px solid #f44336", "&:hover": { backgroundColor: "#ff7961" } }}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminNavbar;