import React, { ReactNode } from "react";
import PropTypes from "prop-types";

import { ScrollArea, Space } from "@mantine/core";

interface MainProps {
  children: ReactNode;
  mobile: boolean;
}

const Main: React.FC<MainProps> = ({ children, mobile }) => {
  const main: React.CSSProperties = mobile
    ? {
        borderRadius: 10,
        width: "100%",
        height: window.innerHeight,
        padding: 10,
      }
    : {
        marginLeft: 240,
        borderRadius: 10,
        width: "100%",
        height: window.innerHeight,
        padding: 10,
      };

  return (
    <ScrollArea scrollbarSize={20} scrollHideDelay={6000} style={main}>
      <Space h={70}></Space>
      {children}
      </ScrollArea>
  );
};

Main.propTypes = {
  children: PropTypes.node,
};

export default Main;
