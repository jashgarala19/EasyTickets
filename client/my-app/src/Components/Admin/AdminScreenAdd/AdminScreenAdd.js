import React, { useState, useEffect } from "react";
import {
  useColorModeValue,
  Box,
  Input,
  Button,
  InputGroup,
  InputLeftAddon,
  Text,
  Select
} from "@chakra-ui/react";
import Axios from "axios";
import "./AdminScreenAdd.css";

import { useForm, Controller, useFieldArray, useWatch } from "react-hook-form";
export default function AdminScreenAdd() {
  const bg = useColorModeValue("gray.300", "gray.700");
  const [allseatlayouts, setSeatLayouts] = useState([]);
  const loggedInAdmin= localStorage.getItem("admindetails");
  const AdminDetails=JSON.parse(loggedInAdmin);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    Axios.post("http://localhost:3002/getseatlayout", {
      t_id: AdminDetails.data.d[0].theatre_id,
    }).then((response) => {

      setSeatLayouts(response.data);
    });
  }, []);

  const[v,setV]=useState();
  
  const onSubmit = (data) => {
    // setTitle(data.seattype);

    Axios.post("http://localhost:3002/addscreen",{

   details:data,t_id:AdminDetails.data.d[0].theatre_id
    }).then((response) => {

    })

   

  console.log(data)
  };
  return (
    <Box className="admin-dashboaed-m " bg={bg} p="10px">
      <Text fontSize="3xl" m='5px' textAlign="center">Add screen</Text>
 
      <form   onSubmit={handleSubmit(onSubmit)}>
      <Box className="screenaddformmain">
      <Box  className='screenformlayout'>
        <InputGroup >
          <InputLeftAddon children="Screen" />
          <Input placeholder="Screen Number"type="number"    {...register("sreen_number")}/>
        </InputGroup>
     <Text fontSize="1xl" mt='17px' mb='5px' textAlign="center">Select Seat Layout for screen</Text>
        <Select   placeholder="Select seatlayout"{...register("screen_layout")} >

          {
            allseatlayouts.map((e)=>{
              return(
                <option value={e.seatlayout_name} >{e.seatlayout_name} </option>
              )
            })
          
          }

          

  
</Select>
<Button colorScheme='green' mt='17px' width='100%' type='submit'>Add Screen</Button>
</Box>
</Box>
      </form>

      </Box>
    
  );
}
