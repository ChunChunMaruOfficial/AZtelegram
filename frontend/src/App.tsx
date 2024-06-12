import { Route, Routes } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Work</h1>} />
      <Route path="*" element={<h1>ERROR 404</h1>} />
      {/* {path="*"} Вывод ошибки, если пути не существует */}
    </Routes>
  );
}

export default App;
