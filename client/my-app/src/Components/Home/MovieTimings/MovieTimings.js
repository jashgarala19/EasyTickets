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
import "./MovieTimings.css";


import cogoToast from "cogo-toast";
function MovieTimings(props) {
  const [movieName, setMovieName] = useState();
  const params = useParams();
  const navigate = useNavigate();
  const bg = useColorModeValue("gray.300", "gray.700");
  const moviebg = useColorModeValue("gray.400", "gray.900");
  const moviebg2 = useColorModeValue("gray.400", "gray.700");

  const [moviedates, setMovieDates] = useState([]);

  const [movietimings, setMovieTimings] = useState([]);
  const [btnClr,setBtnClr]=useState();

  var dd;
  var o;
  const CustomCard = React.forwardRef(({ children, ...rest }, ref) => (
    <Box p='1'>
      <Tag ref={ref} {...rest}>
        {children}
      </Tag>
    </Box>
  ))

  useEffect(() => {
    Axios.get(
      "https://api.themoviedb.org/3/movie/" +
        `${params.id}` +
        "?api_key=ec631a3944b36e13974b7690d708b236&language=en-US"
    ).then((response) => {
      console.log(response.data);

      setMovieName(response.data.title);

      // allmovies.map((e)=>{return console.log(e.id)})
    });

    Axios.post("http://localhost:3002/getmoviedates", {
      movie_city: params.city,
      movie_id: params.id,
    }).then((response) => {
      console.log(response.data);
      o = response.data[0];

      dd = response.data.map((e) => {
        const options = { weekday: "long" };
        const weekday = new Date(e).toLocaleString("en", { weekday: "short" });
        // console.log(weekday)
        const day = new Date(e).toLocaleString("en", { day: "numeric" });
        const month = new Date(e).toLocaleString("en", { month: "short" });

        return [day, weekday, month, e];
      });

      console.log(dd);
      setMovieDates(dd);
     setBtnClr(o);

      Axios.post("http://localhost:3002/getmovietimings", {
        movie_city: params.city,
        movie_id: params.id,
        movie_date: o,
      }).then((response) => {
        console.log(response.data);
        // console.log(movietimings[0][movietimings.slice(-1)[0]][0].theatre_address)
        setMovieTimings(response.data);
      });

      // console.log(response.data)
    });
  }, []);


  const changeMovieDateFun = (e)=>{

    setBtnClr(e)


    
    Axios.post("http://localhost:3002/getmovietimings", {
      movie_city: params.city,
      movie_id: params.id,
      movie_date: e,
    }).then((response) => {
      console.log(response.data);
      // console.log(movietimings[0][movietimings.slice(-1)[0]][0].theatre_address)
      setMovieTimings(response.data);
    });
  }


  const showmovieseatlayout = (e,m)=>{

    console.log(e)
    navigate(`/${props.c}/buytickets/${params.id}/seatlayout`,{state:{allinfo:e,movie_name:movieName,movie_date:moviedates,theatre_info:m}})
  }
  return (
    <>
      <Box className="MovieTimingsMain" bg={moviebg}>
        <Box className="MovieTimingsMainDiv">
          <Text fontSize="40px">{movieName}</Text>
        </Box>
      </Box>
      <Box className="MovieTimingsInfo">
        <Box className="MovieTimings">
          {moviedates.map((e,i) => {
            return (
              <Button marginRight="10px" onClick={()=>changeMovieDateFun(e[3])}  colorScheme={
                btnClr == e[3] ? "whatsapp" : "gray" 
              } >
                {e[0] + " " + e[1] + " " + e[2]}
              </Button>
            );
          })}
        </Box>

        <Box className="time">
          {movietimings.slice(0, movietimings.length).map((c, index2) => {
            return (
              <Box className="MovieInfoSingleDiv" bg={moviebg2}>
                <Text fontSize="30px">
                  {" "}
                  {
                    // movietimings[index2][movietimings.length + 1][0]
                    //   .theatre_Address
c[c.length-1][0].theatre_Address
                  }
                </Text>
                <Box paddingTop="20px" paddingBottom="20px">
                  {c.slice(0, movietimings[index2].length - 1).map((f, j) => {
                    return (
                  
                          <Tooltip   hasArrow p="5px"label={f.ms_price.map((e)=>(Object.keys(e)+" : "+"₹"+e[Object.keys(e)]+" "))} >
                        
                         
                         <Button marginRight="20px" variant="outline" colorScheme="white"  onClick={() =>showmovieseatlayout(f,c[c.length-1][0])}>
                            {f.ms_date_time.ms_time}
                          </Button>
                     
                         
    
                          </Tooltip>
                     
                     
                     
                    );
                  })}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
}

export default MovieTimings;
