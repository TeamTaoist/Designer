import {useState} from "react";
import styled from "styled-components";
import Layout from "./components/layout/layout";
import { useNavigate } from "react-router-dom";
import DownImg from "./assets/images/icon_down_arrow_outline.svg";
import CheckImg from "./assets/images/icon_check.svg";
import Wait from "./components/wait";

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
    flex-direction: column;
    background: #1c1d22;
    border-radius: 4px;
  }
  .line{
    background: linear-gradient(90deg,#468a4d,#263d7f);
    height: 7px;
    width: 100%;
    border-radius: 4px 4px 0 0;
  }
   dl {
     cursor: pointer;
    }
  dt{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    &>div{
      width: 33.33333%;
    }
    .name{
      text-align: left;
    }
    .time{
      text-align: center;
    }
    .status{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .rht img{
        width: 20px;
        margin:6px 0 0 10px;
      }
    }
  }
  dd{
    border-top: 1px dashed rgba(255,255,255,0.2);
    padding: 20px;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    &.show{
      display: flex;
    }
    &.none{
      display: none;
    }
  }
`

const TimeLine = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 40px;
  .liBox{
    padding-left: 40px;
  }
  .tit{
    display: flex;
    align-items: flex-start;
    margin-left: -60px;
    span{
      margin-left: 20px;
      padding:10px 30px;
      background: #000;
      border-radius: 4px;
      position: relative;
      &:before {
        position: absolute;
        top: 13px;
        left: 0;
        content: "";
        margin-left: -7px;
        border-top: 7px solid transparent;
        border-bottom: 7px solid transparent;
        border-right: 7px solid #000;
      }
    }
  }
  .icon{
    margin-right:10px;
    background: linear-gradient(120deg,#3198f9, #00c1ff);
    width: 40px;
    height: 40px;
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    img{
      width:30px;
    }
  }
`
const LftBox = styled.div`
    display: flex;
  flex-direction:column;
  .brdr{
    border-left: 1px dashed #3198f9;
    &:last-child{
      border-left: 0;
    }
  }
`

const ContentBox = styled.div`
    padding: 10px 0 30px;
  .addr{
    padding:10px 20px;
    opacity: 0.5;
  }
`

const RhtBox = styled.div`
    padding: 40px;
  width: 30%;
  border-left: 1px dashed rgba(255,255,255,0.1);
  .hashLine{
    margin-bottom: 30px;
  }
  .top{
    opacity: 0.5;
    padding-bottom: 10px;
  }
`
const LastLine = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fcca00;
  color: #000000;
  padding: 0 20px;
  border-radius: 4px;
  font-family: "Lato-Light";
  height: 40px;
  cursor: pointer;
  width: 100px;
`

export default function Contract(){
    const navigate = useNavigate();
    const [current, setCurrrent] = useState<number>(0);
    const [ list ] = useState(['Queue','History']);
    const [ showArr,setShowArr ] = useState(new Array(6).fill(false));
    const handleClick = (i:number) => {
        setCurrrent(i);
    };

    const handleShow = (num:number) =>{
        let arr:boolean[] =new Array(6).fill(false);
        arr[num] = true;
        setShowArr(arr)
    }

    const handleView = () =>{
        navigate("/detail")
    }

    return<Layout>
            <Box>
                <TabBox>
                    {
                        list.map((item,index)=><li className={current === index ? "active" : ""} onClick={()=>handleClick(index)}>{item}</li>)
                    }
                </TabBox>
                <UlBox>
                    {
                        [...Array(6)].map((item,index)=>(<li key={index}>
                            <div className="line" />
                            <dl onClick={()=>handleShow(index)}>
                                <dt>
                                    <div className="name">namecheap-order-109043863</div>
                                    <div className="time">December 16, 2022 01:03 AM</div>
                                    <div className="status">
                                        <div>Pending Signature</div>
                                        <div className="rht">
                                            <img src={DownImg} alt=""/>
                                        </div>
                                    </div>
                                </dt>
                                <dd className={showArr[index]?'show':'none'}>
                                    <LftBox>
                                        <TimeLine className="brdr">
                                            <div className="liBox">
                                                <div className="tit">
                                                    <div className="icon">
                                                        <Wait />
                                                    </div>
                                                    <span>Pending</span>
                                                </div>
                                                <ContentBox >
                                                    <div className="addr">5GWY4cfLTvqD7fP3GE2Pf2DMvFBZ8s6QMymx3Bv6PE4mdnpj</div>
                                                    <div className="addr">5GWY4cfLTvqD7fP3GE2Pf2DMvFBZ8s6QMymx3Bv6PE4mdnpj</div>
                                                </ContentBox>
                                            </div>
                                        </TimeLine>
                                        <TimeLine className="brdr">
                                            <div className="liBox">
                                                <div className="tit">
                                                    <div className="icon">
                                                        <img src={CheckImg} alt=""/>
                                                    </div>
                                                    <span>Pending</span>
                                                </div>
                                                <ContentBox >
                                                    <div className="addr">5GWY4cfLTvqD7fP3GE2Pf2DMvFBZ8s6QMymx3Bv6PE4mdnpj</div>
                                                    <div className="addr">5GWY4cfLTvqD7fP3GE2Pf2DMvFBZ8s6QMymx3Bv6PE4mdnpj</div>
                                                </ContentBox>
                                            </div>
                                        </TimeLine>
                                    </LftBox>
                                    <RhtBox>
                                        <div className="hashLine">
                                            <div className="top">TX Hash: </div><div>5GWY4cfLTvqD7fP3...npj</div>
                                        </div>
                                        <div className="hashLine">
                                            <div className="top">File Hash: </div><div>5GWY4cfLTvqD7fP3...npj</div>
                                        </div>
                                        <div className="hashLine">
                                            <div className="top">Created: </div><div>5GWY4cfLTvqD7fP3...npj</div>
                                        </div>
                                        <LastLine onClick={()=>handleView()}>View</LastLine>
                                    </RhtBox>
                                </dd>

                            </dl>
                        </li>))
                    }


                </UlBox>
            </Box>
        </Layout>
}