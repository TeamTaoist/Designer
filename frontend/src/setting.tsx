import Layout from "./components/layout/layout";
import styled from "styled-components";
import EmptyImg from "./assets/images/icon_empty.svg";

const Box = styled.div`
    padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 24px;
  text-align: center;
  color: #666;
  img{
    width: 200px;
    margin-bottom: 20px;
  }
`

export default function Setting(){
    return <div>
        <Layout>
            <Box>
                <div>
                    <img src={EmptyImg} alt=""/>
                    <div>Setting's page is in development</div>
                </div>

            </Box>

        </Layout>
    </div>
}