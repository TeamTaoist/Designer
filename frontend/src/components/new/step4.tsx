import styled from "styled-components";
import BgImg from "../../assets/images/bg.png";
import GroupImg from "../../assets/images/icon_group.svg";
import PDFimg from "../../assets/images/icon_pdf.svg";

const Box = styled.div`
  margin-top: 40px;
`

const UlBox = styled.div`
  .w100{
    display: flex;
    align-items: center;
    width: 100%;
  }
    dl{
      background: #1c1d22;
      box-shadow: 2px 0 5px rgb(0 0 0 / 20%);
      display: flex;
      align-items: center;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 4px;
      position: relative;
      margin-left: 40px;
      flex-grow: 1;
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
`
const FinishedBox = styled.div`
  
  .progress-count{
    height:30px;
    width:30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-weight: 600;
    position: relative;
    z-index:10;
    color: transparent;
    background: linear-gradient(120deg,#3198f9, #00c1ff);
    &:before{
      content: "";
      height: 8px;
      width: 15px;
      border-left: 3px solid #000;
      border-bottom: 3px solid #000;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -60%) rotate(-45deg);
      transform-origin: center center;
    }
  }
`

const TitleBox = styled.div`
    margin-bottom: 10px;
  font-family: "bold";
  font-size: 20px;
`
export default function Step4(){
    return <Box>
        <UlBox>
            <TitleBox>
                Uploaded Document
            </TitleBox>
            <div className="w100">
                <FinishedBox>
                    <div className="progress-count" />
                </FinishedBox>
                <dl>
                    <dt>
                        <img src={PDFimg} alt=""/>
                    </dt>
                    <dd>
                        <div className="name">123.pdf</div>
                    </dd>
                </dl>
            </div>
            <TitleBox>
               Signers
            </TitleBox>
           <div className="w100">

               <FinishedBox>
                   <div className="progress-count" />
               </FinishedBox>
               <dl>

                   <dt>
                       <img src={GroupImg} alt=""/>
                   </dt>
                   <dd>
                       <div className="name">Adding a Participants Address</div>
                       <div>5GWY4cfLTvqD7fP3GE2Pf2DMvFBZ8s6QMymx3Bv6PE4mdnpj</div>
                   </dd>
               </dl>
           </div>

        </UlBox>
    </Box>
}