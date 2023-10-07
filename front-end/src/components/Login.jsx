import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextInput,
  Title,
  Subtitle,
  Grid,
  Col,
  Card,
  Flex,
} from "@tremor/react";
import axios from "axios";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

import reactLogo from "../assets/react.svg";

export default function Login() {
  const url = "http://127.0.0.1:8000/api/authentication/login/";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleClick = async () => {
    // Prevenir refresco de página

    try {
      // Llamar API
      const data = {
        username: username,
        password: password,
      };
      const response = await axios.post(url, data);

      // Manejar respuesta
      console.log(response);

      navigate("/table");
    } catch (error) {
      // Manejar error
      console.error(error);
      setError(true);
      setText("credenciales incorrectas");
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setError(false);
    setText("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(false);
    setText("");
  };

  return (
    <Grid className="gap2" numItems={1} numItemsMd={3}>
      <div></div>
      <Col className="gap2">
        <div></div>
        <Card className="">
          <Flex flexDirection="col">
            <img src={reactLogo} alt="React Logo" />
            <Title>Login</Title>
            <Subtitle>Please enter your credentials</Subtitle>
            <TextInput
              value={username}
              onChange={handleUsernameChange}
              className="mt-4"
              placeholder="Username"
              error={error}
            />
            <TextInput
              type="password"
              className="mt-4"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              error={error}
              errorMessage={text}
            />
            <Button
              type="button"
              icon={ArrowRightOnRectangleIcon}
              className="mt-4"
              onClick={() => handleClick()}
            >
              Iniciar Sesion
            </Button>
            <Subtitle>{text}</Subtitle>
          </Flex>
        </Card>
        <div></div>
      </Col>
      <div></div>
    </Grid>
  );
}
