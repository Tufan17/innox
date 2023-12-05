import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

interface MainProps {
  children: ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  const main: React.CSSProperties = {
    marginTop: 72,
    marginLeft: 250,
    marginRight: 5,
    width: "100%",
    backgroundColor: "white",
    height: window.innerHeight - 100,
    borderRadius: 10,
    padding: 10,
  };

  return (
    <Box style={main}>
      {children}
    </Box>
  );
};

Main.propTypes = {
  children: PropTypes.node,
};

export default Main;
