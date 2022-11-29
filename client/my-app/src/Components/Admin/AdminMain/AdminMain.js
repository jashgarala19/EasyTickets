import React, { useState, useEffect } from "react";
import "./AdminMain.css";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useColorMode,
  useColorModeValue,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Tooltip
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { HamburgerIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
function AdminMain(props) {



  let navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("gray.300", "gray.700");

  const [NavColor, setNavColor] = useState();
 

  const changenav = (e) => {
    if (e == "movies") {
      navigate("/admin/movies");
      setNavColor(1);
    } else if (e == "dashboard") {
      navigate("/admin/dashboard");
      setNavColor(0);
    } else if (e == "seats") {
      navigate("/admin/seatlayout");
      setNavColor(2);
    } else if (e == "screens") {
      navigate("/admin/screens");
      setNavColor(3);
    }
  };

  const loggedInAdmin= localStorage.getItem("admindetails");
  const AdminDetails=JSON.parse(loggedInAdmin);
  const AdminTheatreId = AdminDetails.data.d[0].theatre_id;

  const [theatreName,setTheatreName]=useState();

  useEffect(()=>{


    setNavColor(props.btncolor) 
    Axios.post("http://localhost:3002/getadmindetails",{id:AdminTheatreId}).then((response) => {
      console.log(response.data)
      setTheatreName(response.data.theatre_Name)
    });



    


  }, []);

  const logoutadmin=()=>{


    navigate("/admin/login")
  }

 
  return (
    <Box className="admin-dashboard-main">
      <Box className="admin-dashboard">
        <Box className="admin-dashboard-container">
          <Box className="admin-dashboard-navbar" bg={bg}>
            <Box className="admin-dashboard-navbar-profile">
            <h1>{theatreName}</h1>
            <Tooltip hasArrow label='Admin' >
            <Avatar>
    <AvatarBadge borderColor='papayawhip' bg='green' boxSize='1.25em' />
  </Avatar>
  </Tooltip>

            </Box>
            <Box className="admin-dashboard-navbar-menu" bg={bg}>
              {/* <h1 className="admin-dashboard-navbar-menu-title">Menu</h1> */}
              <Button
                colorScheme="gray"
                borderRadius="0px"
                width="100%"
                s
                mt="5px"
                size="lg"
                onClick={() => changenav("dashboard")}
              >
                Dashboard
              </Button>

              <Button
                colorScheme="green"
                borderRadius="0px"
                width="100%"
                size="lg"
                // borderBottom="1px"
                variant={NavColor == 1 && NavColor != 0 ? "solid" : "ghost"}
                borderColor=""
                onClick={() => changenav("movies")}
              >
                {" "}
                Movies
              </Button>
              <Button
                colorScheme="green"
                variant={NavColor == 2 && NavColor != 0 ? "solid" : "ghost"}
                borderRadius="0px"
                width="100%"
                size="lg"
                // borderBottom="1px"
                onClick={() => changenav("seats")}
              >
                {" "}
                Seat Layouts
              </Button>
              <Button
                colorScheme="green"
                variant={NavColor == 3 && NavColor != 0 ? "solid" : "ghost"}
                borderRadius="0px"
                width="100%"
                size="lg"
                // borderBottom="1px"
                onClick={() => changenav("screens")}
              >
                Screens
              </Button>
            </Box>
            <Box className='admin-dashboard-navbar-logoutdiv'>
            <Button
                
               
                borderRadius="0px"
                width="100%"
                size="lg"
                colorScheme='red'
                borderBottomRadius="10px"
                onClick={logoutadmin}
                // borderBottom="1px"
               
              >
                Log out
              </Button>
            </Box>
          </Box>
          <Box className="admin-dashboard-panel">
            <Box className="admin-dashboaed-header" bg={bg}>
              
           
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<HamburgerIcon />}
                  variant="solid"
                  colorScheme="gray"
                />
                <MenuList p="10px">
                  <MenuItem onClick={toggleColorMode}>
                    {colorMode === "light" ? "Dark" : "Light"} Mode
                  </MenuItem>
                  <MenuItem onClick={() => changenav("dashboard")}>
                    Dashboard
                  </MenuItem>
                  {/* <MenuItem variant="solid" colorScheme="red" color="red.200">
                    Log out
                  </MenuItem> */}
                </MenuList>
              </Menu>
            </Box>

            {props.p}   
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AdminMain;
