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
  width: 250px;
  color: #000000;
  background: #fff;
`

export default function ViewPdf(){
  return <Box>
    <IframeBox>
      <iframe id="iframe"   src={`/pdfviewer/web/viewer.html?file=${demo}`} />
    </IframeBox>
    <Rht>
      <div
           onClick={() => {
             (document.querySelector('#iframe') as any).contentWindow.showSignature()
             // (document.querySelector('#iframe') as any).contentWindow.gotoPageFrom(2)
           }}
      >
        My Signatures
      </div>
      <div
           onClick={() => {

             (document.querySelector('#iframe') as any).contentWindow.gotoPageFrom(2)
           }}
      >
        list
      </div>
    </Rht>
  </Box>
}