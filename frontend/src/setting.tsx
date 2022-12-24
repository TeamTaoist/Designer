import Layout from "./components/layout/layout";
import styled from "styled-components";
import EmptyImg from "./assets/images/icon_empty.svg";
import RhtImg from "./assets/images/icon_arrow_down.svg";

// const Box = styled.div`
//     padding: 40px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 100%;
//   font-size: 24px;
//   text-align: center;
//   color: #666;
//   img{
//     width: 200px;
//     margin-bottom: 20px;
//   }
// `

const MainContent = styled.div`
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

const DlBox = styled.div`
  margin-top: 30px;
  background: #1c1d22;
  box-shadow: 2px 0 5px rgb(0 0 0 / 20%);
  padding: 10px 0;
  border-radius: 4px;
  dl{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 20px;
    padding: 20px 0;
    border-bottom: 1px dashed rgba(255,255,255,0.2);
    &:last-child{
      border-bottom: 0;
    }
  }
  dt{
    opacity: 0.6;
    font-family: "Lato-Light";
  }
  dd{
    display: flex;
    align-items: center;
    img{
      width: 16px;
      margin-left: 10px;
      transform: rotate(-90deg);
      opacity: 0.5;
    }
  }
`

export default function Setting(){
    return <div>
        <Layout>
            {/*<Box>*/}
            {/*    <div>*/}
            {/*        <img src={EmptyImg} alt=""/>*/}
            {/*        <div>Setting's page is in development</div>*/}
            {/*    </div>*/}

            {/*</Box>*/}
            <MainContent>
                <TabBox>
                    <li className="active">Settings</li>
                </TabBox>
                <DlBox>
                    <dl>
                        <dt>Language</dt>
                        <dd>
                            <span>English</span>
                            <img src={RhtImg} alt=""/>
                        </dd>
                    </dl>
                    <dl>
                        <dt>Appearance</dt>
                        <dd>
                            <span>Follow system settings</span>
                            <img src={RhtImg} alt=""/>
                        </dd>
                    </dl>
                </DlBox>
                <DlBox>
                    <dl>
                        <dt>Manage your Account</dt>
                        <dd>
                            <img src={RhtImg} alt=""/>
                        </dd>
                    </dl>
                </DlBox>
                <DlBox>
                    <dl>
                        <dt>Debug Mode</dt>
                        <dd>
                            <img src={RhtImg} alt=""/>
                        </dd>
                    </dl>
                    <dl>
                        <dt>Privacy Guide</dt>
                        <dd>
                            <img src={RhtImg} alt=""/>
                        </dd>
                    </dl>
                    <dl>
                        <dt>Security</dt>
                        <dd>
                            <img src={RhtImg} alt=""/>
                        </dd>
                    </dl>
                </DlBox>
            </MainContent>
        </Layout>
    </div>
}