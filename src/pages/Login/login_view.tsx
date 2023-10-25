import { useState } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { CustomNavLinkSmall, Span } from '../../components/Header/styles';
import { Button } from '../../common/Button';
import { Center } from '@mantine/core';
import { Row } from 'antd';
import { Image } from '@mantine/core';
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
      <Stack spacing={3} sx={{
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
      display: 'flex',
      flexFlow: window.innerWidth<900?'row wrap':'inherit',
   }
  
  return (<div
    style={fullScreen}>
    <Box
      
      sx={{
        height: 1,
      }}

    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1, }}>

        <Card
       
          style={{
            maxWidth: '900px',
          }}
        >
          <Row style={row}>
          <div             style={{
              maxWidth: '400px',
              width: '100%',
              display: 'flex',
              flexFlow: 'inherit',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image 
            src="/assets/images/log-in.svg"
            alt="Login"
            width={
              window.innerWidth<900?200:300}
            style={{
            margin: 'auto',
            }}
            />
          </div>
          <div style={{
            minWidth: '300px',
            maxWidth: '400px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
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
          </Row>
        </Card>
      </Stack>
    </Box>


  </div>);
}

export default LoginView;