import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Layout } from "antd";
import { Home } from "./pages/Home";
import { Checkout } from "./pages/Checkout";
import { LandingPage } from "./pages/LandingPage"
import LoginModal from "./components/LoginModal";
import HeaderComponent from "./components/HeaderComponent";

const { Content } = Layout;

function App() {
  const [userEmail, setUserEmail] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);  

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
      <HeaderComponent userEmail={userEmail} setLoginVisible={setLoginVisible} /> 
        
        <Content style={{ padding: "2rem" }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home userEmail={userEmail} />} />
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
