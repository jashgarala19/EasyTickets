import React from "react";
import { Input } from '@chakra-ui/react'
import './AdminLogin.css'
import { Button } from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import Axios from "axios";
import cogoToast from 'cogo-toast';
import { useNavigate } from "react-router-dom";
function AdminLogin() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = data =>{

   if(data.username=='' || data.password=='')
   {
    cogoToast.info('Please enter username or password',{position: 'bottom-left' ,heading: 'Error'})
   }
   else
   {

  
    Axios.post("http://localhost:3002/adminlogin",{ 
      username:data.username,password:data.password

    }).then((response) =>{
if(response.data.r==1)
{
  localStorage.setItem("admindetails", JSON.stringify(response));
  console.log("ok")
  navigate("/admin/dashboard");
 
}
else
{
  cogoToast.error("Wrong Username or Password", { position: 'bottom-left' ,heading: 'Error' });
  console.log("not ok")
}

    })
  }

  };

  return <div className='AdminLoginDiv'>
   <form onSubmit={handleSubmit(onSubmit)}>
    <h1 className='AdminLogintitle'>Admin Login </h1>
    <br/>
  
    <Input placeholder='Theatre Token'  {...register("username")} />
    
    <br/>
    <br/>
    <Input placeholder='Password' type='password'   {...register("password")}/>
    <br/>
    <br/>
    <Button colorScheme='blue' type="submit"   size='md' width="100%">Login</Button>

    </form>
  </div>;
}

export default AdminLogin;
