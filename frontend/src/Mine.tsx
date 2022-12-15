import Layout from "./components/layout/layout";
import styled from "styled-components";

const Box = styled.div`
    padding:20px 40px 40px;
`
const TabBox = styled.ul`
    display: flex;
    justify-content: flex-start;
  border-bottom: 2px solid rgba(255,255,255,0.3);
  li{
    font-family: "bold";
    font-size: 22px;
    padding: 10px 20px;
    color: rgba(255,255,255,0.5);
    margin-bottom: -2px;
    cursor: pointer;
    &.active{
      border-bottom: 2px solid #fcca00;
      color: #ffffff;
    }
  }
 
`

export default function Mine(){
    return <div>
        <Layout>

            <Box>
                <TabBox>
                    <li className="active">My Contracts</li>
                </TabBox>
                <div className="tableBox">
                    <table cellPadding="0" cellSpacing="0">
                        <tr>
                            <th>Scheme</th>
                            <th>State</th>
                            <th>Founder</th>
                            <th>Signtory</th>
                            <th>Operation</th>
                        </tr>
                        {
                            [...Array(10)].map((item,index)=>(  <tr key={index}>
                                <td>Scheme</td>
                                <td>State</td>
                                <td>State</td>
                                <td>State</td>
                                <td>State</td>
                            </tr>))
                        }
                    </table>
                </div>
            </Box>
        </Layout>
    </div>
}