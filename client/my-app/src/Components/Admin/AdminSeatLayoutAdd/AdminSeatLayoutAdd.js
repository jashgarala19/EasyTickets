import React, { useState, useEffect } from "react";
import {
  useColorMode,
  useColorModeValue,
  Box,
  Button,
  Input,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Divider,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "./AdminSeatLayoutAdd.css";
import "./seatlayout.css";
import { useForm } from "react-hook-form";
import { AddIcon } from "@chakra-ui/icons";
import Axios from "axios";
import cogoToast from "cogo-toast";
var s = [];
// var breakpoint=-1;
export default function AdminSeatLayoutAdd() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  let navigate = useNavigate();
  const [title, setTitle] = useState("");
  const bg = useColorModeValue("gray.300", "gray.700");
  const bg2 = useColorModeValue("gray.300", "gray.800");
  const bg3 = useColorModeValue("gray.900", "blue.100");
  const [row, setRows] = useState([]);
  const [AlphaCounter, setAlphaCounter] = useState(0);
  const [RowCounter, setRowCounter] = useState(0);

  const [RowCounterNew,setRowCounterNew]=useState(0)
  const [seatlayout, setSeatLayout] = useState([]);
  const [RowAlphabet, setRowAlphabet] = useState([]);


  const [breakpoint,setBreakPoint]=useState(-1)
  // const [total_seats,setTotalSeats] = useState(0);

  var total_seats =0;


  const [f, setF] = useState([]);

  const [seatlayoutclass, setSeatLayoutClass] = useState([]);

  const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  useEffect(() => {
    // console.log(s);
    // console.log(s);
    // console.log(f);
    // console.log(totalseats);
    console.log(f);
    console.log(s);
    // console.log(count)
    // console.log(AlphaCounter);

    console.log("Rowcounternew"+RowCounterNew)
    console.log(breakpoint)
    setRowAlphabet(
      <Td>
        <Button
          colorScheme="yellow"
          width="41px"
          height="60px"
          cursor="default"
        >
          {alphabet[AlphaCounter]}
        </Button>
      </Td>
    );
  }, [row]);

  const onSubmit = (data) => {
    // setTitle(data.seattype);

    AddRowFun(2);
  };

  const Row = () => {
    const [col, setCol] = useState([]);
    const [ColCounter, setColCounter] = useState(1);
    const [seatid, setSeatID] = useState();

    const Col = () => {
      return (
        <Button
          className="Seats"
          id={alphabet[AlphaCounter] + ColCounter}
          onClick={(j) => pressed(j, alphabet[AlphaCounter])}
          height="60px"
        >
          {ColCounter}
        </Button>
      );
    }; //component

    const SkipCol = () => {
      return <Box className="SkippedSeats" px="0.5rem"></Box>;
    }; //component

    const AddColFun = () => {
      setColCounter(ColCounter + 1);
      // console.log(AlphaCounter)
      // console.log(f);
      // console.log(s)

      // console.log(ColCounter)
      setSeatID(alphabet[AlphaCounter] + ColCounter);
      // console.log(s)
      // console.log(s[AlphaCounter][1]);
      s[RowCounter][1].push(ColCounter);
 
      // console.log(f[breakpoint][RowCounterNew][1].push(0))
      console.log(s)
      console.log(f)
      f[RowCounterNew][1].push(ColCounter);
     

      setCol([...col, <Col />]);
    };
    const DeleteColFun = () => {
      if (ColCounter == 0) {
        setColCounter(1);
      } else {
        if (s[RowCounter][1].slice(-1) == "-") {
          col.pop();

          s[RowCounter][1].pop();
          f[RowCounterNew][1].pop();
          setCol([...col]);
        } else {
          setColCounter(ColCounter - 1);
        
          col.pop();

          s[RowCounter][1].pop();
          f[RowCounterNew][1].pop();
          setCol([...col]);
        }
      }
    };
    const SkipColFun = () => {
      s[RowCounter][1].push("-");
      f[RowCounterNew][1].push("-");

      setCol([...col, <SkipCol />]);
    };
    const pressed = (f, e, r) => {
      // console.log(e,r);
      alert(f.currentTarget.id);
    };

    return (
      <>
        {RowAlphabet}
        {col.map((e, index) => {
          return <Td key={index}>{e}</Td>;
        })}
        <Td onClick={AddColFun}>
          <Button width="41px" colorScheme="green">
            +
          </Button>
        </Td>
        <Td onClick={DeleteColFun}>
          <Button width="41px" colorScheme="red">
            -
          </Button>
        </Td>
        <Td onClick={SkipColFun}>
          <Button width="41px" colorScheme="blue">
            Skip
          </Button>
        </Td>
      </>
    );
  };
  const AddRowFun = (e) => {
    setRowCounter(RowCounter + 1);
    // console.log(e)
    if (e == 1) {
      // console.log(alphabet[AlphaCounter])
      s.push([alphabet[AlphaCounter], []]);
      f.push([alphabet[AlphaCounter], []]);
      setRowCounterNew(RowCounterNew+1);

      setRowAlphabet(
        <Td>
          <Box as="button" colorScheme="red" width="41px">
            {alphabet[AlphaCounter]}
          </Box>
        </Td>
      );
      setAlphaCounter(AlphaCounter + 1);
      // setAlphaCounter( (e)=>e+ 1);
      setRows([...row, <Row />]);
    } else {
   
      console.log(breakpoint)
        // breakpoint = breakpoint+1
        setBreakPoint(breakpoint+1)
       
   
     
      s.push({ seatclass: title });
      // f.push([title]);
      setSeatLayout([...seatlayout, title]);
      setSeatLayoutClass([...seatlayoutclass, title]);
      setRows([
        ...row,

        <>
          <Td
            style={{
              border: "0px",
            }}
          >
            <Text as="b">{title}</Text>
          </Td>
        </>,
      ]);
    }

    // console.log(alphabet[AlphaCounter]);
  };

  const DeleteRowFun = () => {
    // console.log(AlphaCounter)
    // console.log(s);
    // console.log(s.pop());
    setRowCounter(RowCounter - 1);
  
    if (Object.keys(s[s.length - 1]) == "seatclass") {
      row.pop();
      setRows([...row]);
      s.pop();
      // f.pop();
      seatlayoutclass.pop();
    } else {
      setRowCounterNew(RowCounterNew -1)
      setAlphaCounter((e) => e - 1);
      row.pop();
      setRows([...row]);
      s.pop();
      f.pop();
    }

    // console.log(AlphaCounter)
    // console.log(alphabet[AlphaCounter])
  };

  const [seatlayoutname, setSeatLayoutname] = useState();
  const seatlayoutnamefun = (e) => {
    setSeatLayoutname(e.target.value);
  };
  const loggedInAdmin = localStorage.getItem("admindetails");
  const AdminDetails = JSON.parse(loggedInAdmin);
  // console.log(AdminDetails.data.d[0].theatre_id);

  const createseatayout = (e) => {
    // console.log(seatlayoutclass)
    // console.log(s)
    
 
    for (let i = 0; i < f.length; i++) {
      // console.log(f[i][1].length)
      for (let j = 0; j < f[i][1].length; j++) {
        if (f[i][1][j] == 0) {
         total_seats+=1;  
        }
      }
    }

    const a =[];
var b=-1;
var j=0;
    for(let i = 0; i < s.length; i++) {

    //  console.log(Array.isArray(s[i]))
     if(Array.isArray(s[i])==false)
     {
      a.push([])
      b+=1;
      
     }else
     {
    
    
    a[b].push(f[j])
    j+=1;
     }


    }

console.log(s)
console.log(a)
    console.log(total_seats);

        Axios.post("http://localhost:3002/addseatlayout",{
         t_id:AdminDetails.data.d[0].theatre_id,sname:seatlayoutname,sclass:seatlayoutclass,slayout:s,slayout_struct:a,totalseats:total_seats

        }).then((response) =>{

          console.log(response)
          if(response.data.r==0)
          {
    cogoToast.error('Name already exists')
          }
          else
          {
    navigate('/admin/seatlayout')
          }

        })
  };
  return (
    <Box className="admin-dashboaed-m" bg={bg}>
      <Box className="admin-dashboard-seatlayout-main">
        <Box className="admin-dashboard-seatlayout-name">
          <Input
            placeholder="Seat Layout Name"
            width="30%"
            m="5px"
            onChange={seatlayoutnamefun}
          />
          <Button
            leftIcon={<AddIcon />}
            colorScheme="green"
            variant="solid"
            size="sm"
            onClick={createseatayout}
          >
            Create Seat Layout
          </Button>
        </Box>
        <Box className="admin-dashboard-seatlayout-controller">
          <Box className="admin-dashboard-seatlayout-controller-rowcontroller">
            <Button colorScheme="blue" onClick={() => AddRowFun(1)}>
              Add Row
            </Button>
            <Button colorScheme="red" onClick={() => DeleteRowFun()}>
              Delete Last Row
            </Button>
          </Box>

          <Box className="admin-dashboard-seatlayout-controller-columncontroller">
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ display: "flex", columnGap: "5px" }}
            >
              <Input
                placeholder="Title"
                {...register("seattype")}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Button colorScheme="blue" type="submit">
                Add Title{" "}
              </Button>
            </form>
         
          </Box>
        </Box>
        <Box
          className="admin-dashboard-seatlayout-layout"
          bg={bg2}
          m="20px"
          borderRadius="10px"
        >
          <div className="centertable">
            <Table
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                width: "auto",
                textAlign: "center",
              }}
              className="table-tiny"
            >
              <Tbody>
                {row.map((e, index) => {
                  return <Tr key={index}>{e}</Tr>;
                })}
              </Tbody>
            </Table>
            <Divider
              className="theatrescreen"
              width="50%"
              height="5px"
              bg={bg3}
              m="5px"
            />
            <Text as="b" m="5px" letterSpacing="1px">
              All eyes these way please!
            </Text>
          </div>
        </Box>
      </Box>
    </Box>
  );
}
