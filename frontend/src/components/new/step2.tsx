import styled from "styled-components";
import BgImg from "../../assets/images/bg.png";
import CloseImg from "../../assets/images/icon_close.svg";
import MeImg from "../../assets/images/icon_person.svg";
import GroupImg from "../../assets/images/icon_group.svg";

const Box = styled.div`
  padding-top: 40px;
`

const UlBox = styled.div`
    dl{
      background: #1c1d22;
      box-shadow: 2px 0 5px rgb(0 0 0 / 20%);
      display: flex;
      align-items: center;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 4px;
      position: relative;
    }
  dt{
    width: 80px;
    height: 80px;
    margin-right: 20px;
    background: url(${BgImg}) center no-repeat;
    background-size: 100% 100%;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 2px 0 5px rgb(0 0 0 / 20%);
    img{
      width: 33px;
    }
  }
  dd{
    color: #c0c2cd;
    .name{
      font-size: 18px;
      color: #ffffff;
    }
  }
  .close{
    position: absolute;
    right: -10px;
    top: -10px;
    width: 30px;
    height:30px;
    background: #000;
    border: 1px solid #fcca00;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    img{
      width: 15px;
    }
  }
`
const Wallet = styled.div`
    display: flex;
  justify-content: center;
  align-items: center;
  background: #fcca00;
  color: #000000;
  padding: 0 20px;
  border-radius: 4px;
  font-family: "Lato-Regular";
  width: 200px;
  margin-top: 40px;
  height: 50px;
`

export default function Step2(){
    return <Box>
        <UlBox>
            <dl>
                <dt>
                    <img src={MeImg} alt=""/>
                </dt>
                <dd>
                    <div className="name">Me</div>
                    <div>5GWY4cfLTvqD7fP3GE2Pf2DMvFBZ8s6QMymx3Bv6PE4mdnpj</div>
                </dd>
            </dl>
            <dl>
                <div className="close">
                    <img src={CloseImg} alt=""/>
                </div>
                <dt>
                    <img src={GroupImg} alt=""/>
                </dt>
                <dd>
                    <div className="name">Adding a Participants Address</div>
                    <div>5GWY4cfLTvqD7fP3GE2Pf2DMvFBZ8s6QMymx3Bv6PE4mdnpj</div>
                </dd>
            </dl>
            <dl>
                <div className="close">
                    <img src={CloseImg} alt=""/>
                </div>
                <dt>
                    <img src={GroupImg} alt=""/>
                </dt>
                <dd>
                    <div className="name">Adding a Participants Address</div>
                    <div>5GWY4cfLTvqD7fP3GE2Pf2DMvFBZ8s6QMymx3Bv6PE4mdnpj</div>
                </dd>
            </dl>
        </UlBox>
        <div>
            <Wallet>Add a signer</Wallet>
        </div>
    </Box>
}