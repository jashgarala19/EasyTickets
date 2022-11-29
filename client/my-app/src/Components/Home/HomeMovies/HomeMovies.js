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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import "./HomeMovies.css";

import cogoToast from "cogo-toast";

function HomeMovies(props) {
  const [moviesongoing, setMoviesongoing] = useState([]);
  const [movieid, setmovieid] = useState([]);
  const allmovies = [];
  let navigate = useNavigate();
  const [g, setG] = useState([]);

  const [gg, setGG] = useState([]);


  const[ml,setML]= useState([]);

  useEffect(() => {
    console.log(props.c);

    axios
      .post("http://localhost:3002/getallmoviesbycity", {
        mc: props.c,
      })
      .then((response) => {
        setmovieid(response.data);

        let promises = [];
        const genresallmovies = [];
        const movielanguage =[];

        for (var i = 0; i < response.data.length; i++) {
          promises.push(
            axios
              .get(
                "https://api.themoviedb.org/3/movie/" +
                  response.data[i] +
                  "?api_key=ec631a3944b36e13974b7690d708b236&language=en-US" +
                  +"&incude_adult=false"
              )
              .then((response) => {
                // do something with response

                allmovies.push(response.data);
              })
          );
        }
    
        Promise.all(promises).then(() => {
          setG(allmovies);
          setGG(genresallmovies);
          console.log(ml)
          console.log(allmovies)
          setML(movielanguage)
          for (var i = 0; i < allmovies.length; i++) {
            for (var j = 0; j < allmovies[i].genres.length; j++) {
       
              genresallmovies.push(allmovies[i].genres[j].name);
              // console.log("aaaaa")
            
          }
        }

        for (var i = 0; i < allmovies.length; i++) {
          for (var j = 0; j < allmovies[i].spoken_languages.length; j++) {
     
            movielanguage.push(allmovies[i].spoken_languages[j].english_name);
            // console.log("aaaaa")
          
        }
      }
        })
      
 

 
      });
  }, [props]);



  const getMovieTimings = (e)=>{

// navigate(`/buytickets/${e}`)

navigate(`/${props.c}/movies/${e}`)
  }

  const bg = useColorModeValue("gray.300", "gray.900");
  return (
    <Box className="HomeMoviesMainDiv">
      <Box className="HomeMoviesFilter">
        <Text>Filters</Text>
        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem
            marginTop="10px"
            border="0px"
            boxShadow="0px"
            borderRadius="10px"
            bg={bg}
            p="10px"
          >
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Languages
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>

            <Box className="GenresFilterDiv">
                {[...new Set(ml)].map((e) => {
                  return <Button>{e}</Button>;
                })}
              </Box>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem
            marginTop="10px"
            border="0px"
            boxShadow="0px"
            borderRadius="10px"
            bg={bg}
            p="10px"
          >
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Generes
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Box className="GenresFilterDiv">
                {[...new Set(gg)].map((e) => {
                  return <Button>{e}</Button>;
                })}
              </Box>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
      <Box className="HomeMoviesOnGoing">
        <Text>Movies in {props.c}</Text>
        <Box className="HomeMoviesOnGoingDiv">
          {g.map((e) => {
            return (
              <Box className="HomeMoviesOnGoingImgDiv">
                <img
                  src={
                    "https://image.tmdb.org/t/p/w600_and_h900_bestv2/" +
                    e.poster_path
                  }
                  width="270px"
                  borderRadius="20px"
                  onClick={()=>{getMovieTimings(e.id)}}
                />
                <Text sx={{ fontSize: "18px" }}>{e.title}</Text>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default HomeMovies;
