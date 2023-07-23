import Container from "react-bootstrap/esm/Container";
import Header from "./components/Header";
import Footer from "./components/Footer";
import React from "react";
import { Outlet } from "react-router";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
