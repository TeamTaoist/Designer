import styled from "styled-components";
import ViewPdf from "./components/ViewPdf";
import Layout from "./components/layout/layout";

const Box = styled.div`
  height: 100vh;
  padding: 40px;
`
export default function Detail(){
    return <Layout>
        <Box>
            <ViewPdf />
        </Box>
    </Layout>
}
