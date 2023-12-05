import "./index.css";
import Stack from "@mui/material/Stack";
import LanguagePopover from "./language";
import NotificationsPopover from "./notification";
import AccountPopover from "./account";
import { Container, Flex } from "@mantine/core";
import { FcMenu } from "react-icons/fc";
interface HeaderProps {
  mobile: boolean;
  onOpenNav: () => void;
}

const Header: React.FC<HeaderProps> = ({ mobile, onOpenNav }) => {
  return (
    <Flex
      className="main"
      gap="xl"
      justify={mobile === true ? "space-between" : "flex-end"}
      align="center"
      direction="row"
      wrap="wrap"
    >
      {mobile === true && (
        <Container ml={"10px"}>
          <FcMenu size={30} onClick={onOpenNav} />
        </Container>
      )}
      <Flex direction="row">
        <Stack mr={"10px"} direction="row" alignItems="center" spacing={1}>
          <LanguagePopover />
          <NotificationsPopover />
          <AccountPopover />
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Header;
