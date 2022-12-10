import React ,{ useState, useEffect }from "react";
import { useColorMode, useColorModeValue, Box, Button,Text } from "@chakra-ui/react";
import "./AdminScreens.css";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
function AdminScreens() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("gray.300", "gray.700");
  let navigate = useNavigate();
  const bg2 = useColorModeValue("gray.200", "gray.800");


  const adminscreenadd=()=>{
    navigate('/admin/screens/add')
  }
  const loggedInAdmin = localStorage.getItem("admindetails");
  const AdminDetails = JSON.parse(loggedInAdmin);
  const [screens,setScreen]=useState([]);
  console.log(AdminDetails.data.d[0].theatre_id);
  useEffect(() => {
    Axios.post("http://localhost:3002/getscreen", {
      t_id: AdminDetails.data.d[0].theatre_id,
    }).then((response) => {
      console.log(response.data);
      setScreen(response.data);

    });
  }, []);
  return (
    <Box className="admin-dashboaed-m" bg={bg}>
      <Box className="admin-dashboard-screen-main">
        <Button
          leftIcon={<AddIcon />}
          colorScheme="green"
          variant="solid"
          size="md"
          onClick={adminscreenadd}
        >
          Add screen
        </Button>
      </Box>
      <Box className="admin-dashboard-screen-screens">
        <Box
          textAlign="center"
          fontSize="27px"
          bg={bg2}
          letterSpacing="2px"
          marginLeft="10px"
          marginRight="10px"
          width="50%"
          alignItems="center"
          p="1px"
          borderRadius="10px"
        >
          <Text>All screens</Text>
        </Box>
        <Box
          width="100%"
          className="admin-dashboard-screen-screens-main"
      
        >
          {screens.map((e, index) => {
            return (
              <Box
                key={index}
                bg={bg2}
                className="admin-dashboard-screen-screensdiv"
                width="250px"
                height="250px"
                m="20px"

           
              >
                <Box className="admin-dashboard-screen-screensdiv2"    >
                <br></br>
                  <Text letterSpacing="1px" fontSize="20px" fontWeight="400">
                  Screen 
                    
                  </Text>
                  <Text letterSpacing="1px"fontWeight="600"className="screennocircle" fontSize="35px" bg={bg}>
               {e.screen_no}
                    
                  </Text>
                  <br></br>
                  <Text letterSpacing="1px" fontSize="20px" fontWeight="400">
                    SEATLAYOUT
                  </Text>
            
                  <Text letterSpacing="1px"fontSize="20px"  fontWeight="600" className="screennocircle2" bg={bg} >
                {e.seatlayout_name}
                  </Text>
                  <br></br>
                </Box>
                <Box width="100%">
                  <Button
                    width="100%"
                    size="md"
                    borderRadius="0px"
                    colorScheme="red"
                    borderBottomRightRadius="20px"
                    leftIcon={<DeleteIcon />}
                    // onClick={() => delseatlayout(e.seatlayout_name, index)}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
        
            );
          })}  
        </Box>
      </Box>
    </Box>
  );
}

export default AdminScreens;
