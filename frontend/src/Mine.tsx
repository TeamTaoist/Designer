import Layout from "./components/layout/layout";
import styled from "styled-components";
import ViewImg from "./assets/images/icon_eye.svg";
import DownImg from "./assets/images/icon_download.svg";
import History from "./assets/images/icon_history.svg";
import Finished from "./assets/images/icon_check_handwritten.svg";

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

const UlBox = styled.ul`
  width: 100%;
  li{
    margin-top: 30px;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    background: #040404;
    border-radius: 4px;
    background: linear-gradient(180deg,#468a4d,#263d7f);
    padding: 1px 1px 1px 5px;
  }
  .bg{
    background: #040404;
    border-radius: 4px;
    width: 100%;
    height: 100%;
    display: flex;
    padding: 20px;
    align-items: flex-start;
    flex-direction: column;
    .inner{
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      width: 100%;
      border-bottom: 1px dashed rgba(255,255,255,0.2);
      padding-bottom: 10px;
    }
  }
  .name{
    font-family: "bold";
    font-size: 20px;
    padding-bottom: 5px;
  }
  .time{
    font-family: "Lato-Light";
    opacity: 0.5;
  }
`

const LineBox = styled.div`
  .addrBox{
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 10px;
    .finishedImg img{
      width: 20px;
      margin-left: 10px;
    }
  }
  .tit{
    margin-right: 20px;
  }
`
const Operation = styled.ul`
    display: flex;
  justify-content: flex-end;
  align-items: center;
  .li{
    display: flex;
    align-items: center;
  }
    img{
      width: 20px;
      margin-right: 10px;
      cursor: pointer;
    }
`

export default function Mine(){
    return <div>
        <Layout>
            <Box>
                <TabBox>
                    <li className="active">My Contracts</li>
                </TabBox>
                <UlBox>
                    {
                        [...Array(5)].map((item,index)=>(<li key={index}>
                            <div className="bg">
                                <div className="inner">
                                    <div>
                                        <div className="name">namecheap-order-109043863</div>
                                        <div className="time">December 16, 2022 01:03 AM</div>
                                    </div>
                                    <div className="status">Pending Signature</div>
                                    <Operation>
                                        <div className="li">
                                            <img src={ViewImg} alt="View"/>
                                        </div>
                                        <div className="li">
                                            <img src={DownImg} alt="Download"/>
                                        </div>
                                        <div className="li">
                                            <img src={History} alt="History"/>
                                        </div>

                                    </Operation>
                                </div>
                                <LineBox>
                                    <div className="addrBox">
                                        <div className="tit">created</div>
                                        <div className="addr">5GWE...mdnpj</div>
                                    </div>
                                    <div className="addrBox">
                                        <div className="tit">created</div>
                                        <div className="addr">5GWE...mdnpj</div>
                                        <div className="finishedImg">
                                            <img src={Finished} alt=""/>
                                        </div>
                                    </div>
                                </LineBox>
                            </div>
                        </li>))
                    }

                </UlBox>
            </Box>
        </Layout>
    </div>
}