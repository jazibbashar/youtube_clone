import React, { useContext, useState ,useRef,useEffect} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AccountCircle, SwitchAccount, Logout, PermIdentityOutlined,CurrencyExchange, Keyboard, DarkMode, SettingsSuggest, HelpOutlineOutlined, FeedbackOutlined, LoginOutlined, Home } from "@mui/icons-material";
import ytLogo from "../images/yt-logo.png";
import ytLogoMobile from "../images/yt-logo-mobile.png";
import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import { Context } from "../context/contextApi";
import Loader from "../shared/loader";

const Header = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const { loading, mobileMenu, setMobileMenu } = useContext(Context);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState(null);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const searchQueryHandler = (event) => {
        if (
            (event?.key === "Enter" || event === "searchButton") &&
            searchQuery?.length > 0
        ) {
            navigate(`/searchResult/${searchQuery}`);
        }
    };

    const mobileMenuToggle = () => {
        setMobileMenu(!mobileMenu);
    };

    const { pathname } = useLocation();
    const pageName = pathname?.split("/")?.filter(Boolean)?.[0];
    
  const toggleDropdown = () => {
    // Check if the user is logged in based on local storage
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    setLoggedIn(isLoggedIn);

    // Get user email from local storage if logged in
    if (isLoggedIn) {
      const email = localStorage.getItem("email");
      setUserEmail(email);
    }

    setShowDropdown(!showDropdown);
  };
  const handleSignOut = () => {
    localStorage.removeItem("email");
    localStorage.setItem("loggedIn", "false");
    setLoggedIn(false);
    setUserEmail(null);
    setShowDropdown(false);
  };

  useEffect(() => {
    // Check if the user is logged in based on local storage
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    setLoggedIn(isLoggedIn);

    // Get user email from local storage if logged in
    if (isLoggedIn) {
      const email = localStorage.getItem("email");
      setUserEmail(email);
    }
  }, []);

  // Function to handle click outside dropdown to close it
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleBellClick = () => {
    // Redirect the user to the notifications page
    navigate("/notifications");
    // Close the dropdown after redirection (optional)
    setShowDropdown(false);
  };


    return (
        <div className="sticky top-0 z-10 flex flex-row items-center justify-between h-14 px-4 md:px-5 bg-black dark:bg-black">
            {loading && <Loader />}

            <div className="flex h-5 items-center">
                {pageName !== "video" && (
                    <div
                        className="flex md:hidden md:mr-6 cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]"
                        onClick={mobileMenuToggle}
                    >
                        {mobileMenu ? (
                            <CgClose className="text-white text-xl" />
                        ) : (
                            <SlMenu className="text-white text-xl" />
                        )}
                    </div>
                )}
                <Link to="/" className="flex h-5 items-center">
                <img
                  className="h-full hidden md:block"
                  src={ytLogo}
                  alt="Youtube"
                />
                <img
                  className="h-full md:hidden"
                  src={ytLogoMobile}
                  alt="Youtube"
                />
              </Link>
            </div>
            <div className="group flex items-center">
                <div className="flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
                    <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
                        <IoIosSearch className="text-white text-xl" />
                    </div>
                    <input
                        type="text"
                        className="bg-transparent outline-none text-white pr-5 pl-5 md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyUp={searchQueryHandler}
                        placeholder="Search"
                        value={searchQuery}
                    />
                </div>
                <button
                    className="w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#303030] rounded-r-3xl bg-white/[0.1]"
                    onClick={() => searchQueryHandler("searchButton")}
                >
                    <IoIosSearch className="text-white text-xl" />
                </button>
            </div>
            <div className="flex items-center">
                <div className="hidden md:flex">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
                        <RiVideoAddLine className="text-white text-xl cursor-pointer" onClick={handleBellClick} />
                    </div>
                    <div className="flex items-center justify-center ml-2 h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
                        <FiBell className="text-white text-xl cursor-pointer" onClick={handleBellClick} />
                    </div>
                </div>
                <div className="flex h-8 w-8 overflow-hidden rounded-full md:ml-4" onClick={toggleDropdown} style={{cursor:'pointer'}}>
                    <img src="https://xsgames.co/randomusers/assets/avatars/female/67.jpg" />
                </div>
            </div>
            {showDropdown && (
                <div
                  ref={dropdownRef}
                  style={{
                    position: "absolute",
                    top: "150%", // Changed to "100%" to position the dropdown below the user account icon
                    right: 0,
                    minWidth: "220px",
                    background: "white",
                    boxShadow: "0 3px 18px 15px rgba(0, 0, 0, 0.08)",
                    borderRadius: "8px",
                    padding: "12px",
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "15px",
                    borderBottomWidth: "47px  solid black",
                    // Media query for small screens
                    "@media screen and (max-width: 600px)": {
                      top: "100%",
                      minWidth: "180px",
                      alignItems: "center",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                    },
                  }}
                >
                <ul style={{ listStyle: "none", padding: 0 }}>
                {loggedIn && userEmail && (
                  // If logged in, display user's email in the dropdown with the AccountCircle emoji
                  <li style={{ marginBottom: "18px", textAlign: "center", display: "flex", alignItems: "center" }}>
                    <AccountCircle style={{ fontSize: "18px", marginRight: "10px" }} />
                    {userEmail}
                  </li>
                )}
                {loggedIn ? (
                  // If logged in, display sign-out option
                  <li
                    style={{
                      marginRight:'18px',
                      marginBottom: "11px",
                      cursor: "pointer",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      borderBottomWidth: "47px  solid black",
                      borderBottom: "0.5px  solid black",
                      width:'100%', 
                    }}
                    onClick={handleSignOut}
                  >
                    <Logout style={{ fontSize: "15px", marginRight: "12px" }} />
                    Sign Out
                  </li>
                ) : (
                  // If not logged in, display login and sign-up options
                  <>
                    <li
                      style={{
                        marginBottom: "18px",
                        cursor: "pointer",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        borderBottomWidth: "47px  solid black",
                      }}
                    >
                      <LoginOutlined style={{ fontSize: "15px", marginRight: "8px" }} />
                      <Link
                        to="/loginPage"
                        style={{
                          color: "inherit",
                          textDecoration: "none",
                          display: "block",
                          padding: "8px",
                          backgroundColor: "white",
                          transition: "background-color 0.2s",
                          borderBottom: "0.5px  solid black",
                          width:'100%', 
                          
                          
                        
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "lightgray";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "white";
                        }}
                      >
                        Login
                      </Link>
                    </li>
                    <li
                      style={{
                        marginBottom: "18px",
                        cursor: "pointer",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <AccountCircle style={{ fontSize: "15px", marginRight: "8px" }} />
                      <Link
                        to="/loginPage"
                        style={{
                          color: "inherit",
                          textDecoration: "none",
                          display: "block",
                          padding: "8px",
                          backgroundColor: "white",
                          transition: "background-color 0.2s",
                          borderBottom: "0.5px  solid black",
                          width: '100%', // Add the thick line below the link
                          borderBottomWidth: "47px  solid black", // Add the thick line below the link
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "lightgray";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "white";
                        }}
                      >
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}
                {/* Add other list items with icons and hover effect */}
                <li style={{
                  marginTop:"auto",
                  marginBottom: "18px",
                  cursor: "pointer",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "0.5px  solid black",
                  width:'100%', 
              }}>
               <SwitchAccount style={{ fontSize:'15px',marginRight:'8px'}}/>
                  <Link to="/loginPage"
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    display: "block",
                    padding: "8px",
                    backgroundColor: "white",
                    transition: "background-color 0.2s",
                   
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "lightgray";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "white";
                  }}
                  >Switch Account  </Link>
                </li>
                <li style={{
                  
                   marginBottom: "18px",
                   cursor: "pointer",
                   borderRadius: "4px",
                   display: "flex",
                   alignItems: "center",
    
               }}
               >
               <PermIdentityOutlined style={{ fontSize: "15px", marginRight: "8px" }} />
               <Link to="/channel"
               style={{
                  color: "inherit",
                  textDecoration: "none",
                  display: "block",
                  padding: "8px",
                  backgroundColor: "white",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "lightgray";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "white";
                }}
                
              onClick={Home}  >Your Channel</Link>
              </li>
              <li style={{ 
              
                marginBottom: "18px",
                cursor: "pointer",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
              
              }}>
               <CurrencyExchange style={{ fontSize:'15px',marginRight:'8px'}}/>
                <Link to="/purchase-membership"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  display: "block",
                  padding: "8px",
                  backgroundColor: "white",
                  transition: "background-color 0.2s",
                  
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "lightgray";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "white";
                }}
                onClick={Home}   >Purchase and Membership</Link>
              </li>
              <li style={{ 
                
                marginBottom: "18px",
                cursor: "pointer",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
              
              }}>
               <Keyboard style={{ fontSize:'15px',marginRight:'8px'}}/>
               
                <Link to="/"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  display: "block",
                  padding: "8px",
                  backgroundColor: "white",
                  transition: "background-color 0.2s",
                  
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "lightgray";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "white";
                }}
                >Keyboard shortcuts</Link>
              </li>
              <li style={{ 
                // marginBottom: "30px"  
                marginBottom: "18px",
                cursor: "pointer",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
              
              }}>
               <DarkMode style={{ fontSize:'15px',marginRight:'8px'}}/>
         
                <Link to="/dark-mode"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  display: "block",
                  padding: "8px",
                  backgroundColor: "white",
                  transition: "background-color 0.2s",
                  // borderBottom: "0.5px  solid black",
                  // width:'100%', // Add the thick line below the link
                  
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "lightgray";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "white";
                }}
                >Dark Mode</Link>
              </li>
              <li style={{ 
                // marginBottom: "30px" 
                marginBottom: "18px",
                cursor: "pointer",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
              
              }}>
               <SettingsSuggest style={{ fontSize:'15px',marginRight:'8px'}}/>
                
              
                <Link to="/settings"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  display: "block",
                  padding: "8px",
                  backgroundColor: "white",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "lightgray";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "white";
                }}
                >Settings</Link>
              </li>
              <li style={{ 
                
                marginBottom: "18px",
                cursor: "pointer",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
              
              }}>
               <HelpOutlineOutlined style={{ fontSize:'15px',marginRight:'8px'}}/>
                
              
                <Link to="/help"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  display: "block",
                  padding: "8px",
                  backgroundColor: "white",
                  transition: "background-color 0.2s",
                  
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "lightgray";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "white";
                }}
                >Help</Link>
              </li>
              <li style={{ 
                // marginBottom: "30px" 
                marginBottom: "18px",
                cursor: "pointer",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
              
              }}>
               <FeedbackOutlined style={{ fontSize:'15px',marginRight:'8px'}}/>
                
              
              
                <Link to="/feedback"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  display: "block",
                  padding: "8px",
                  backgroundColor: "white",
                  transition: "background-color 0.2s",
                  borderBottomWidth: "47px  solid black",
                  borderBottom: "0.5px  solid black",
                  width:'100%', 
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "lightgray";
                  
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "white";
                }}
                >Send Feedback</Link>
              </li><br></br><h3 style={{fontWeight:'lighter', marginBottom: "18px",color:"inherit"}}> Cloned by Jazib Bashar.</h3>
    
              </ul>
            </div>
    )}
        </div>
    );
};

export default Header;