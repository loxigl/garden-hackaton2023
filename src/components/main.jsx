import { Container, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Chart from "./rotate";
import humidity from '../assets/humidity.svg'
import temperature from '../assets/temperature.svg'

const BoxWrapper = styled(Box)({
  display: "flex",
});

const BoxContainer = styled(Box)({
  display: "flex",
  flexDirection: 'column'
});
const CardBox = styled(Box)({
  width: 300,
  height: 200,
  borderRadius: '1.875rem',
  border: '3px solid #000',
  background: '#DBF8FF',
  margin: 10,
  display: 'flex'
});
const ChartBox = styled(Box)({
  width: '100%',
  borderRadius: '1.875rem',
  border: '3px solid #000',
  background: '#DBF8FF',
  margin: 10,
  padding: '20px 20px 0 0'
});

const BoxChartData = styled(Box)({
  width: '100%',
  height: '50%',
  borderRadius: '1.875rem',
  border: '3px solid #000',
  background: '#DBF8FF',
  margin: 10,
  display: 'flex',
  padding: '20px 20px 0 0'
});

const TitleCard = styled(Typography)({
  margin: '10px 0 10px 20px',
  fontSize: 30
})

const IconCard = styled('img')({
  maxWidth: '100px',
})

const DataText = styled(Typography)({
  margin: '10px 0 10px 20px',
  fontSize: 40
})



const Main = ({ data1, data2 }) => {
  return (
    <Container maxWidth="xl">
      <BoxWrapper>
      <BoxContainer>
            <CardBox>
                <IconCard src={humidity}></IconCard>
                <Box>
                <TitleCard>Humidity</TitleCard>
                <DataText>20 %</DataText>
                </Box>
            </CardBox>
            <CardBox>
                <IconCard src={temperature}></IconCard>
                <Box>
                <TitleCard>Temperature</TitleCard>
                <DataText>20 °C</DataText>
                </Box>
            </CardBox>
            <CardBox>
                <IconCard src={humidity}></IconCard>
                <Box>
                <TitleCard>Humidity</TitleCard>
                <DataText>20 %</DataText>
                </Box>
            </CardBox>
          </BoxContainer>
          <ChartBox>
          <Chart data={data1} />
          <Chart data={data1} />
          </ChartBox>
          <BoxChartData>
          <Chart data={data2} />
          </BoxChartData>
      </BoxWrapper>
    </Container>
  );
};

export default Main;
