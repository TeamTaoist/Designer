import UploadImg from "../../assets/images/icon_add.svg";
import styled from "styled-components";

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
`

export default function Step1(){
    return  <Box>
        <TitleBox>Upload Contract</TitleBox>
        <label htmlFor="file-upload" className="custom-file-upload">
            <UploadBox>
                <div className="center">
                    <div><img src={UploadImg} alt="" className="uploadImg"/></div>
                    <div>Drop a PDF contract file here</div>
                    <UploadBtn>Upload</UploadBtn>
                </div>
            </UploadBox>
        </label>
        <input id="file-upload" type="file"/>

    </Box>
}