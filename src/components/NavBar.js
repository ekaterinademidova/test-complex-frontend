import React, { useState, useEffect } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../css/Nav.css';
import axios from 'axios';

import {
  Navbar,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { useAuth0 } from "@auth0/auth0-react";

import MenuItem from "./MenuItem";

const NavBar = ({setSelectedChapter}) => {
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  let [statusMenu, setStatusMenu] = useState(false);
  const showMenu = () => {
    setStatusMenu(!statusMenu);
  };

  const [categories, setCategories] = useState(
    {
      loading: false,
      categoriesList: [],
    }
  );
  useEffect(() => {
    setCategories({loading: true})
    const apiUrl1 = 'http://localhost:4000/categories';
    axios.get(apiUrl1)
      .then(res => {
        console.log(res);
        const allCategories = res.data;
        setCategories({
          loading: false,
          categoriesList: allCategories
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, [setCategories]);

  return (
    <div className="nav-container">
      <Navbar color="white" light expand="md">
        <Nav className="mr-auto" navbar>
          {isAuthenticated && (
            <>
              <div className="icon-side-menu__wrap">
                <div className={statusMenu ? "icon-side-menu open" : "icon-side-menu"} onClick={showMenu}>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            
              <div className={statusMenu ? "side-menu side-menu-opened" : "side-menu"}>
                <nav className="side-menu__wrap">
                  <ul className="side-menu__main-list ">
                    { showMenu ? 
                      !categories.loading ? 
                      (
                        categories.categoriesList.map((category) => <MenuItem key={"category_" + category.id} 
                                                                              category={category}  
                                                                              setSelectedChapter={setSelectedChapter}/>)
                      ) : 
                      (
                        <>Загрузка...</>
                      ) :
                      null
                    }
                  </ul>
                
                  <div className="side-menu__footer">
                    <a className="side-menu__footer_link" href="/">Пользовательское соглашение</a>
                    <a className="side-menu__footer_link" href="/">Обработка персональных данных</a>
                  </div>
                </nav>
              </div>
              <div className="logo-small__lines"></div>
            </>
          )} 
          <a href="/" className="logo-small">Тестовый комплекс</a>
        </Nav>
        <Nav className="d-md-block" navbar>
          <div className="top-navigation__right-wrap">
            {isAuthenticated && (
              <>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret id="profileDropDown">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="nav-user-profile rounded-circle"
                      width="50"
                    />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem header>{user.name}</DropdownItem>
                    <DropdownItem
                      tag={RouterNavLink}
                      to="/profile"
                      className="dropdown-profile"
                      activeClassName="router-link-exact-active"
                    >
                      <FontAwesomeIcon icon="user" className="mr-3" /> Профиль
                    </DropdownItem>
                    <DropdownItem
                      id="qsLogoutBtn"
                      onClick={() => logoutWithRedirect()}
                    >
                      <FontAwesomeIcon icon="power-off" className="mr-3" /> Выйти
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </>
            )} 
            {!isAuthenticated && (
              <a href="/user/auth/" class="button-red button-global button__login" onClick={() => loginWithRedirect()}><span>Войти</span></a>
            )}                     
          </div>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;
