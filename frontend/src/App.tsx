import { ChatList } from "./components/ChatList";

import { Route, Routes } from "react-router-dom";

function App() {
  //test
  return (
    <Routes>
      <Route path="/" element={<h1>Work</h1>} />
      <Route path="/chatslist" element={<ChatList />} />
      <Route path="*" element={<h1>ERROR 404</h1>} />
      {/* {path="*"} Вывод ошибки, если пути не существует */}
    </Routes>
  );
}

export default App;
