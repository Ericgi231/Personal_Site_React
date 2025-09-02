import { Outlet } from "react-router-dom";
import { Bar } from './Footer.styles';

const Footer = () => {
    return (
        <>
            <Outlet />
            <Bar>
            </Bar>
        </>
    );
};

export default Footer;