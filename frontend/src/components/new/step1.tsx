import UploadImg from "../../assets/images/icon_add.svg";
import styled from "styled-components";
import {FormEvent, useState} from "react";
import PDFimg from "../../assets/images/icon_pdf.svg";
import BgImg from "../../assets/images/bg.png";

const Box = styled.div`
  padding-top: 40px;
  input[type="file"] {
    display: none;
  }
`
const UploadBox = styled.div`
  //border: 4px solid #fcca00;
  border: 1px dashed #fcca00;
  border-radius: 4px;
  padding:100px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #1c1d22;
  cursor: pointer;
  .center{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .uploadImg{
    width: 40px;
    margin-bottom: 20px;
  }
`

const TitleBox = styled.div`
  font-family: "bold";
  font-size: 24px;
  margin-bottom: 20px;
`

const UploadBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fcca00;
  color: #000000;
  border-radius: 4px;
  font-family: "Lato-Regular";
  width: 100px;
  margin-top: 20px;
  height: 40px;
  &:hover{
    opacity: 0.8;
  }
`

const InfoBox = styled.div`
  .w100{
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 30px;
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

const Wallet = styled.div`
    display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
  color: #fcca00;
  padding: 0 20px;
  border-radius: 4px;
  border: 2px solid #fcca00;
  font-family: "Lato-Regular";
  width: 150px;
  margin-top: 40px;
  height: 46px;
  cursor: pointer;
  &:hover{
    opacity: 0.8;
  }
`
interface Iprops{
    checkStep:Function
}

export default function Step1(props:Iprops){

    const { checkStep } = props;
    const [fileName,setFileName] = useState('');


    const updateLogo = (e:FormEvent) =>{
        const { files } = e.target as any;
        const { name } = files[0]
        console.log(name)
        setFileName(name)
    }

    const handleNext = () =>{
        checkStep(2)
    }

    return  <Box>
        <TitleBox>Upload Contract</TitleBox>
        <label htmlFor="file-upload" className="custom-file-upload" >
            <UploadBox >
                <div className="center">
                    <div><img src={UploadImg} alt="" className="uploadImg"/></div>
                    <div>Drop a PDF contract file here</div>
                    <UploadBtn>Upload</UploadBtn>
                </div>
            </UploadBox>
        </label>
        <input id="file-upload" type="file" accept="application/pdf" onChange={(e)=>updateLogo(e)}/>
        {
            fileName &&<InfoBox>
                <div className="w100">
                    <dl>
                        <dt>
                            <img src={PDFimg} alt=""/>
                        </dt>
                        <dd>
                            <div className="name">{fileName}</div>
                        </dd>
                    </dl>
                </div>
            </InfoBox>
        }
        {
            fileName &&<div>
                <Wallet onClick={()=>handleNext()}>Next</Wallet>
            </div>
        }

    </Box>
}