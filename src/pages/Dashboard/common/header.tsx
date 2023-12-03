import { Button } from 'react-bootstrap';
import './index.css';
import { signout } from '../../../../service/auth_service';
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
        </div >
    );
}

export default Header;