import React from "react";
import "./header.css";
import netflix_logo from "../../assets/images/logo/Netflix_Word_Logo.png";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Banner from "../Banner/Banner";

function Header() {
  return (
    <header>
      <nav>

          <div className="nav-left">
            <ul>
              <a>
                <img src={netflix_logo} alt="" className="logo" />
              </a>
              <li>
                <a href="">Home</a>
              </li>
              <li>
                <a href="">TVShows</a>
              </li>
              <li>
                <a href="">Movies</a>
              </li>
              <li>
                <a href="">Latest</a>
              </li>
              <li>
                <a href="">My List</a>
              </li>
              <li>
                <a href="">Browse by Languages</a>
              </li>
            </ul>
          </div>
          <div className="nav-right">
            <ul>
              <li>
                <SearchIcon />
              </li>
              <li>
                <NotificationsIcon />
              </li>
              <li>
                <AccountBoxIcon />
              </li>
              <li>
                <ArrowDropDownIcon />
              </li>
            </ul>
          </div>
        
      </nav>

      {/* import the banner part */}
      <Banner />

    </header>
  );
}

export default Header;
