import "./styles.css";
import { CompOne } from "./CompOne";
import { CompTwo } from "./CompTwo";

export default function App() {
  return (
    <div className="App">
      <h3>Unidirectional inter-component communication via events</h3>
      <p>Helps with the explicit ownership of shared state</p>
      <br />
      <CompOne />
      <br />
      <CompTwo />
    </div>
  );
}
