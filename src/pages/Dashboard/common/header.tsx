import { Button } from 'react-bootstrap';
import './index.css';
import { signout } from '../../../../service/auth_service';
import Stack from '@mui/material/Stack';
import LanguagePopover from './language';
import NotificationsPopover from './notification';
import AccountPopover from './account';

const Header = () => {
    return (
        <div className='main'>
            ssad
            <Button
                onClick={() => {
                    window.location.href = '/login';
                    signout();

                }}
            >
                Çıkış Yap
            </Button>

                <Stack direction="row" alignItems="center" spacing={1}>
                <LanguagePopover />
                <NotificationsPopover />
                <AccountPopover />
            </Stack>
        </div >
    );
}

export default Header;