
import React, { useState, useEffect, useMemo } from "react";

import {
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
  FormLabel,
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { HamburgerIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useNavigate ,useLocation, useParams} from "react-router-dom";
import Axios from "axios";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import "./MovieInfo.css";

import cogoToast from "cogo-toast";
function MovieInfo(props) {
  const [backdropPoster, setbackdropPoster] = useState();
  const [poster, setPoster] = useState();
  const [movieName, setMovieName] = useState();
  const [overview, setOverview] = useState();
  const [genres, setGenres] = useState([]);
  const [release_year, setRelease_Year] = useState();
    const params = useParams();
    const bg = useColorModeValue("gray.300", "gray.700");
    const moviebg = useColorModeValue("gray.400", "gray.900");
    let navigate = useNavigate();
    useEffect(()=>{
 Axios.get(
      "https://api.themoviedb.org/3/movie/" +
        `${params.id}` +
        "?api_key=ec631a3944b36e13974b7690d708b236&language=en-US"
    ).then((response) => {
      console.log(response.data);
      // console.log(response.data.genres[0].name);
      setbackdropPoster(response.data.backdrop_path);
      setPoster(response.data.poster_path);
      setMovieName(response.data.title);
      setOverview(response.data.overview);
      setGenres(response.data.genres);

      var y = response.data.release_date;
      // console.log(y.slice(0, 4));
      setRelease_Year(y.slice(0, 4));

      // allmovies.map((e)=>{return console.log(e.id)})
    });
    },[])
   
    const buytickets =(e)=>
    {

      navigate(`/${props.c}/buytickets/${e}`)
    }
  return <Box className="MovieInfoMain" bg={moviebg}>
    <Box className="MovieInfoMainDiv">
    {/* <h1>{movieName}</h1>
   {params.id} */}
   <Box  className="MovieInfoImgDiv">
   <img
              src={"https://image.tmdb.org/t/p/w300_and_h450_bestv2" + poster}
              style={{ height: "500px", borderRadius: "10px" }}
            />
   </Box>
   <Box className="MovieInfoTextDiv">
   <Box style={{paddingLeft:'20px'}} width="70%">
            <h1 style={{ fontSize: "35px", fontWeight: "bold" }}>
              {movieName} ({release_year})
            </h1>
            <br></br>

            <h1>
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                Movie Description:{" "}
              </span>
              <span
                style={{
                  fontSize: "20px",
                  padding: "5px",
                  borderRadius: "4px",
                }}
              >
                {overview}{" "}
              </span>
            </h1>
            <br></br>
            <Box style={{ display: "flex" }}>
              <h1 style={{ padding: "5px" }}>
                <span style={{ fontSize: "20px", fontWeight: "bold",letterSpacing:'1px' }}>
                  Genre:
                </span>{" "}
              </h1>
              {genres.map((e) => {
                return (
                  <Button
                    // style={{
                    //   padding: "7px",
                    //   fontWeight: "bold",
                    //   backgroundColor: "white",
                    //   marginRight: "10px",
                    //   borderRadius: "7px",
                    //   color: "black",
                    // }}
                  
                    sx={{  marginRight:'7px'}}
                  >
                    {e.name}
                  </Button>
                );
              })}

            </Box>
            <Button marginTop="40px" colorScheme="red" width="100%" onClick={()=>buytickets(params.id)}>Book Tickets</Button>
          </Box>
   </Box>

    </Box>

    </Box>;
}

export default MovieInfo;
