import { Route, Link } from 'react-router-dom';

function Menu() {
  const menus = [
    {
      name: 'Trang chủ',
      to: '/',
      exact: true
    },
    {
      name: 'Quản lý sản phẩm',
      to: '/product-list',
      exact: false
    },
  ]

  const MenuLink = ({ lable, to, activeOnlyWhenExact }) => {
    return (
      <Route
        path={to}
        exact={activeOnlyWhenExact}
        children={({ match }) => {
          var active = match ? 'active' : '';
          return(
            <li className={active}>
              <Link to ={to}>
                {lable}
              </Link>
            </li>
          );
        }}
      />
    );
  };

  const showMenus = (menus) => {
    var result = null;
    if(menus.length > 0){
      result = menus.map((menu,index) => {
        return(
          <MenuLink 
            key = {index}
            lable = {menu.name}
            to = {menu.to}
            activeOnlyWhenExact = {menu.exact}
          />
        );
      });
    }
    return result;
  } 
  return (
    <div className="navbar navbar-default">
      {/* <a className="navbar-brand" href=" ">Call API</a> */}
      <ul className="nav navbar-nav">
        {showMenus(menus)}
      </ul>
    </div>
  );
}

export default Menu;
