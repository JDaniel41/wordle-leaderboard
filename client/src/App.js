import React from "react";
import { Button } from "react-bootstrap";
import "./App.css";
import InputForm from "./components/InputForm";
import axios from "axios";

function App() {
    const BASE_URL = "/api";

    const [name, setName] = React.useState("");
    const [worldleOutput, setWorldleOutput] = React.useState("");
    const [pin, setPin] = React.useState("");

    function handleSubmit(event) {
        event.preventDefault();
        console.log("Submitted!");
        console.log(name);
        console.log(worldleOutput);
        console.log(pin);

        axios
            .post(`${BASE_URL}/addScore`, {
                name: name,
                output: worldleOutput,
                pin: pin,
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <InputForm
                updateName={setName}
                updateWordle={setWorldleOutput}
                updatePin={setPin}
                handleSubmit={handleSubmit}
            />
        </div>
    );
}

export default App;
