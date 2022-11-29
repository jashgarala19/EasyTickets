import React, { useState, useEffect, useMemo } from "react";

import {
  Tooltip,
  useColorMode,
  useColorModeValue,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Input,
  Modal,
  Divider,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  FormLabel,Tag

} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { HamburgerIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Axios from "axios";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import "./MovieUserPayment.css";

function MovieUserPayment() {

    const bg = useColorModeValue("gray.300", "gray.700");
    const moviebg = useColorModeValue("gray.400", "gray.900");
    const moviebg2 = useColorModeValue("gray.400", "gray.700");


    const moviebg3 = useColorModeValue("gray.400", "gray.800");
    const location = useLocation();
    const [moviename,setMovieName]=useState();
    const [theatredetails,setTheatreDetails]=useState([]);
    const [moviedate,setMovieDate]=useState();
    const [movietime,setMovieTime]=useState();
    const [seats,selectedSeats] = useState()
    const [ total,setTotal]=useState();
    const[s,setS]=useState([]);
    const [userdetails,setUserDetails]=useState();
    const [userdetails2,setUserDetails2]=useState();
    // console.log(moviedate[0][1])


    const userInfo = localStorage.getItem("userInfo");
    const l = JSON.parse(userInfo);


    useEffect(()=>{
      
        
        Axios.post("http://localhost:3002/getuserdetails", {

        user_mobile:l

          
          }).then((response) => {
            console.log(response.data)
            // console.log(response.data.Email)
            // setUserDetails(response.data.Email);
            setUserDetails(response.data.Email)
            setUserDetails2(response.data.Mobile_No)
          
          });

console.log(location.state.selectedseats)
        setMovieName(location.state.movie_name)
        setTheatreDetails(location.state.theatre_info)
        setMovieDate(location.state.movie_date)
        setMovieTime(location.state.movie_time)

    setTotal(location.state.selectedseats['total'])

   Object.keys(location.state.selectedseats).forEach(function(key,index){

    console.log(key,index)
 
    if(location.state.selectedseats[key]==true)
    {
        s.push(key)
        console.log("aaa")
        
    }
    
   })



    },[s])

  return <Box className="parent">

  <Box className="child" bg={moviebg2} >

    <Text fontSize="20px" fontWeight="1">Booking Summary</Text>
<Box className="MovieDetailsPayment" bg={moviebg3} p="15px">
    
<Text fontSize="30px" fontWeight="bold">{moviename}</Text>

<Text fontSize="25px" fontWeight="400">{theatredetails.theatre_Name} {theatredetails.city_Name} {moviedate} {movietime}</Text>

<Box className="seatprice">
    <Text  fontSize="25px">Seat No:</Text>
{
    s.map((e)=>{return(<Text  fontSize="25px" bg={moviebg} p="10px">{e}</Text>)})
}
</Box>

</Box>

<Text fontSize="20px" fontWeight="1">Contact Details</Text>
<Box className="MovieDetailsPayment" bg={moviebg3} p="15px">
    
<Text  fontSize="25px">Email: {userdetails}</Text>
<Text  fontSize="25px">Mobile No: {userdetails2}</Text>

</Box>

<Button marginTop="15px" colorScheme="green" height="60px" fontSize="19px">Pay Rs.{total}</Button>
  </Box>
</Box>;
}

export default MovieUserPayment;
