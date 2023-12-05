import Header from "./common/header.tsx";
import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Nav from "./nav.tsx";
const Dashboard = () => {
  const [openNav, setOpenNav] = useState<boolean>(false);

    return ( 
        <div style={{
            backgroundColor: 'red',
            width:window.innerWidth,
            height:window.innerHeight
        }}>
            <Header/>
            <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        {/* <Main>{children}</Main> */}
      </Box>
        </div>
     );
}
 
export default Dashboard;