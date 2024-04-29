import { Outlet} from "react-router-dom";
import Header from "../header/header";

// Данный компонент отображается на всех страницах. В него входит меню с навигацией и подвал сайта
function Layout() {
    return (
      <div style={{minHeight: "100vh"}}>
        <Header/>
        <Outlet />
      </div>
    );
}

export default Layout;