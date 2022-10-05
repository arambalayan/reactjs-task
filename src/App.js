import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./Pages/Main/Main";
import Info from "./Pages/Info/Info";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path={`pokemon/:id`} element={<Info/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
