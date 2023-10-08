import { Container, Box, Typography, Grid  } from "@mui/material";
import { styled } from "@mui/system";
import Chart from "./chart";
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ThermostatIcon from '@mui/icons-material/Thermostat';

const BoxWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const BoxChart = styled(Box)({
  width: "100%",
  background: "#FFFFFF",
  boxShadow: " 2px 4px 20px 0px rgba(0, 0, 0, 0.25);",
  borderRadius: "0.375rem",
  margin: 10,
  padding: "20px 30px 0 0",
});
const BoxContainer = styled(Box)({
  display: "flex",
});
const CardBox = styled(Box)({
  width: "200px",
  background: "#FFFFFF",
  height: "130px",
  boxShadow: " 2px 4px 20px 0px rgba(0, 0, 0, 0.25);",
  borderRadius: "0.375rem",
  margin: 10,
  display: "flex",
  alignItems: "center", 
});
const CardBoxSecond = styled(Box)({
  background: "#FFFFFF",
  height: "150px",
  boxShadow: " 2px 4px 20px 0px rgba(0, 0, 0, 0.25);",
  borderRadius: "0.375rem",
  margin: 10,
});
const ChartBox = styled(Box)({
  background: "#FFFFFF",
  height: "320px",
  boxShadow: " 2px 4px 20px 0px rgba(0, 0, 0, 0.25);",
  borderRadius: "0.375rem",
  margin: 10,
  padding: "20px 30px 0 0",
});

const Main = ({temperatureData, humidityData}) => {
 
  return (
    <Container maxWidth="xl">
      <BoxWrapper>
        <BoxChart>
          <Chart data={temperatureData} dataValue={"temperature"} />
        </BoxChart>
        <Box>
          <BoxContainer>
          <CardBox>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <WaterDropIcon color='primary' sx={{ fontSize: 40 }} />
                </Grid>
                <Grid item xs={9}>
                  <Box>
                    <Typography variant="h5">Humidity</Typography>
                    <Typography>20%</Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardBox>
            <CardBox>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <ThermostatIcon color='Secondary' sx={{ fontSize: 40 }} />
                </Grid>
                <Grid item xs={9}>
                  <Box>
                    <Typography variant="h6">Temperature</Typography>
                    <Typography>20 °C</Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardBox>
          </BoxContainer>
          <CardBoxSecond />
        </Box>
        <BoxChart>
          <Chart data={humidityData} dataValue={"humidity"} />
        </BoxChart>
      </BoxWrapper>
      <ChartBox>
        <Chart  data={temperatureData} dataValue={"temperature"} />
      </ChartBox>
    </Container>
  );
};

export default Main;
