import styled from "styled-components";
import ViewPdf from "../ViewPdf";

const Box = styled.div`
  margin-top: 40px;
  height: 100vh;
  background: #1c1d22;
`
export default function Step3(){
    return <Box>
        <ViewPdf />
    </Box>
}