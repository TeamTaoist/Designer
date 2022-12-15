import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../home";
import Contracts from "../Contract";
import Mine from "../Mine";
import Setting from "../setting";
import New from "../new";

function RouterLink() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/contracts" element={<Contracts />} />
            <Route path="/mine" element={<Mine />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/new" element={<New />} />
        </Routes>
    );
}

export default RouterLink;
