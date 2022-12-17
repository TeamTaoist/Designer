import styled from "styled-components";
import BgImg from "../../assets/images/bg.png";
import GroupImg from "../../assets/images/icon_group.svg";
import PDFimg from "../../assets/images/icon_pdf.svg";
import MeImg from "../../assets/images/icon_person.svg";
import CheckImg from "../../assets/images/icon_check.svg";

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
      margin-bottom: 10px;
    }
  }
`
const FinishedBox = styled.div`
  
  .progress-count{
    height:30px;
    width:30px;
    left: 0;
    top: -10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-weight: 600;
    position: relative;
    z-index:10;
    color: transparent;
    background: linear-gradient(120deg,#3198f9, #00c1ff);
    img{
      width: 24px;
    }
  }
`

const TitleBox = styled.div`
    margin-bottom: 10px;
  font-family: "bold";
  font-size: 20px;
`

interface obj{
    name:string
    address:string
}

interface Iprops{
    list:obj[]
    fileUrl:string
    fileObj:any
}
export default function Step4(props:Iprops){
    const {list,fileObj} =props;

    return <Box>
        <UlBox>
            {
                !!fileObj?.name &&
                <TitleBox>
                    Uploaded Document
                </TitleBox>
            }
            {
                !!fileObj?.name && <div className="w100">
                    <FinishedBox>
                        <div className="progress-count" >
                            <img src={CheckImg} alt=""/>
                        </div>
                    </FinishedBox>

                    <dl>
                        <dt>
                            <img src={PDFimg} alt=""/>
                        </dt>
                        <dd>
                            <div className="name">{fileObj?.name}</div>
                        </dd>
                    </dl>
                </div>
            }

            {
                !!list.length &&  <TitleBox>
                    Signers
                </TitleBox>
            }

            {
                list.map((item,index)=>(<div className="w100" key={`signer_${index}`}>

                    <FinishedBox>
                        <div className="progress-count" >
                            <img src={CheckImg} alt=""/>
                        </div>
                    </FinishedBox>
                    <dl>

                        <dt>
                            <img src={item.name==='Me'?MeImg:GroupImg} alt=""/>
                        </dt>
                        <dd>
                            <div className="name">{item.name}</div>
                            <div>{item.address}</div>
                        </dd>
                    </dl>
                </div>))
            }



        </UlBox>
    </Box>
}