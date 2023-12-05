
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import { Container, } from "@mantine/core";
import "./common/index.css";

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
          {renderContent}
        </Box>
      }
    </Box>
  );
};

export default Nav;
