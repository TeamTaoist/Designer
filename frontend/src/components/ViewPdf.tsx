import styled from "styled-components";
import demo from "../assets/123.pdf"

const Box = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
`

const IframeBox = styled.div`
flex-grow: 1;
  iframe{
    width: 100%;
    height: 100vh;
    border: 0;
  }
`
const Rht = styled.div`
  width: 300px;
  color: #000000;
  background: #f1f2f7;
  box-sizing: border-box;
  padding: 40px;
`

const SignBox = styled.div`
  border-radius: 4px;
  height: 54px;
  width: 180px;
  border: 1px dashed #3198f9;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: linear-gradient(120deg,#3198f910 , #00c1ff30);
`

const UlBox = styled.ul`
  li{
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
    border: 1px dashed #3198f9;
    padding: 20px;
    cursor: pointer;
    background: linear-gradient(120deg,#3198f910 , #00c1ff30);
    margin-bottom: 20px;
  }
  .tit{
    font-size: 18px;
    font-family: "bold";
  }
  .addr{
    font-size: 14px;
  }
  .time{
    opacity: 0.5;
    padding-top: 10px;
    font-size: 12px;
  }
`


export default function ViewPdf(){

  const handleSign = () =>{
    (document.querySelector('#iframe') as any).contentWindow.showSignature()
  }

  return <Box>
    <IframeBox>
      <iframe id="iframe"   src={`/pdfviewer/web/viewer.html?file=${demo}`} />
    </IframeBox>
    <Rht>
      {/*<SignBox onClick={() => {handleSign()}}>Add My Signatures</SignBox>*/}


      {/*<div*/}
      {/*     onClick={() => {*/}

      {/*       (document.querySelector('#iframe') as any).contentWindow.gotoPageFrom(2)*/}
      {/*     }}*/}
      {/*>*/}
      {/*  list*/}
      {/*</div>*/}
      <UlBox>
        {
          [...Array(3)].map((item,index)=>(  <li key={index}>
            <div className="tit">AccountName</div>
            <div className="addr">5GWY...mdnpj</div>
            <div className="time">12/16/2022</div>
          </li>))
        }

      </UlBox>
    </Rht>
  </Box>
}