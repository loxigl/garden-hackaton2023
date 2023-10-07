import { styled } from "@mui/system";
import Header from "./components/header";
import Main from "./components/main";
import CssBaseline from "@mui/material/CssBaseline";
// import WebSocketComponent from './components/WebSocketComponent';

const AppContainer = styled("div")({
  backgroundColor: "#FAFFFF", 
  minHeight: '100vh'
});

function App() {
  const data1 = [
    { name: "12.00", value: 0 },
    { name: "12.10", value: 30 },
    { name: "12.20", value: 45 },
    { name: "12.20", value: 55 },
    { name: "12.20", value: 90 },
  ];

  const data2 = [
    { name: "12.00", value: 0 },
    { name: "12.10", value: 30 },
    { name: "12.20", value: 45 },
    { name: "12.20", value: 0 },
    { name: "12.20", value: 90 },
  ];
  return (
    <AppContainer>
      <CssBaseline />
      <Header />
      <Main data1={data1} data2={data2} />
      {/* <WebSocketComponent /> */}
    </AppContainer>
  );
}

export default App;
