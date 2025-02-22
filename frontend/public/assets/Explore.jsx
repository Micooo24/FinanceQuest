// import React from "react";
// import { Link } from "react-router-dom";
// import { Box, Typography, AppBar, Toolbar, IconButton, Card, CardContent } from "@mui/material";
// import { Home, SportsEsports, Article, TravelExplore, Info, Login, ArrowUpward } from "@mui/icons-material";

// const blogPosts = [
//   { 
//     title: "Mastering Budgeting", 
//     summary: "Learn the key strategies to manage your finances effectively.", 
//     date: "Feb 7, 2025",
//     image: "/assets/savings.jpg",
//     link: "/budgeting"
//   },
//   { 
//     title: "Investing for Beginners", 
//     summary: "A step-by-step guide to getting started with investments.", 
//     date: "Feb 8, 2025",
//     image: "/assets/investing.jpg",
//     link: "/investing"
//   },
//   { 
//     title: "Avoiding Common Financial Mistakes", 
//     summary: "Discover the pitfalls that can derail your financial success.", 
//     date: "Feb 9, 2025",
//     image: "/assets/money.jpg",
//     link: "/blog/mistakes"
//   },
// ];

// const Blog = () => {
//   return (
//     <Box sx={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh", background: "linear-gradient(135deg, #5e3967, #351742)", overflowY: "auto" }}>
      
//       {/* Navigation Bar */}
//       <AppBar
//         position="fixed"
//         sx={{
//           top: 15,
//           left: "5%",
//           width: "90%",
//           backgroundColor: "#331540",
//           display: "flex",
//           justifyContent: "center",
//           padding: "10px 0",
//           borderRadius: "100px",
//           height: "10%",
//         }}
//       >
//         <Toolbar sx={{ display: "flex", justifyContent: "space-between", width: "90%", margin: "0 auto" }}>
//           <Typography variant="h5" sx={{ fontFamily: "'Lilita One'", fontWeight: "bold", color: "#fff" }}>
//             Finance Quest
//           </Typography>
//           <Box sx={{ display: "flex", gap: 3 }}>
//             <IconButton component={Link} to="/" sx={{ color: "#fff" }}><Home /></IconButton>
//             <IconButton component={Link} to="/gamefeatures" sx={{ color: "#fff" }}><SportsEsports /></IconButton>
//             <IconButton component={Link} to="/blogs" sx={{ color: "#fff" }}><Article /></IconButton>
//             <IconButton component={Link} to="/explore" sx={{ color: "#fff" }}><TravelExplore /></IconButton>
//             <IconButton component={Link} to="/about" sx={{ color: "#fff" }}><Info /></IconButton>
//             <IconButton component={Link} to="/signup" sx={{ color: "#fff" }}><Login /></IconButton>
//           </Box>
//         </Toolbar>
//       </AppBar>

      // {/* Blog Page */}
      // <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 12, gap: 3 }}>
      //   <Typography variant="h3" sx={{ fontWeight: "bold", fontFamily: "'Gravitas One'", color: "#fff", mt: 5 }}>
      //     Finance Quest Blog
      //   </Typography>
      //   <Typography sx={{ fontSize: "1.2rem", fontFamily: "'Lilita One'", color: "#fff" }}>
      //     Stay updated with the latest financial tips and insights.
      //   </Typography>
        
//         <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4, gap: 3 , mb: 5}}>
//           {blogPosts.map((post, index) => (
//             <Card key={index} sx={{ 
//               width: "80%", 
//               backgroundColor: "#f5f5f5", 
//               p: 3, 
//               borderRadius: "10px", 
//               display: "flex", 
//               alignItems: "center", 
//               textAlign: "left", 
//               flexDirection: index % 2 === 0 ? "row" : "row-reverse"
//             }}>
//               <Box
//                 sx={{
//                   width: "150px",
//                   height: "150px",
//                   borderRadius: "10px",
//                   mx: 3,
//                   backgroundImage: `url(${post.image})`,
//                   backgroundSize: "cover",
//                   backgroundPosition: "center",
//                 }}
//               />
//               <CardContent sx={{ flex: 1 }}>
//                 {/* Clickable Arrow */}
//                 <IconButton component={Link} to={post.link} sx={{ color: "#8c2fc7", mt: 1 }}>
//                   <ArrowUpward sx={{ transform: `rotate(${index % 2 === 0 ? "45deg" : "-45deg"})` }} />
//                 </IconButton>
//                 <Typography variant="h5" sx={{ fontFamily: "'Fraunces'", color: "#331540" }}>
//                   {post.title}
//                 </Typography>
//                 <Typography sx={{ fontFamily: "'Lilita One'", mt: 1, color: "#451d6b" }}>
//                   {post.summary}
//                 </Typography>
//                 <Typography sx={{ fontFamily: "'Lilita One'", fontSize: "0.9rem", mt: 1, color: "#8c2fc7" }}>
//                   {post.date}
//                 </Typography>
//               </CardContent>
//             </Card>
//           ))}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Blog;

//WORKING CODE1
// import React from "react";
// import { Box, Typography, Paper, Grid } from "@mui/material";

// const FinanceTracker = () => {
//   return (
//     <Paper elevation={3} sx={{ maxWidth: 900, mx: "auto", p: 4, display: "flex" }}>
//       {/* Left Section */}
//       <Box sx={{ flex: 1, pr: 4 }}>
//         <Typography variant="h3" fontWeight={700} color="primary.main" gutterBottom>
//           YOU'LL
//         </Typography>
//         <Typography variant="h3" fontWeight={700} color="primary.main" gutterBottom>
//           RECEIVE
//         </Typography>
//         <Typography variant="subtitle1" fontWeight={600} color="text.secondary" gutterBottom>
//           3 TABS TO HELP YOU JUMPSTART YOUR FINANCES
//         </Typography>
        
//         <Box>
//           {["MONTHLY DASHBOARD", "PAYMENT CALENDAR", "SUBSCRIPTION TRACKER"].map((title, index) => (
//             <Box key={index} sx={{ mb: 3 }}>
//               <Typography variant="h6" fontWeight={700}>
//                 {`${index + 1}️⃣ ${title}`}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 {index === 0 && "Make a budget and keep track of all your transactions, including your income, bills, savings, investments, and debt."}
//                 {index === 1 && "Automatically updating smart calendar that adjusts to any month or year and helps you track your bills & debt due dates."}
//                 {index === 2 && "Calculates your monthly and annual subscription costs and categorizes all subscriptions. Helps you cut unnecessary expenses."}
//               </Typography>
//             </Box>
//           ))}
//         </Box>
//       </Box>

//       {/* Right Section */}
//       <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#5e3967", borderRadius: 2, p: 2 }}>
//         <Box
//           component="img"
//           src="../assets/background.png"
//           alt="Finance Planner Preview"
//           sx={{ width: "100%", borderRadius: 2 }}
//         />
//       </Box>
//     </Paper>
//   );
// };

// export default FinanceTracker;

// import React from "react";
// import { Box, Typography, Paper, Divider } from "@mui/material";

// const FinanceTracker = () => {
//   return (
//     <Paper elevation={3} sx={{ maxWidth: 900, mx: "auto", p: 4, display: "flex", alignItems: "center" }}>
//       {/* Left Section */}
//       <Box sx={{ flex: 1, pr: 4 }}>
//         <Typography variant="h3" fontWeight={700} color="primary.main" gutterBottom>
//           YOU'LL
//         </Typography>
//         <Typography variant="h3" fontWeight={700} color="primary.main" gutterBottom>
//           RECEIVE
//         </Typography>
//         <Typography variant="subtitle1" fontWeight={600} color="text.secondary" gutterBottom>
//           3 TABS TO HELP YOU JUMPSTART YOUR FINANCES
//         </Typography>
        
//         <Box>
//           {["MONTHLY DASHBOARD", "PAYMENT CALENDAR", "SUBSCRIPTION TRACKER"].map((title, index) => (
//             <Box key={index} sx={{ mb: 3 }}>
//               <Typography variant="h6" fontWeight={700}>
//                 {`${index + 1}️⃣ ${title}`}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 {index === 0 && "Make a budget and keep track of all your transactions, including your income, bills, savings, investments, and debt."}
//                 {index === 1 && "Automatically updating smart calendar that adjusts to any month or year and helps you track your bills & debt due dates."}
//                 {index === 2 && "Calculates your monthly and annual subscription costs and categorizes all subscriptions. Helps you cut unnecessary expenses."}
//               </Typography>
//             </Box>
//           ))}
//         </Box>
//       </Box>

//       {/* Divider */}
//       <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

//       {/* Right Section */}
//       <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#F3E5F5", borderRadius: 2, p: 2, height: "100%" }}>
//         <Box
//           component="img"
//           src="../assets/catmoney.jpg"
//           alt="Finance Planner Preview"
//           sx={{ width: "100%", height: "auto", borderRadius: 2 }}
//         />
//       </Box>
//     </Paper>
//   );
// };

// export default FinanceTracker;

//WORKING CODE2
// import React from "react";
// import { Link } from "react-router-dom";
// import { Box, Typography, AppBar, Toolbar, IconButton, Paper, Divider } from "@mui/material";
// import { Home, SportsEsports, Article, TravelExplore, Info, Login } from "@mui/icons-material";

// const FinanceTracker = () => {
//   return (
//     <Box
//       sx={{
//         position: "absolute",
//         top: 0,
//         left: 0,
//         width: "100vw",
//         height: "100vh",
//         background: "linear-gradient(135deg, #5e3967, #351742)",
//         overflowY: "auto",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         paddingBottom: 5,
//       }}
//     >
//       <AppBar
//         position="fixed"
//         sx={{
//           top: 15,
//           left: "5%",
//           width: "90%",
//           backgroundColor: "#331540",
//           display: "flex",
//           justifyContent: "center",
//           padding: "10px 0",
//           borderRadius: "100px",
//           height: "10%",
//         }}
//       >
//         <Toolbar sx={{ display: "flex", justifyContent: "space-between", width: "90%", margin: "0 auto" }}>
//           <Typography variant="h5" sx={{ fontFamily: "'Lilita One'", fontWeight: "bold", color: "#fff" }}>
//             Finance Quest
//           </Typography>
//           <Box sx={{ display: "flex", gap: 3 }}>
//             <IconButton component={Link} to="/" sx={{ color: "#fff" }}><Home /></IconButton>
//             <IconButton component={Link} to="/gamefeatures" sx={{ color: "#fff" }}><SportsEsports /></IconButton>
//             <IconButton component={Link} to="/blogs" sx={{ color: "#fff" }}><Article /></IconButton>
//             <IconButton component={Link} to="/explore" sx={{ color: "#fff" }}><TravelExplore /></IconButton>
//             <IconButton component={Link} to="/about" sx={{ color: "#fff" }}><Info /></IconButton>
//             <IconButton component={Link} to="/signup" sx={{ color: "#fff" }}><Login /></IconButton>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 12, gap: 3 }}>
//         <Typography variant="h3" sx={{ fontWeight: "bold", fontFamily: "'Gravitas One'", color: "#fff", mt: 10 }}>
//           Finance Tracker
//         </Typography>
//         <Typography sx={{ fontSize: "1.2rem", fontFamily: "'Lilita One'", color: "#fff", textAlign: "center" }}>
//           Keep track of your expenses and manage your finances with ease.
//         </Typography>
//       </Box>

//       <Paper elevation={3} sx={{ maxWidth: 900, mx: "auto", mt: 8, p: 4, display: "flex", alignItems: "center", borderRadius: 3 }}>
//         <Box sx={{ flex: 1, fontFamily: "'Lilita One'", pr: 4 }}>
//           <Typography variant="h2" sx={{ fontWeight: 700, color: "#5e3967", fontFamily: "'Lilita One'" }} gutterBottom>
//             YOU'LL
//           </Typography>
//           <Typography variant="h2" sx={{ fontWeight: 700, color: "#5e3967", fontFamily: "'Lilita One'" }} gutterBottom>
//             RECEIVE
//           </Typography>
//           <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "text.secondary" }} gutterBottom>
//             3 TABS TO HELP YOU JUMPSTART YOUR FINANCES
//           </Typography>
//           <Box>
//             {["MONTHLY DASHBOARD", "PAYMENT CALENDAR", "SUBSCRIPTION TRACKER"].map((title, index) => (
//               <Box key={index} sx={{ display: "flex", alignItems: "flex-start", mb: 3 }}>
//                 <Box
//                   sx={{
//                     width: 24,
//                     height: 24,
//                     borderRadius: "50%",
//                     border: "2px solid #A0978D",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: "#A0978D",
//                     fontWeight: "bold",
//                     fontSize: "14px",
//                     flexShrink: 0,
//                     mr: 1.5,
//                   }}
//                 >
//                   {index + 1}
//                 </Box>
//                 <Box>
//                   <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "16px", color: "#5E514D" }}>
//                     {title}
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: "#A0978D", fontSize: "14px" }}>
//                     {index === 0 && "Make a budget and keep track of all your transactions, including your income, bills, savings, investments, and debt."}
//                     {index === 1 && "Automatically updating smart calendar that adjusts to any month or year and helps you track your bills & debt due dates."}
//                     {index === 2 && "Calculates your monthly and annual subscription costs and categorizes all subscriptions. Helps you cut unnecessary expenses."}
//                   </Typography>
//                 </Box>
//               </Box>
//             ))}
//           </Box>
//         </Box>

//         <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

//         <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#351742", borderRadius: 2, p: 2, height: "100%" }}>
//           <Box component="img" src="/assets/catmoney.jpg" alt="Finance Planner Preview" sx={{ width: "100%", height: "auto", borderRadius: 2 }} />
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default FinanceTracker;

// import React from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { Box, Typography, AppBar, Toolbar, IconButton, Paper, Divider } from "@mui/material";
// import { Home, SportsEsports, Article, TravelExplore, Info, Login, ArrowUpward } from "@mui/icons-material";

// const FinanceTracker = () => {
//   return (
//     <Box
//       sx={{
//         position: "absolute",
//         top: 0,
//         left: 0,
//         width: "100vw",
//         height: "100vh",
//         background: "linear-gradient(135deg, #5e3967, #351742)",
//         overflowY: "auto",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         paddingBottom: 5,
//       }}
//     >
//       <AppBar
//         position="fixed"
//         sx={{
//           top: 15,
//           left: "5%",
//           width: "90%",
//           backgroundColor: "#331540",
//           display: "flex",
//           justifyContent: "center",
//           padding: "10px 0",
//           borderRadius: "100px",
//           height: "10%",
//         }}
//       >
//         <Toolbar sx={{ display: "flex", justifyContent: "space-between", width: "90%", margin: "0 auto" }}>
//           <Typography variant="h5" sx={{ fontFamily: "'Lilita One'", fontWeight: "bold", color: "#fff" }}>
//             Finance Quest
//           </Typography>
//           <Box sx={{ display: "flex", gap: 3 }}>
//             <IconButton component={Link} to="/" sx={{ color: "#fff" }}><Home /></IconButton>
//             <IconButton component={Link} to="/gamefeatures" sx={{ color: "#fff" }}><SportsEsports /></IconButton>
//             <IconButton component={Link} to="/blogs" sx={{ color: "#fff" }}><Article /></IconButton>
//             <IconButton component={Link} to="/explore" sx={{ color: "#fff" }}><TravelExplore /></IconButton>
//             <IconButton component={Link} to="/about" sx={{ color: "#fff" }}><Info /></IconButton>
//             <IconButton component={Link} to="/signup" sx={{ color: "#fff" }}><Login /></IconButton>
//           </Box>
//         </Toolbar>
//       </AppBar>

//       <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 12, gap: 3 }}>
//         <Typography variant="h3" sx={{ fontWeight: "bold", fontFamily: "'Gravitas One'", color: "#fff", mt: 10 }}>
//           Finance Tracker
//         </Typography>
//         <Typography sx={{ fontSize: "1.2rem", fontFamily: "'Lilita One'", color: "#fff", textAlign: "center" }}>
//           Keep track of your expenses and manage your finances with ease.
//         </Typography>
//       </Box>

//       <Paper
//         elevation={3}
//         sx={{
//           maxWidth: 900,
//           mx: "auto",
//           mt: 8,
//           p: 4,
//           display: "flex",
//           alignItems: "center",
//           borderRadius: 3,
//           flexDirection: { xs: "column", md: "row" },
//           mb: 6,
//         }}
//       >
//         <Box sx={{ flex: 1, fontFamily: "'Lilita One'", pr: 4 }}>
//           <Typography
//             variant="h2"
//             sx={{
//               fontWeight: 700,
//               color: "#5e3967",
//               fontFamily: "'Lilita One'",
//               textShadow: "2px 2px 0px #ffffff, 4px 4px 0px #c2b5dd",
//               display: "inline-block",
//               position: "relative",
//             }}
//             gutterBottom
//           >
//             YOU'LL
//             <Box
//               component="span"
//               sx={{
//                 position: "absolute",
//                 top: "-5px",
//                 right: "-30px",
//                 fontSize: "0.5em",
//                 color: "#c2b5dd",
//               }}
//             >
//               💜
//             </Box>
//           </Typography>

//           <Typography
//             variant="h2"
//             sx={{
//               fontWeight: 700,
//               color: "#5e3967",
//               fontFamily: "'Lilita One'",
//               textShadow: "2px 2px 0px #ffffff, 4px 4px 0px #c2b5dd",
//             }}
//             gutterBottom
//           >
//             RECEIVE
//           </Typography>

//           <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "text.secondary" }} gutterBottom>
//             3 TABS TO HELP YOU JUMPSTART YOUR FINANCES
//           </Typography>

//           {["MONTHLY DASHBOARD", "PAYMENT CALENDAR", "SUBSCRIPTION TRACKER"].map((title, index) => (
//             <Box key={index} sx={{ display: "flex", alignItems: "flex-start", mb: 3 }}>
//               <Box
//                 sx={{
//                   width: 24,
//                   height: 24,
//                   borderRadius: "50%",
//                   border: "2px solid #A0978D",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   color: "#A0978D",
//                   fontWeight: "bold",
//                   fontSize: "14px",
//                   flexShrink: 0,
//                   mr: 1.5,
//                 }}
//               >
//                 {index + 1}
//               </Box>
//               <Box>
//                 <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "16px", color: "#5E514D" }}>
//                   {title}
//                 </Typography>
//                 <Typography variant="body2" sx={{ color: "#A0978D", fontSize: "14px" }}>
//                   {index === 0 && "Make a budget and keep track of all your transactions, including your income, bills, savings, investments, and debt."}
//                   {index === 1 && "Automatically updating smart calendar that adjusts to any month or year and helps you track your bills & debt due dates."}
//                   {index === 2 && "Calculates your monthly and annual subscription costs and categorizes all subscriptions. Helps you cut unnecessary expenses."}
//                 </Typography>
//               </Box>
//               <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
//                 <IconButton sx={{ color: "#8c2fc7", mt: 1 }}>
//                   <ArrowUpward sx={{ transform: `rotate(${index % 2 === 0 ? "45deg" : "-45deg"})`, fontSize: "1.5rem" }} />
//                 </IconButton>
//               </motion.div>
//             </Box>
//           ))}
//         </Box>

//         <Divider orientation="vertical" flexItem sx={{ mx: 2, display: { xs: "none", md: "block" } }} />

//         <Box
//           sx={{
//             flex: 1,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             bgcolor: "#351742",
//             borderRadius: 2,
//             p: 2,
//             height: "100%",
//           }}
//         >
//           <Box
//             component="img"
//             src="/assets/catmoney.jpg"
//             alt="Finance Planner Preview"
//             sx={{
//               width: "100%",
//               height: "auto",
//               borderRadius: 2,
//             }}
//           />
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default FinanceTracker;


import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Box, Typography, AppBar, Toolbar, IconButton, Paper, Divider } from "@mui/material";
import { Home, SportsEsports, Article, TravelExplore, Info, Login, ArrowUpward } from "@mui/icons-material";

const FinanceTracker = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(135deg, #5e3967, #351742)",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: 5,
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          top: 15,
          left: "5%",
          width: "90%",
          backgroundColor: "#331540",
          display: "flex",
          justifyContent: "center",
          padding: "10px 0",
          borderRadius: "100px",
          height: "10%",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", width: "90%", margin: "0 auto" }}>
          <Typography variant="h5" sx={{ fontFamily: "'Lilita One'", fontWeight: "bold", color: "#fff" }}>
            Finance Quest
          </Typography>
          <Box sx={{ display: "flex", gap: 3 }}>
            <IconButton component={Link} to="/" sx={{ color: "#fff" }}><Home /></IconButton>
            <IconButton component={Link} to="/gamefeatures" sx={{ color: "#fff" }}><SportsEsports /></IconButton>
            <IconButton component={Link} to="/blogs" sx={{ color: "#fff" }}><Article /></IconButton>
            <IconButton component={Link} to="/explore" sx={{ color: "#fff" }}><TravelExplore /></IconButton>
            <IconButton component={Link} to="/about" sx={{ color: "#fff" }}><Info /></IconButton>
            <IconButton component={Link} to="/signup" sx={{ color: "#fff" }}><Login /></IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 12, gap: 3 }}>
        <Typography variant="h3" sx={{ fontWeight: "bold", fontFamily: "'Gravitas One'", color: "#fff", mt: 10 }}>
          Finance Tracker
        </Typography>
        <Typography sx={{ fontSize: "1.2rem", fontFamily: "'Lilita One'", color: "#fff", textAlign: "center" }}>
          Keep track of your expenses and manage your finances with ease.
        </Typography>
      </Box>

      <Paper
        elevation={3}
        sx={{
          maxWidth: 900,
          mx: "auto",
          mt: 8,
          p: 4,
          display: "flex",
          alignItems: "center",
          borderRadius: 3,
          flexDirection: { xs: "column", md: "row" },
          mb: 6,
        }}
      >
        <Box sx={{ flex: 1, fontFamily: "'Lilita One'", pr: 4 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              color: "#5e3967",
              fontFamily: "'Lilita One'",
              textShadow: "2px 2px 0px #ffffff, 4px 4px 0px #c2b5dd",
              display: "inline-block",
              position: "relative",
            }}
            gutterBottom
          >
            YOU'LL
            <Box
              component="span"
              sx={{
                position: "absolute",
                top: "-5px",
                right: "-30px",
                fontSize: "0.5em",
                color: "#c2b5dd",
              }}
            >
              💜
            </Box>
          </Typography>
          
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              color: "#5e3967",
              fontFamily: "'Lilita One'",
              textShadow: "2px 2px 0px #ffffff, 4px 4px 0px #c2b5dd",
              display: "flex",
              alignItems: "center",
            }}
            gutterBottom
          >
            RECEIVE
            <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
              <IconButton component={Link} to="/monthlydashboard" sx={{ color: "#8c2fc7", mt: 1, ml: 1 }}>
                <ArrowUpward sx={{ transform: "rotate(45deg)", fontSize: "2rem" }} />
              </IconButton>
            </motion.div>
            
          </Typography>

          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "text.secondary" }} gutterBottom>
            3 TABS TO HELP YOU JUMPSTART YOUR FINANCES
          </Typography>

          {["MONTHLY DASHBOARD", "PAYMENT CALENDAR", "SUBSCRIPTION TRACKER"].map((title, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "flex-start", mb: 3 }}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  border: "2px solid #A0978D",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#A0978D",
                  fontWeight: "bold",
                  fontSize: "14px",
                  flexShrink: 0,
                  mr: 1.5,
                }}
              >
                {index + 1}
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "16px", color: "#5E514D" }}>
                  {title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#A0978D", fontSize: "14px" }}>
                  {index === 0 && "Make a budget and keep track of all your transactions, including your income, bills, savings, investments, and debt."}
                  {index === 1 && "Automatically updating smart calendar that adjusts to any month or year and helps you track your bills & debt due dates."}
                  {index === 2 && "Calculates your monthly and annual subscription costs and categorizes all subscriptions. Helps you cut unnecessary expenses."}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <Divider orientation="vertical" flexItem sx={{ mx: 2, display: { xs: "none", md: "block" } }} />

        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#351742",
            borderRadius: 2,
            p: 2,
            height: "100%",
          }}
        >
          <Box
            component="img"
            src="/assets/catmoney.png"
            alt="Finance Planner Preview"
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: 2,
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default FinanceTracker;