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
  FormLabel,
  Fade, ScaleFade, Slide, SlideFade
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { HamburgerIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Axios from "axios";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import "./MovieUserSeatLayout.css";
import  Icon from "../../../seaticon.png";
import cogoToast from "cogo-toast";

function MovieUserSeatLayout() {
  const [seatlayout, setSeatLayout] = useState([]);
  const params = useParams();
  const [price, setPrice] = useState([]);
  const location = useLocation();
const [userseatselect,setUserBookSelect]=useState([]);
const { isOpen, onToggle,onOpen,onClose } = useDisclosure()
const moviebg = useColorModeValue("gray.400", "gray.900");
const [clicked, setClicked] = useState({total: 0});
let navigate = useNavigate();
const [d,setD]=useState([])
const [t,setT]=useState();
const[theatredetails,setTheareDetails]=useState([]);


const [alldata,setAlldata]=useState([])

  useEffect(() => {
    console.log(location.state.allinfo);
    setAlldata(location.state.allinfo)
    console.log(location.state.theatre_info)
    setTheareDetails(location.state.theatre_info)

   
    setSeatLayout(location.state.allinfo.seatlayout_status);
    setPrice(location.state.allinfo.ms_price);
    // setD(location.state.movie_date)
    setD(location.state.allinfo.ms_date_time.ms_date)
    
    setT(location.state.allinfo.ms_date_time.ms_time)
  
if(clicked.total!=0)
{
  onOpen()
}
else
{
onClose()
}
    console.log(price);
    // console.log(userseatselect)
  }, [clicked.total]);
  const getClass = idx => (`${clicked[idx] ? 'green' : 'gray'}`);

  const  userBookSelectedFun = (e)=>{

 userseatselect.push(e[0]+e[1])

 console.log(userseatselect)



  }

  const checkuserloggeIn =()=>{
    const userInfo = localStorage.getItem("userInfo");
    const l = JSON.parse(userInfo);

    if(l==null)
    {
      alert("Please log in")
    }
    else
    {
      navigate("/payment",{state:{allinfo:alldata,
        movie_name:location.state.movie_name,
        movie_date:d,
        movie_time:t,
        selectedseats:clicked,
        theatre_info:theatredetails
      
      
      }})
    }


  }
  console.log(clicked)
  return ( 
    <Box>
            <Box className="MovieTimingsMain" bg={moviebg}>
        <Box className="MovieTimingsMainDiv">
          <Text fontSize="25px">{location.state.movie_name} | {theatredetails.city_Name} | {d} | {t}</Text>
        </Box>
      </Box>
    <Box className="mainseatlayoutusermovie">
      
      <Box className="mainseatlayoutusermovie2">
        {seatlayout.map((e, index) => {
          var p = price[index];

          return (
            <Box>
              <Box className="PriceLineDiv">
                {/* <Text p="5px">
                  {Object.keys(e) + ".-Rs. " + e[Object.keys(e)]}



                </Text> */}
                {/* {<Text>{console.log(e.ms_price[0].Gold)}</Text>} */}
                <Text sx={{ fontSize: "20px" }}>
                  {" "}
                  {Object.keys(p) + ".-Rs. " + p[Object.keys(p)]}
                </Text>
                {/* {
  price.map((e)=>{

    return(<h1>       {Object.keys(e) + ".-Rs. " + e[Object.keys(e)]}</h1>)
  })
} */}
                <Box
                  className="breakpoint"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Divider />
                  {e.slice(0, e.length).map((g) => {
                    // console.log(g);

                    // return(g[0].map((e)=>{ return(e[1].map((h=>{return<Button>{h}</Button>})))}))

                    return (
                      <Box className="seatrows" sx={{}}>
                        {g.slice(0, g.length - 1).map((e) => {
                          return (
                            <Button
                              paddingTop="25px"
                              paddingBottom="25px"
                              m="10px"
                              colorScheme="yellow"
                              curosr="default"
                            >
                              {e}
                            </Button>
                          );
                        })}

                        {
                          g.slice(0, g.length - 1).map((f) => {
                            return g[1].map((e, index) => {
                              if (e == "-") {
                                return (
                                  <Button
                                    paddingTop="25px"
                                    paddingBottom="25px"
                                    m="10px"
                                    background="none"
                                    cursor="default"
                                    sx={{ pointerEvents: "none" }}
                                  ></Button>
                                );
                              } else {
                                return (
                                  <Button
                                    paddingTop="25px"
                                    paddingBottom="25px"
                                    m="10px"
                                    // colorScheme={getClass(g[0]+(index+1))==='green'?"green":"red"}

                                    // colorScheme={getClass(g[0]+(index+1))}
                                    colorScheme={getClass(g[0]+(e))}
                                    onClick={() => {
                                      
                                      
                                
                                      
                                      setClicked(prev => ({
                                      ...prev,
                                      total: (
                                        prev[g[0]+(e)] ? prev.total - +parseInt(p[Object.keys(p)]) : prev.total + +parseInt(p[Object.keys(p)])
                                      )
                                      ,
                                
                                      [g[0]+(e)]: !prev[g[0]+(e)]
                                    }))

                              // console.log(clicked.total)
                                  
                               
                                  }
                                  
                                  
                                
                                  }
                             
                             
                                  >
                                    {e} {/** display */}
                                  </Button>
                                );
                              }
                            });
                          })

                          //  g[1].map((e) => {

                          //   if(e=="-")
                          //   {
                          //     return (

                          //       <Button paddingTop="25px" paddingBottom="25px" m="10px" background="none" cursor="default" sx={{  pointerEvents: 'none'}}>

                          //       </Button>
                          //     );
                          //   }
                          //   else{
                          //     return (

                          //       <Button paddingTop="25px" paddingBottom="25px" m="10px">
                          //         {e}
                          //       </Button>
                          //     );
                          //   }

                          // })
                        }
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            
            </Box>
            
          );
        })}
  <img src={Icon} className='theatre_screen'/>
      </Box>
      <Slide direction='bottom' style={{ zIndex: 10 }} in={isOpen} >
        <Box
          p='40px'
          color='white'
          mt='4'
          // bg='green.400'
          rounded='md'
          shadow='md'
  
          display="flex"
          alignItems="center"
          justifyContent="center" 
          
        >
          <Box sx={{display:'flex',alignItems:'center' ,justifyContent: 'center',flexDirection:'row'}} w="700px">
          <Button sx={{width:"100%" ,height:"70px",fontSize:"30px"}}  colorScheme='green' onClick={()=>checkuserloggeIn()}>Pay Rs.{clicked.total}</Button>
          </Box>
        </Box>
      </Slide>
    </Box>
    </Box>
  );
}

export default MovieUserSeatLayout;
