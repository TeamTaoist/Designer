import styled from "styled-components";
import ViewPdf from "./components/ViewPdf";
import Layout from "./components/layout/layout";
import {useState} from "react";

import pdfdemo from "./assets/Introduction.pdf";

const Box = styled.div`
  height: 100vh;
  padding: 40px;
`
export default function Detail(){

     const [ fileUrl,setFileUrl] = useState('');

    return <Layout>
        <Box>
            {/*<ViewPdf fileUrl={fileUrl}/>*/}
            <ViewPdf fileUrl={pdfdemo}/>
        </Box>
    </Layout>
}
