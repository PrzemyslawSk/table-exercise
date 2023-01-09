import { useSelector } from "react-redux";
import ErrorComponent from "./components/ErrorComponent";
import MainComponent from "./components/MainComponent";
import { RootState } from "./redux/store";

function App() {
  const error = useSelector((state: RootState) => state.data.error);
  return <>{error === null ? <MainComponent /> : <ErrorComponent />}</>;
}

export default App;
