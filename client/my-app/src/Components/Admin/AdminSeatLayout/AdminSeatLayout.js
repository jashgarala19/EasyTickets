import React, { useState, useEffect } from "react";
import {
  useColorMode,
  useColorModeValue,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";
import "./AdminSeatLayout.css";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
function AdminSeatLayout() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [allseatlayouts, setSeatLayouts] = useState([]);
  let navigate = useNavigate();
  const bg = useColorModeValue("gray.300", "gray.700");
  const bg2 = useColorModeValue("gray.200", "gray.800");

  const createseatlayout = () => {
    navigate("/admin/seatlayout/add");
  };

  const loggedInAdmin = localStorage.getItem("admindetails");
  const AdminDetails = JSON.parse(loggedInAdmin);
  // console.log(AdminDetails.data.d[0].theatre_id);

  useEffect(() => {
    Axios.post("http://localhost:3002/getseatlayout", {
      t_id: AdminDetails.data.d[0].theatre_id,
    }).then((response) => {
      // console.log(response.data);
      setSeatLayouts(response.data);
    });
  }, [allseatlayouts]);

  const delseatlayout = (e, index) => {
    var self = this;
    console.log(index);
    // setSeatLayouts(allseatlayouts.filter(item => item.index!==index))
    console.log(allseatlayouts);

    // setSeatLayouts([
    //   ...allseatlayouts.slice(0, index),
    //   ...allseatlayouts.slice(index + 1, allseatlayouts.length),
    // ]);
    Axios.post("http://localhost:3002/deleteseatlayout", {
      s_name: e,
    }).then((response) => {
      console.log(response.data);
      if (response.data == "err") {
        alert("Screen is using these seat layout");
      } else {
        this.setSeatLayouts([
          ...allseatlayouts.slice(0, index),
          ...allseatlayouts.slice(index + 1, allseatlayouts.length),
        ]);
      }
    });
  };
  return (
    <Box className="admin-dashboaed-m" bg={bg}>
      <Box className="admin-dashboard-seatlayout-addseatlayoutdiv">
        <Button
          leftIcon={<AddIcon />}
          colorScheme="green"
          variant="solid"
          size="md"
          onClick={createseatlayout}
        >
          Create Seat Layout
        </Button>
      </Box>

      <Box className="admin-dashboard-seatlayout-allseatlayouts">
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
          <Text>All seat layouts</Text>
        </Box>
        <Box
          width="100%"
          className="admin-dashboard-seatlayout-allseatlayouts-main"
        >
          {allseatlayouts.map((e, index) => {
            return (
              <Box
                key={index}
                bg={bg2}
                className="admin-dashboard-seatlayout-allseatlayoutsdiv"
                width="250px"
                height="200px"
                m="20px"
              >
                <Box className="admin-dashboard-seatlayout-allseatlayoutsdiv2">
                  <Text letterSpacing="1px" fontSize="20px" fontWeight="600">
                    {e.seatlayout_name}{" "}
                  </Text>
                </Box>
                <Box width="100%">
                  <Button
                    width="100%"
                    size="md"
                    borderRadius="0px"
                    colorScheme="red"
                    borderBottomRightRadius="20px"
                    leftIcon={<DeleteIcon />}
                    onClick={() => delseatlayout(e.seatlayout_name, index)}
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

export default AdminSeatLayout;
