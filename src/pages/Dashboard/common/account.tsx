import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import { alpha, Theme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { signout } from '../../../../database/service/auth_service';


export default function AccountPopover() {
  const [open, setOpen] = useState<HTMLElement | null>(null);
  const user=JSON.parse(window.localStorage.getItem("user")!);
  const account = {
    displayName: 'user',
    email: 'user@gmail.com',
    photoURL: '/static/mock-images/avatars/avatar_default.jpg',
  };
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
   
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme: Theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme: Theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={user.avatar??account.photoURL}
          alt={user.nickname??account.displayName}
          sx={{
            width: user.role=="admin"?36:64,
            height: user.role=="admin"?36:64,
            border: (theme: Theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {user.nickname.charAt(0).toUpperCase()??account.displayName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {user.nickname??account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user.email??account.email}
          </Typography>
        </Box>
 {/*
        <Divider sx={{ borderStyle: 'dashed' }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem key={option.label} onClick={handleClose}>
            {option.label}
          </MenuItem>
        ))}

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} /> */}

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={() => {
            setOpen(null);
            window.location.href = '/login';
            signout();
            localStorage.clear();
            }}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover >
    </>
  );
}
