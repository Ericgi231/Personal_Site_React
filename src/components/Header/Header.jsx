import { Outlet } from "react-router-dom";
import { Bar } from './Header.styles'

const NavBar = () => {
    return (
        <>
            <Bar>
            </Bar>
            <Outlet />
        </>
    );
};
export default NavBar;