import { Button } from 'react-bootstrap';
import './index.css';
import { signout } from '../../../../service/auth_service';
import Stack from '@mui/material/Stack';
import LanguagePopover from './language';
import NotificationsPopover from './notification';
import AccountPopover from './account';
import { Flex, Group } from '@mantine/core';

const Header = () => {
    return (
        <Flex className='main'  gap="xl"
        justify="flex-end"
        align="center"
        direction="row"
        wrap="wrap"
        >
                <Stack mr={"10px"} direction="row" alignItems="center" spacing={1}>
                <LanguagePopover />
                <NotificationsPopover />
                <AccountPopover />
            </Stack>
        </Flex >
    );
}

export default Header;