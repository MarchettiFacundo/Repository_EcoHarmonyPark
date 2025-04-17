import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import logo from "./assets/logo.png";

import { Button, Layout } from "antd";
import { Home } from "./pages/Home";
import { Checkout } from "./pages/Checkout";
import LoginModal from "./components/LoginModal";

const { Header, Content } = Layout;

function App() {
  const [userEmail, setUserEmail] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#fff",
            padding: "0 1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={logo} alt="Logo" style={{ height: 40 }} />
            <span
              style={{ marginLeft: 10, fontWeight: "bold", fontSize: "18px" }}
            >
              EcoHarmonyPark
            </span>
          </div>

          <Button type="primary" onClick={() => setLoginVisible(true)}>
            {userEmail ? `Hola, ${userEmail}` : "Login"}
          </Button>
        </Header>

        <Content style={{ padding: "2rem" }}>
          <Routes>
            <Route path="/" element={<Home userEmail={userEmail} />} />
            <Route
              path="/checkout"
              element={
                userEmail ? (
                  <Checkout userEmail={userEmail} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
        </Content>
        <LoginModal
          visible={loginVisible}
          onClose={() => setLoginVisible(false)}
          onLogin={(email) => {
            setUserEmail(email);
            setLoginVisible(false);
          }}
        />
      </Layout>
    </Router>
  );
}

export default App;
