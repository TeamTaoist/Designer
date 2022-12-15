import styled from "styled-components";
import demo from "../assets/123.pdf"

const IframeBox = styled.div`
  iframe{
    width: 100%;
    height: 100vh;
  }
`

export default function ViewPdf(){
  return <div>
    <IframeBox>
      <iframe id="iframe"   src={`/pdfviewer/web/viewer.html?file=${demo}`} />
    </IframeBox>

  </div>
}