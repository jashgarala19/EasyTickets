import React from "react";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    IconButton,
    useColorMode,
    useColorModeValue,
    Box
  } from "@chakra-ui/react";
function AdminDashboard() {
    const { colorMode, toggleColorMode } = useColorMode();
    const bg = useColorModeValue('gray.300', 'gray.700')
  return    <Box className="admin-dashboaed-m" bg={bg} >


    <h1>Dashboard</h1>
  </Box>;
}

export default AdminDashboard;
