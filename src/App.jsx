import "./App.css";
import Button from "./components/base/button";
import Input from "./components/base/input/input";
import Todolist from "./components/todolist/Todolist";

function App() {
  return (
    <>
      {/* <Button
        vaniant="primary"
        size="lg"
        onClick={() => console.log("Clicked")}
      >
        Add user
      </Button> */}

      {/* <Input
        placeholder="Nhập email"
        name={"email"}
        id="email"
        type="email"
        onChange={(e) => console.log(e.target.value)}
      /> */}

      <Todolist />
    </>
  );
}

export default App;
