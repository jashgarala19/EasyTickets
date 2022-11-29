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
  Text,
  BreadcrumbItem,
  Input,
  InputGroup,
  InputLeftElement,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Tooltip,
  Select,
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { HamburgerIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Axios from "axios";
import "./AdminMoviesAdd.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
function AdminMoviesAdd(props) {
  const [startDate, setStartDate] = useState(new Date());
  const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <button className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));
  const location = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("gray.300", "gray.700");
  const moviebg = useColorModeValue("gray.400", "gray.900");

  let navigate = useNavigate();

  const params = useParams();
  const [backdropPoster, setbackdropPoster] = useState();
  const [poster, setPoster] = useState();
  const [movieName, setMovieName] = useState();
  const [overview, setOverview] = useState();
  const [genres, setGenres] = useState([]);
  const [release_year, setRelease_Year] = useState();
  const [screen, setScreen] = useState([]);
  const [screenclass, setScreenclass] = useState([]);

  const [selectedscreenno, setSelectedScreenno] = useState();


  var a;
  const { register, control, handleSubmit, watch, reset, unregister } = useForm(
    {
      defaultValues: {},
      shouldUnregister: true,
    }
  );
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
    }
  );

  const loggedInAdmin = localStorage.getItem("admindetails");
  const AdminDetails = JSON.parse(loggedInAdmin);
  useEffect(() => {
    console.log(startDate.toLocaleDateString("en-US"));
    console.log(
      startDate.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    );
    Axios.get(
      "https://api.themoviedb.org/3/movie/" +
        `${params.id}` +
        "?api_key=ec631a3944b36e13974b7690d708b236&language=en-US"
    ).then((response) => {
      // console.log(response.data);
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

    Axios.post("http://localhost:3002/getscreen", {
      t_id: AdminDetails.data.d[0].theatre_id,
    }).then((response) => {
      console.log(response.data[0].screen_no);
   a=response.data[0].screen_no
      setSelectedScreenno(response.data[0].screen_no);
      setScreen(response.data);


      Axios.post("http://localhost:3002/getscreenclass", {
        t_id: AdminDetails.data.d[0].theatre_id,
        screen: a,
      }).then((response) => {
       
        setScreenclass(response.data[0].seatlayout_class);
      });
    })


  }, [startDate]);
  const myboxstyle = {
    // background:
    //   "url(https://image.tmdb.org/t/p/w533_and_h300_bestv2" +
    //   `${backdropPoster}` +
    //   ") center/cover no-repeat",
    height: "520px",
    width: "100%",
    borderRadius: " 10px",
    // color: "#f3f4f0",
  };

  const inputmoviepricefun = (e) => {
    // alert(e.target.value);
    reset();
    unregister();

    if (e.target.value != "") {
      setSelectedScreenno(e.target.value)
      Axios.post("http://localhost:3002/getscreenclass", {
        t_id: AdminDetails.data.d[0].theatre_id,
        screen: e.target.value,
      }).then((response) => {
        // console.log(response.data);
        setScreenclass(response.data[0].seatlayout_class);
      });
    }
  };

  //   function handleSubmit(event) {
  //     event.preventDefault()

  // }

  const onSubmit = (data) => {
   const movie_date = startDate.toLocaleDateString("en-US")
   const movie_time = startDate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })
  const movie_screen_no = selectedscreenno
  const movie_prices = data.Prices

  console.log(params.id,movie_date,movie_time,movie_screen_no,movie_prices  )
  Axios.post("http://localhost:3002/addmovieshow", {
  
    t_id: AdminDetails.data.d[0].theatre_id,  m_id:params.id,m_date:movie_date,m_time:movie_time,m_screen_no:movie_screen_no,m_prices:movie_prices
 
  }).then((response) => {


  });
  
  };

  const Pricecomp = () => {
    return (
      <>
        <Text
          style={{ fontSize: "25px", fontWeight: "bold", marginBottom: "10px" }}
        >
          Set Price
        </Text>
        <Box
          style={{ display: "flex", flexDirection: "column", rowGap: "10px" }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: "flex", flexDirection: "column", rowGap: "10px" }}
          >
            {screenclass.map((e, index) => {
              return (
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: "10px",
                  }}
                >
                  <Text style={{ fontSize: "18px" }}>{e}: </Text>

                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                      children=" ₹"
                    />
                    <Input
                      placeholder="Enter amount"
                      type="number"
                      key={e}
                      {...register(`Prices.${index}.${e}`)}
                    />
                  </InputGroup>
                </Box>
              );
            })}
            <Button type="submit" colorScheme='yellow'>Create</Button>
          </form>
        </Box>
      </>
    );
  };



  
  return (
    <Box className="admin-dashboaed-m" bg={bg}>
      {/* {params.id} */}

      <Box className="movie" sx={myboxstyle}>
        <Box
          backdropFilter="blur(10px)"
          backdropBlur="43px"
          p="20px"
          sx={{
            display: "flex",
            columnGap: "1px",
            justifyContent: "flexStart",
          }}
        >
          <Box width="29%" zIndex={9999}>
            <img
              src={"https://image.tmdb.org/t/p/w300_and_h450_bestv2" + poster}
              style={{ height: "500px", borderRadius: "10px" }}
            />
          </Box>

          <Box style={{paddingLeft:'20px'}} width="70%">
            <h1 style={{ fontSize: "35px", fontWeight: "bold" }}>
              Movie: {movieName} ({release_year})
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
          </Box>
        </Box>
        <br></br>
        <br></br>
        <Box className="MovieAddFormDiv" bg={moviebg}>
          <Box
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              columnGap: "10px",
            }}
          >
            <Text style={{ fontSize: "25px" }}>Select Date and Time:</Text>
            <Box>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
                height="200px"
                wrapperClassName="datePicker"
              />
            </Box>
          </Box>

          <Box
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              columnGap: "10px",
            }}
          >
            <Text style={{ fontSize: "25px" }}>Select Screen No:</Text>
            <Box style={{ width: "25%" }}>
              <Select
                onChange={(e) => inputmoviepricefun(e)}
                style={{ width: "100%" }}
              >
                {screen.map((e) => {
                  return <option value={e.screen_no}>{e.screen_no}</option>;
                })}
              </Select>
            </Box>
          </Box>

          <Box
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              columnGap: "10px",
            }}
          >
            <Pricecomp />
          </Box>
        </Box>
        <br></br>
        <br></br>
      </Box>
    </Box>
  );
}

export default AdminMoviesAdd;
