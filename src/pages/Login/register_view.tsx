import { Center, Image } from '@mantine/core';
import { IconButton, InputAdornment, Link, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { CustomNavLinkSmall, Span } from '../../components/Header/styles';
import { Button } from '../../common/Button';
import { createUser, nicknameAndEmail } from '../../../database/service/auth_service';
import { toast } from 'react-toastify';
import { Bars } from 'react-loader-spinner';
const RegisterView = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [loader, setLoader] = useState(false);

  type NicknameAndEmailResponse = { email: boolean; nickname: boolean };
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
      <Stack spacing={3} sx={window.innerWidth < 900 ? {
        width: '80%',
      } : {
        width: '100%',
      }}>
        <TextField
          value={nickname}
          onChange={(e) => { setNickname(e.currentTarget.value); }}

          name="email"
          label="Kullanıcı Adı"
        />
        <TextField
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          name="email"
          label="E-posta Adresi"
        />

        <TextField
          name="password"
          label="Şifre"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
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
              () => {
                register(email, password, nickname);
              }
            }>{ loader ?  <Bars
              height="20"
              width="80"
              color="white"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            /> : "Kayıt Ol"}</Button>
          </Span>
        </CustomNavLinkSmall>
      </Center>
    </>
  );
  const row =
  {
    maxWidth: '90%',
    display: 'flex',
    flexFlow: window.innerWidth < 900 ? 'row wrap' : 'inherit',
    borderRadius: '10px',
    backgroundColor: 'white',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
    padding: window.innerWidth < 900 ? "0px 0px 20px" : '20px',
  }

  const register = async (email: string, password: string, nickname: string) => {
    //kullanıcı adında boşluk olmamalı
    if (nickname.includes(" ")) {
      toast.error("Kullanıcı adında boşluk olmamalıdır.");
    } else if (nickname.length < 5) {
      toast.error("Kullanıcı adı en az 5 karakter olmalıdır.");
    } else if (nickname.length > 15) {
      toast.error("Kullanıcı adı en fazla 15 karakter olmalıdır.");
    } else if (email.includes(" ")) {
      toast.error("E-posta adresinde boşluk olmamalıdır.");
    } else if (!email.includes("@") || !email.includes(".")) {
      toast.error("E-posta adresi formata uygun değil.");
    } else if (email.length < 5) {
      toast.error("E-posta adresi en az 5 karakter olmalıdır.");
    } else if (password.length < 6) {
      toast.error("Şifre en az 6 karakter olmalıdır.");
    } else if (email.length > 30) {
      toast.error("E-posta adresi en fazla 30 karakter olmalıdır.");
    } else if (password.length > 15) {
      toast.error("Şifre en fazla 15 karakter olmalıdır.");
    } else {
    setLoader(true);
      const res: NicknameAndEmailResponse = await nicknameAndEmail(email, nickname);
      toast(res.email);
      toast(res.nickname);
      if (!res.nickname) {
        toast.error("Bu kullanıcı adı zaten kullanılıyor.");
      } else if (!res.email) {
        toast.error("Bu e-posta adresi zaten kullanılıyor.");
      } else if (res.email && res.nickname) {
        const data: any = await createUser(email, password, nickname);
    setLoader(false);

        if (data.status) {
          toast.success("Kayıt başarılı. Giriş yapılıyor.");
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
        } else {
          toast.error("Kayıt olurken bir hata oluştu.");
        }

      }


    }
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
        {window.innerWidth > 700 && <Image
          src="/img/svg/register.svg"
          alt="Login"
          width={
            window.innerWidth < 900 ? 200 : 300}
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
          }}>'e Kayıt Ol
          </span></h2>

        {renderForm}

        <Typography variant="body2" sx={{
          mt: 3,
          textAlign: 'center',
          color: 'text.secondary',

        }}>
          Zaten bir hesabın var mı?{' '}
          <Link variant="subtitle2" sx={{ ml: 1 }}
            href="/login"
          >
            Giriş Yap
          </Link>
        </Typography>
      </div>
    </div>



  </div>);
}

export default RegisterView;