import React, { useState, useEffect } from "react";

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
  Tooltip,
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { HamburgerIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";

import Header from "../Header/Header";
import HomeMovies from "../HomeMovies/HomeMovies";
import MovieInfo from "../MovieInfo/MovieInfo";
import MovieTimings from "../MovieTimings/MovieTimings";
import MovieUserSeatLayout from "../MovieUserSeatLayouts/MovieUserSeatLayout";
import MovieUserPayment from "../MovieUserPayment/MovieUserPayment"
function HomeMain(props) {
  const [cityName, setCityName] = useState("");

  const cityNameFun = (e) => {
    setCityName(e);
    // console.log(cityName);
  };

  var h;

  useEffect(() => {
    console.log(props.p);
    h = props.p;
  }, [props]);

  return (
    <>
      <Header c={cityNameFun} />

      {/* {props.p==1?   <HomeMovies c={cityName}  /> ?<MovieTimings/>} */}
      {(function () {
        if (props.p == 1) {
          return <HomeMovies c={cityName} />;
        } else if (props.p == 2) {
          return <MovieInfo c={cityName} />;
        } else if(props.p==3) {
          return <MovieTimings  c={cityName} />;
        }
        else if(props.p==4)
        {
          return(<MovieUserSeatLayout />)
        }
        else{
          return(<MovieUserPayment/>)
        }
      })()}
    </>
  );
}

export default HomeMain;
