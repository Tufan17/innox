import { Center, Image } from '@mantine/core';
import { IconButton, InputAdornment, Link, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { CustomNavLinkSmall, Span } from '../../components/Header/styles';
import {Button} from '../../common/Button';

const LoginView = () => {
  const [showPassword, setShowPassword] = useState(false);

  const fullScreen = {
    width: window.innerWidth,
    height: window.innerHeight,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundSize: 'cover',
    backgroundImage: 'url("/assets/transparent.png")',
  }

  const renderForm = (
    <>
      <Stack spacing={3} sx={window.innerWidth<900?{
        width: '80%',
      }:{
        width: '100%',   
      }}>
        <TextField name="email" label="
            E-posta Adresi
            " />

        <TextField
          name="password"
          label="Şifre"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Şifremi Unuttum
        </Link>
      </Stack>

      <Center style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <CustomNavLinkSmall
          style={{ width: "180px" }}
        >
          <Span>
            <Button onClick={
              () => window.location.href = window.location.origin + "/login"
            }>{"Giriş Yap"}</Button>
          </Span>
        </CustomNavLinkSmall>
      </Center>
    </>
  );
  const row=
    {
      maxWidth: '90%',
      display: 'flex',
      flexFlow: window.innerWidth<900?'row wrap':'inherit',
      borderRadius: '10px',
      backgroundColor: 'white',
      boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
      padding: window.innerWidth<900?"0px 0px 20px": '20px',
   }
  
  return (<div
    style={fullScreen}>
        <div style={row}>
       <div             
       style={{
        minWidth: '300px',
        maxWidth: '350px',
        width: '100%',
           display: 'flex',
           flexFlow: 'inherit',
           justifyContent: 'center',
           alignItems: 'center',
         }}>
         {window.innerWidth>700&&<Image
         src="/assets/images/log-in.svg"
         alt="Login"
         width={
           window.innerWidth<900?200:300}
         style={{
         margin: 'auto',
         }}
         />}
       </div>
       <div style={{
         minWidth: '300px',
         maxWidth: '350px',
         width: '100%',
         display: 'flex',
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center',
       
       }}>
         <h2 >
           <span style={{ color: "#18216d" }}>I</span>
           <span style={{ color: "rgb(254 118 37)" }}>nno</span>X<span style={{
             fontWeight: '500',
             fontSize: '1.0rem',
           }}>'e Hoşgeldiniz</span></h2>

         {renderForm}

         <Typography variant="body2" sx={{
           mt: 3,
           textAlign: 'center',
           color: 'text.secondary',

         }}>
           Hesabınız yok mu?
           <Link variant="subtitle2" sx={{ ml: 1 }} >
             Kayıt Ol
           </Link>
         </Typography>
       </div>
       </div>
    
        

  </div>);
}

export default LoginView;