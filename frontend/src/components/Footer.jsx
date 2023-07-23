const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>
        &copy; {new Date().getFullYear()} GadgetJunkie. All rights reserved.
      </p>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: "#f4f4f4",
  padding: "1rem",
  textAlign: "center",
};

export default Footer;
