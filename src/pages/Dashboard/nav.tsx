
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import { Container, } from "@mantine/core";
import "./common/index.css";
import ListItemButton from '@mui/material/ListItemButton';
import { Link as RouterLink, useLocation } from "react-router-dom";
import { forwardRef } from "react";
import { alpha } from "@mui/material";
import SvgColor from '../../components/svg-color';

import Link from '@mui/material/Link';
interface NavProps {
  openNav: boolean;
  mobile: boolean;
  onCloseNav?: () => void;
}

const Nav: React.FC<NavProps> = ({ openNav, mobile, onCloseNav }) => {
  const renderUpgrade = (
    <Box>
      <Stack
        alignItems="center"
        spacing={3}
        sx={{ pt: 5, borderRadius: 2, position: "relative" }}
      >
        <Box
          component="img"
          src="/assets/illustrations/illustration_avatar.png"
          sx={{ width: 100, position: "absolute", top: -50 }}
        />

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6">Get more?</Typography>

          <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
            From only $69
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
  const icon = (name:string) => (
    <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  );
  const navConfig = [
    {
      title: 'dashboard',
      path: '/',
      icon: icon('ic_analytics'),
    },
    {
      title: 'user',
      path: '/user',
      icon: icon('ic_user'),
    },
    {
      title: 'product',
      path: '/products',
      icon: icon('ic_cart'),
    },
    {
      title: 'blog',
      path: '/blog',
      icon: icon('ic_blog'),
    },
    {
      title: 'login',
      path: '/login',
      icon: icon('ic_lock'),
    },
    {
      title: 'Not found',
      path: '/404',
      icon: icon('ic_disabled'),
    },
  ];
  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );
  const renderContent = (
    <Container>
      <Box sx={{ flexGrow: 1 }} />

      {renderUpgrade}
    </Container>
  );
  return mobile ? (
    <Drawer open={openNav} onClose={onCloseNav}
    sx={{
      transition: "width 0.5s ease-in-out",
      width: { lg: openNav ? 340 : 0 },
    }}
    >
      <Box
        sx={{
          flexShrink: { lg: 0 },
          width: { lg: 100 },
        }}
      >
        {
          <Box
            sx={{
              height: 1,
              paddingTop: 15,
              position: "fixed",
              width: 340,
              bgcolor: "white",
              borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
            }}
          >
            {renderContent}
          </Box>
        }
      </Box>
    </Drawer>
  ) : (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: 100 },
      }}
    >
      {
        
        <Box className="nav"
          sx={{
            
            height: 1,
            paddingTop: 15,
            position: "fixed",
            width: 340,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
             {renderMenu}
        </Box>
      }
    </Box>
  );
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
  const active = item.path === pathname;

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

