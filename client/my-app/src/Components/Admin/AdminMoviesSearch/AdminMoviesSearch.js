import React, { useState, useEffect } from "react";
import {
  useColorModeValue,
  Box,
  Input,
  Button,
  Radio,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";

import "../../Default.css";
import "./AdminMoviesSearch.css";
import { useNavigate } from "react-router-dom";
import { useForm, Controller, useFieldArray, useWatch } from "react-hook-form";
import Axios from "axios";

function AdminMoviesSearch() {
  const bg = useColorModeValue("gray.300", "gray.700");

  const bgInput = useColorModeValue("green.800", "green.200");

  const moviebg = useColorModeValue("gray.400", "gray.900");

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const [allmovies, setMovies] = useState([]);
  let navigate = useNavigate();
  const onSubmit = (data) => {
    // console.log(data.searchedmovie);
    console.log(data);
    Axios.get(
      "https://api.themoviedb.org/3/search/movie/?api_key=ec631a3944b36e13974b7690d708b236&language=en-US&query=" +
        `${data.searchedmovie}` +
        "&incude_adult=false"
    ).then((response) => {
      console.log(response.data.results);
      setMovies(response.data.results);
      // allmovies.map((e)=>{return console.log(e.id)})
    });
  };

  const onSubmit2 = (data) => {
    // console.log(data.searchedmovie);
    console.log(data);
  };
  const check = (m) => {
navigate(`/admin/movies/add/${m}`)
  };

  useEffect(() => {}, []);

  return (
    <Box className="admin-dashboaed-m " bg={bg} p="10px">
      <Box className="admin-dashboard-movie-add-div">
        <Box className="admin-dashboard-movie-add-div-search">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="admin-dashboard-movie-add-div-search"
          >
            <Input
              placeholder="Search Movie to add in theatre"
              width="70%"
              focusBorderColor={bgInput}
              fontFamily="Segoe UI"
              fontWeight="600"
              borderRadius="5px"
              {...register("searchedmovie")}
            />
            <Button
              width="20%"
              colorScheme="green"
              type="submit"
              borderRadius="5px"
            >
          
              Search
            </Button>
          </form>
        </Box>
        <Box className="admin-dashboard-movie-add-div-allmovies">
          <form onSubmit={handleSubmit(onSubmit2)}>
            {
              // allmovies.map((e)=>{return <h1>{e.id}</h1>})
              allmovies.map((e) => {
                return (
                  <Box
                    className="admin-dashboard-movie-add-div-mainmoviediv"
                    bg={moviebg}
                  >
                    <Box className="admin-dashboard-movie-add-div-movieimgdiv">
                      <img
                        src={
                          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/" +
                          e.poster_path
                        }
                        width="190px"
                        borderRadius="10px"
                      />
                    </Box>
                    <Box className="admin-dashboard-movie-add-div-moviedetailssdiv">
                      <h1 style={{ fontSize: "20px" }}> Movie: {e.title}</h1>
                      <h1 style={{ fontSize: "16px" }}>
                        {" "}
                        Overview: {e.overview}
                      </h1>

                      {/* <h1>{e.id}</h1> */}
                      {/* <Controller
                        name="Movie"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <RadioGroup onChange={onChange} value={value} colorScheme='green'>
                            <Radio value={`${e.id}`} type='button' >Select Movie</Radio>
                          </RadioGroup>
                        )}
                      /> */}

                      <Button
                        borderRadius="0px"
                        colorScheme="green"
                        type="submit"
                        width="100%"
                        onClick={() => check(e.id)}
                        className="addmoviebutton"
                      >
                        Add Movie
                      </Button>
                    </Box>
                  </Box>
                );
              })
            }
          </form>
        </Box>

        {/* <Text color={textColor} fontSize='20px' fontWeight='500' letterSpacing='1px' bg={bgText} p='10px' w='auto' textAlign='center' borderRadius='6px'> Add Movie in Theatre</Text>  */}
      </Box>
    </Box>
  );
}

export default AdminMoviesSearch;
