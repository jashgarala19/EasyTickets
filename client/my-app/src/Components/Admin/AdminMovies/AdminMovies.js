import React from "react";
import {
   
    useColorMode,
    useColorModeValue,
    Box,
   Button
  } from "@chakra-ui/react";
  import {AddIcon } from '@chakra-ui/icons'
  import './AdminMovies.css'
  import { useNavigate } from "react-router-dom";

function AdminMovies() {
  let navigate = useNavigate();
    const { colorMode, toggleColorMode } = useColorMode();
    
    const bg = useColorModeValue('gray.300', 'gray.700')

    const addmoviefun=()=>{

      navigate('/admin/movies/search')

    }
  return    <Box className="admin-dashboaed-m" bg={bg} >
    <Box className='admin-dashboard-m-addmoviediv'>
    <Button leftIcon={<AddIcon />} colorScheme='green'  variant='solid' size='md' onClick={addmoviefun} >
  Add Movie
  </Button>
    </Box>



    
  </Box>;
}

export default AdminMovies;
