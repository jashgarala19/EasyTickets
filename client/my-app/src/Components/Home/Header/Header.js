import React, { useState, useEffect, useMemo } from "react";

import {
  useColorMode,
  useColorModeValue,
  Box,
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
import Axios from "axios";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import "./Header.css";

import cogoToast from "cogo-toast";

function Header(props) {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const bg = useColorModeValue("gray.300", "gray.700");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [cities, setCities] = useState([]);
  const [cityName, setCityName] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const [flag, setFlag] = useState();
  const [isLoading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const a = () => {
    alert("aa");

    onClose();
  };
  const setCityFun = (e) => {
    props.c(e);
    setCityName(e);
    localStorage.setItem("movie_city", JSON.stringify({ m: e }));
    onClose();
  };
  const {
    isOpen: isNavOpen,
    onOpen: onNavOpen,
    onClose: onNavClose,
  } = useDisclosure();

  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const btnRef = React.useRef();

  const userInfo = localStorage.getItem("userInfo");
  const l = JSON.parse(userInfo);

  const movie_city = localStorage.getItem("movie_city");
  const m = JSON.parse(movie_city);

  useMemo(() => {}, []);

  useEffect(() => {
    console.log("Hello Reloaded!!");
    // console.log(props.c)
    // console.log(props.cn)
    // setCities(props.cities);
    // setCityName(props.cityName);

    Axios.post("http://localhost:3002/gettheatrecities", {}).then(
      (response) => {
        console.log(response.data[0]);
        setCities(response.data);
        setCityName(response.data[0].city_Name);
        // props.c(response.data[0].city_Name)
        // console.log(m==null)

        if (m != null) {
          setCityName(m.m);
          props.c(m.m);
        } else {
          localStorage.setItem(
            "movie_city",
            JSON.stringify({ m: response.data[0].city_Name })
          );
          setCityName(response.data[0].city_Name);
          props.c(response.data[0].city_Name);
          //    setCityName(response.data[0].city_Name);
        }
      }
      // );
    );
    if (l != null) {
      Axios.post("http://localhost:3002/getuserdetails", {
        user_mobile: l,
      }).then((response) => {
        console.log(response.data);

        setUserDetails(response.data);
      });
    }
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    watch2,
    formState: { error },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    Axios.post("http://localhost:3002/registeruser", { userdata: data }).then(
      (response) => {
        if (response.data.r == 0) {
          alert("Mobile No Registered Already!!");
        } else {
          localStorage.setItem("isUserLoggedIn", JSON.stringify(1));
          localStorage.setItem(
            "userInfo",
            JSON.stringify({ mobile_no: parseInt(data.mobile_no) })
          );
          onNavClose();
          onClose2();
          //   navigate("/");
          window.location.reload();
        }
      }
    );
  };

  const onSubmit2 = (data) => {
    Axios.post("http://localhost:3002/loginuser", { userdata: data }).then(
      (response) => {
        if (response.data.r == 1) {
          //     console.log(response.data.result[0].Mobile_No)
          localStorage.setItem("isUserLoggedIn", JSON.stringify(1));
          localStorage.setItem(
            "userInfo",
            JSON.stringify({ mobile_no: response.data.result[0].Mobile_No })
          );
          onClose();
          window.location.reload();
          // navigate("/")
        } else {
          cogoToast.error("Wrong mobile or password", {
            position: "bottom-left",
            heading: "Credentials",
          });
        }
      }
    );
  };

  const LogoutUser = () => {
    // alert("cwce")
    localStorage.removeItem("isUserLoggedIn");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("movie_city");
    onClose();
    // window.location.reload();
    navigate("/");
    // reset()
  };

  return (
    <>
      <Box className="mainheader" bg={bg}>
        <Box>
          <Text
            sx={{ fontWeight: "bold", fontSize: "20px", fontStyle: "italic" ,cursor:"pointer"}}
            onClick={()=>(navigate("/"))}
          >
            EASYCINEMAS
          </Text>
        </Box>

        <Box sx={{ width: "60%" }}>
          <Input placeholder="Search movies or Theatres" size="md" w="100%" />
        </Box>

        <Box>
          <>
            <Button onClick={onOpen} width="200px" colorScheme="whatsapp">
              {cityName}
            </Button>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Select City</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  {/* <Button onClick={a}>Cities</Button> */}
                  <Box className="AllCities">
                    {cities.map((e) => {
                      return (
                        <Button
                          onClick={() => {
                            setCityFun(e.city_Name) 
                            navigate("/")
                          }}
                          colorScheme={
                            cityName == e.city_Name ? "whatsapp" : "gray"
                          }
                          width="40%"
                          height="60px"
                        >
                          {e.city_Name}
                        </Button>
                      );
                    })}
                  </Box>
                </ModalBody>
                <ModalFooter>
                  {/* <Button onClick={onClose}>Close</Button> */}
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        </Box>

        <Box>
          <HamburgerIcon
            ref={btnRef}
            colorScheme="teal"
            onClick={onNavOpen}
            w={8}
            h={9}
            cursor="pointer"
          />
          {/* <Button >
        Open
      </Button> */}
          {(() => {
            if (l != null) {
              return (
                <Drawer
                  isOpen={isNavOpen}
                  placement="right"
                  onClose={onNavClose}
                  finalFocusRef={btnRef}
                >
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                      Hello {userDetails.first_Name}!!
                    </DrawerHeader>

                    <DrawerBody>
                      <Divider />
                    </DrawerBody>

                    <DrawerFooter>
                      {/* <Button variant='outline' mr={3} onClick={onNavClose}>
            Cancel
          </Button> */}
                      {/* <Button colorScheme='blue'>Save</Button> */}
                      <Button w="100%" colorScheme="red" onClick={LogoutUser}>
                        Log Out
                      </Button>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              );
            } else {
              return (
                <Drawer
                  isOpen={isNavOpen}
                  placement="right"
                  onClose={onNavClose}
                  finalFocusRef={btnRef}
                >
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Hey!</DrawerHeader>

                    <DrawerBody>
                      <form onSubmit={handleSubmit2(onSubmit2)}>
                        <Input
                          placeholder="Mobile"
                          {...register2("mobile")}
                          type="number"
                          required="true"
                        />
                        <br></br>
                        <br></br>
                        <Input
                          required="true"
                          placeholder="Password"
                          {...register2("password")}
                        />
                        <br></br>
                        <br></br>
                        <Button
                          width="100%"
                          colorScheme="whatsapp"
                          marginBottom="5px"
                          type="submit"
                        >
                          Login
                        </Button>
                      </form>

                      <br></br>

                      <Button width="100%" variant="outline" onClick={onOpen2}>
                        Don't Have an Account? SIGN UP
                      </Button>
                      <br></br>
                      <br></br>
                      <Modal
                        initialFocusRef={initialRef}
                        finalFocusRef={finalRef}
                        isOpen={isOpen2}
                        onClose={onClose2}
                      >
                        <ModalOverlay />
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <ModalContent>
                            <ModalHeader>Create your account</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                              <FormControl>
                                <FormLabel>First name</FormLabel>
                                <Input
                                  ref={initialRef}
                                  placeholder="First name"
                                  {...register("first_name")}
                                />
                              </FormControl>

                              <FormControl mt={4}>
                                <FormLabel>Last name</FormLabel>
                                <Input
                                  placeholder="Last name"
                                  {...register("last_name")}
                                />
                              </FormControl>

                              <FormControl mt={4}>
                                <FormLabel>Email</FormLabel>
                                <Input
                                  placeholder="Email"
                                  {...register("email")}
                                />
                              </FormControl>
                              <FormControl mt={4}>
                                <FormLabel>Mobile</FormLabel>
                                <Input
                                  placeholder="Mobile"
                                  type="number"
                                  {...register("mobile_no")}
                                />
                              </FormControl>
                              <FormControl mt={4}>
                                <FormLabel>Password</FormLabel>
                                <Input
                                  placeholder="Password"
                                  {...register("Password")}
                                  type="password"
                                />
                              </FormControl>
                            </ModalBody>

                            <ModalFooter>
                              <Button colorScheme="blue" mr={3} type="submit">
                                CREATE
                              </Button>
                              <Button onClick={onClose2}>Cancel</Button>
                            </ModalFooter>
                          </ModalContent>
                        </form>
                      </Modal>
                      <Divider />
                    </DrawerBody>

                    <DrawerFooter>
                      {/* <Button variant='outline' mr={3} onClick={onNavClose}>
              Cancel
            </Button> */}
                      {/* <Button colorScheme='blue'>Log Out</Button>  */}
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              );
            }
          })()}
        </Box>
      </Box>
    </>
  );
}

export default Header;
