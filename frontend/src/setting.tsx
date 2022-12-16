import Layout from "./components/layout/layout";
import styled from "styled-components";

const Box = styled.div`
    padding: 40px;
`

export default function Setting(){
    return <div>
        <Layout>
            <Box>
                Setting
            </Box>

        </Layout>
    </div>
}