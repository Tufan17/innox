import { useState } from 'react';

import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import userController from '../../../../database/db/controller/userController';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

interface Language {
  value: string;
  label: string;
  icon: string;
}


export default function LanguagePopover() {
  const [open, setOpen] = useState<HTMLElement | null>(null);
  const user = useSelector((state:any) => state.user.value);
  const LANGS: Language[] | null = JSON.parse(window.localStorage.getItem("languages")!);
  const userLang = LANGS!.filter((lang) => lang.value === user.language)[0];

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = (value: string) => {


    if (value.length < 4) {
      user.language = value;
      window.localStorage.setItem("user", JSON.stringify(user));
      userController.update(user.id, user);
    }

    setOpen(null);
  };


  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          ...(open && {
            bgcolor: 'action.selected',
          }),
        }}
      >
        <img src={userLang.icon} alt={userLang.label} width={30} />
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
            width: 180,
          },
        }}
      >
        {LANGS!.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === userLang.value}
            onClick={() => handleClose(option.value)}
            sx={{ typography: 'body2', py: 1 }}
          >
            <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />

            {option.label}
          </MenuItem>
        ))}
      </Popover>
    </>
  );
}
