
//  main code of u tube clone with all functionality
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Feed from "./components/Feed";
import SearchResult from "./components/SearchResult";
import VideoDetails from "./components/VideoDetails";
import { AppContext } from "./context/contextApi";
import LoginPage from "./components/Login";
import Notifications from "./components/Messages";

const App = () => {
    return (
        <AppContext>
            <BrowserRouter>
                <div className="flex flex-col h-full">
                    <Header />
                    <Routes>
                        <Route path="/" exact element={<Feed />} />
                        <Route
                            path="/searchResult/:searchQuery"
                            element={<SearchResult />}
                        />
                        <Route path="/video/:id" element={<VideoDetails />} />
                        <Route path="/loginPage" element={<LoginPage/>}/>
                        <Route path="/notifications" element={<Notifications/>}/>
                        <Route path="/channel" element={<Notifications/>}/>
                        <Route path="/purchase-membership" element={<Notifications/>}/>
                        <Route path="/dark-mode" element={<Notifications/>}/>
                        <Route path="/settings" element={<Notifications/>}/>
                        <Route path="/help" element={<Notifications/>}/>
                        <Route path="/feedback" element={<Notifications/>}/>
                        <Route path="/Forgot password?" element={<Notifications/>}/>
                        
                    </Routes>
                </div>
            </BrowserRouter>
        </AppContext>
    );
};

export default App;
