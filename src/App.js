import React, { useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import PlainBox from "./experiments/PlainBox";
import ThreeD from "./experiments/ThreeD";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/plain" element={<PlainBox />}/>
        <Route path="/grid" element={<ThreeD/>}/>
      </Routes>
    </Router>
  );
}
