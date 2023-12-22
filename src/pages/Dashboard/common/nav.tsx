
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import { Center } from "@mantine/core";
import "./index.css";
import ListItemButton from '@mui/material/ListItemButton';
import { Link as RouterLink, useLocation } from "react-router-dom";
import { forwardRef } from "react";
import { alpha } from "@mui/material";
import SvgColor from '../../../components/svg-color';
import { FcSettings } from "react-icons/fc";
import Link from '@mui/material/Link';
import { SvgIcon } from "../../../common/SvgIcon";
import {NAV_WIDTH} from "../../../constants/index";
import { FcBriefcase,FcFile,FcConferenceCall,FcQuestions } from "react-icons/fc";
interface NavProps {
  openNav: boolean;
  mobile: boolean;
  onCloseNav?: () => void;
}

const Nav: React.FC<NavProps> = ({ openNav, mobile, onCloseNav }) => {
 
  const icon = (name: string) => (
    <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  );
  const nav_path="/dashboard";
  const navConfig = [
    {
      title: 'dashboard',
      path: nav_path,
      icon: icon('ic_analytics'),
    },
    {
      title: 'Kullanıcılar',
      path: nav_path+'/users',
      icon: <FcConferenceCall size={25}/>,
    },
    {
      title: 'İçerikler (Dönemler,Dersler)',
      path: nav_path+'/contents',
      icon: <FcBriefcase size={25}/>,
    },
    {
      title: 'Konular',
      path: nav_path+'/subjects',
      icon: <FcFile size={25}/>,
    },
    {
      title: 'Soru Bankası',
      path: nav_path+'/questionbank',
      icon: <FcQuestions size={25}/>,
    },
    {
      title: 'Not found',
      path: nav_path+'/404',
      icon: icon('ic_disabled'),
    },
    {
      title: 'Ayarlar',
      path: nav_path+'/settings',
      icon: <FcSettings size={25}/>,
    },
  ];
  const renderMenu = (
    <Stack 
      style={{
        width: "100%",
      }}>
      <Center  >
        <SvgIcon src="logo.svg" width="120px" height="120px" />
      </Center>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );
 
  const menu = () => {
    return (<Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {

        <Box className="nav"
          sx={{
            height: 1,
            position: "fixed",
            width: NAV_WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderMenu}
        </Box>
      }
    </Box>);
  };
  return mobile ? (
    <Drawer open={openNav} onClose={onCloseNav}
      sx={{
        transition: "width 0.5s ease-in-out",
        width: { lg: openNav ? NAV_WIDTH : 0 },
      }}
    >
      {menu()}
    </Drawer>
  ) : menu();
};

export default Nav;

interface NavItemProps {
  item: {
    path: string;
    icon: React.ReactNode;
    title: string;
  };
}

const NavItem: React.FC<NavItemProps> = ({ item }) => {
  const pathname = useLocation().pathname;
  const active = item.path === "/dashboard" ? pathname === item.path : pathname.includes(item.path);

  return (
    <ListItemButton
      component={forwardRef<HTMLDivElement, any>((props, ref) => (
        <Link {...props} to={item.path} component={RouterLink} ref={ref} />
      ))}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component="span">{item.title} </Box>
    </ListItemButton>
  );
};

