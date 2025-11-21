// import React, { useContext, useEffect, useState } from "react";
// import {
//   Box,
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Typography,
//   Button,
//   IconButton,
//   useMediaQuery,
//   useTheme
// } from "@mui/material";

// import HomeIcon from "@mui/icons-material/Home";
// import LinkIcon from "@mui/icons-material/Link";
// import QrCodeIcon from "@mui/icons-material/QrCode";
// import AddIcon from "@mui/icons-material/Add";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";

// import { Outlet, useNavigate } from "react-router-dom";
// import AppContext from "../Context/context.jsx";

// const Sidebar = () => {
//   const drawerWidth = 240;
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const { user } = useContext(AppContext);

//   useEffect(() => {
//     console.log(user);
//   }, [user]);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const navItems = [
//     { label: "Create New", icon: <AddIcon />, path: "/home/new" },
//     { label: "Home", icon: <HomeIcon />, path: "/home" },
//     { label: "Urls", icon: <LinkIcon />, path: "/home/urls" },
//     { label: "QR Codes", icon: <QrCodeIcon />, path: "/home/qrcodes" },
//   ];

//   const drawer = (
//     <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           p: 2,
//           bgcolor: "white",
//         }}
//       >
//         <Typography variant="h6" sx={{ color: "black" }}>Shortify</Typography>
//         {isMobile && (
//           <IconButton onClick={handleDrawerToggle}>
//             <CloseIcon />
//           </IconButton>
//         )}
//       </Box>
//       <List>
//         {navItems.map((item, index) => {
//           const selected = window.location.pathname === item.path;
//           return (
//             <ListItem
//               key={index}
//               disablePadding
//               sx={{
//                 backgroundColor: selected ? "blue" : "transparent",
//                 color: selected ? "white" : "black",
//                 borderRadius: "8px",
//                 margin: "8px 0",
//               }}
//             >
//               <ListItemButton
//                 onClick={() => {
//                   navigate(item.path);
//                   if (isMobile) handleDrawerToggle(); // Close drawer on mobile
//                 }}
//                 sx={{
//                   "&:hover": {
//                     backgroundColor: "rgba(0, 0, 255, 0.1)",
//                   },
//                 }}
//               >
//                 {item.icon && (
//                   <ListItemIcon sx={{ color: "inherit" }}>
//                     {item.icon}
//                   </ListItemIcon>
//                 )}
//                 <ListItemText primary={item.label} />
//               </ListItemButton>
//             </ListItem>
//           );
//         })}
//       </List>
//     </Box>
//   );

//   return (
//     <Box sx={{ display: "flex", minHeight: "100vh" }}>
//       {/* Toggle button on mobile */}
//       {isMobile && !mobileOpen && (
//         <IconButton
//           onClick={handleDrawerToggle}
//           sx={{
//             position: "fixed",
//             top: 60,
//             left: 8,
//             zIndex: 1300,
//             backgroundColor: "white",
//             borderRadius: 1,
//           }}
//         >
//           <MenuIcon />
//         </IconButton>
//       )}

//       {/* Responsive Drawer */}
//       <Box
//         component="nav"
//         sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//       >
//         {/* Mobile Drawer */}
//         <Drawer
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{ keepMounted: true }}
//           sx={{
//             display: { xs: "block", sm: "none" },
//             "& .MuiDrawer-paper": { width: drawerWidth },
//           }}
//         >
//           {drawer}
//         </Drawer>

//         {/* Desktop Drawer */}
//         <Drawer
//           variant="permanent"
//           sx={{
//             display: { xs: "none", sm: "block" },
//             "& .MuiDrawer-paper": {
//               width: drawerWidth,
//               boxSizing: "border-box",
//             },
//           }}
//           open
//         >
//           {drawer}
//         </Drawer>
//       </Box>

//       {/* Main Content */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 2,
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//           mt: isMobile ? 6 : 0,
//         }}
//       >
//         <Outlet />
//       </Box>
//     </Box>
//   );
// };

// export default Sidebar;

import React from 'react'

const Sidebar = () => {
  return (
    <div>Sidebar</div>
  )
}

export default Sidebar