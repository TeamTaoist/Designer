import styled from "styled-components";
import {useState,useEffect} from "react";
import {useAccount} from "@gear-js/react-hooks";
import AddImg from "../assets/images/add.svg";
import {useSubstrate} from "../api/connect";
import {ActionType} from "../utils/types";
import FinishedImg from "../assets/images/hand.svg";
import PenImg from "../assets/images/icon_pen.svg";

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
  width: 100%;
  border: 1px solid #3198f9;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: linear-gradient(120deg,#3198f910 , #00c1ff30);
  margin-bottom: 40px;
  img{
    width: 16px;
    margin-right: 10px;
  }
`

const UlBox = styled.ul`
  li{
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
    border: 1px dashed #3198f9;
    padding: 20px;
    cursor: pointer;
    //background: linear-gradient(120deg,#3198f910 , #00c1ff30) ;
    background:#3198f910 url(${PenImg}) no-repeat 90% center;
    background-size: 60px;
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

const After = styled.ul`

  li{
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
    border: 1px dashed #ccc;
    padding: 20px;
    cursor: pointer;
    background: #eee url(${FinishedImg}) no-repeat 90% center;
    background-size: 50px;
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
interface pdfProps {
  fileUrl:string
  agreeList?:any
}
interface signObj{
  creator?:string
  saveAt?:number
  base64:string
  left:number
  page:number
  top:number
}
interface iframeObj{
  base64:string
  creator?:string
  saveAt?:number
  left:number
  page:number
  top:number
}

export default function ViewPdf(props:pdfProps){
  const {dispatch} = useSubstrate();
  const { fileUrl,agreeList } = props;
  const [sList,setSlist] = useState<signObj[]>([]);
  const [sListIframe,setSListIframe] = useState<iframeObj[]>([]);
  const [finishList,setFinishList] = useState<iframeObj[]>([]);
  // const [agreeList,setAgreeList] = useState([]);
  const { account } = useAccount();

  const handleSign = () =>{
    (document.querySelector('#iframe') as any).contentWindow.displaySignature()
  }

  useEffect(() => {
    const getResourcesInfo =  () => {
      // let newResources = [];

      // if (agreeList.resources) {
      //   for(let k = 0; k < agreeList.resources.length; k++) {
      //     const item = agreeList.resources[k]
      //     const sourceKey = item.url.slice(item.url.lastIndexOf('/') + 1)
      //     // const fileResult = await actionsApp.fleekGet(sourceKey)
      //     const signInfo = String.fromCharCode.apply(null, fileResult.data)
      //     newResources.push({
      //       ...item,
      //       ...(JSON.parse(signInfo)[0] as any)
      //     })
      //   }
      // }
      //
      // setSlist(newResources);
      // console.error(agreeList);
      (document.querySelector('#iframe') as any).contentWindow.haveSignedList = agreeList
    }
    getResourcesInfo()
  }, [agreeList])


  useEffect(() => {
    (window as any).getSignatureList = function (e:iframeObj[]) {
      let arr =[...e]
      setSListIframe(arr)
    };

    (window as any).getFinishList = function (e:iframeObj[]) {
      let arr =[...e]
      setFinishList(arr)
    }
    // const timer = setInterval(() => {
    //   (window as any).getSignatureList = function (e:iframeObj[]) {
    //     let arr =[...e]
    //     setSListIframe(arr)
    //
    //   }
    // }, 500)
    // return () => clearInterval(timer)

  }, []);



  useEffect(() => {
    const newList = sListIframe.map(item => {
      return {
        ...item,
        creator: account?.address,
        saveAt: new Date().getTime()
      }
    });
    dispatch({ type: ActionType.SET_IFRAME, payload: [...newList]});
    setSlist([...newList]);
  }, [sListIframe.length]);

  const AddresstoShow = (address:string|undefined) => {
    if (!address) return "...";
    let frontStr = address.substring(0,4);
    let afterStr = address.substring(address.length - 4, address.length);
    return `${frontStr}...${afterStr}`
  }

  const FormatDate = (dateTime:number|undefined) =>{
    if (!dateTime) return "...";
    const t = new Date(dateTime);
    const year = t.getFullYear();
    const month = t.getMonth() + 1;
    const day = t.getDate();
    return `${month}/${day}/${year}`
  }

  const handleTo = (num:number) =>{
    (document.querySelector('#iframe') as any).contentWindow.gotoPageFrom(num)
  }

  return <Box>
    <IframeBox>
      <iframe id="iframe"   src={`/pdfviewer/web/viewer.html?file=${fileUrl}`} />
    </IframeBox>
    <Rht>
      <SignBox onClick={() => {handleSign()}}>
        <img src={AddImg} alt=""/>
        <span>Add My Signatures</span></SignBox>
      <After>
        {
          agreeList.map((item:iframeObj,index:number)=>(  <li key={index} onClick={()=>handleTo(item.page)}>
            <div className="tit"><span>Page</span> {item.page}</div>
            <div className="addr">{AddresstoShow(item?.creator)}</div>
            <div className="time">{FormatDate(item.saveAt)}</div>
            <div className="time">{item.base64}</div>
          </li>))
        }
      </After>
        <UlBox>
        {
          sList.map((item,index)=>(  <li key={index} onClick={()=>handleTo(item.page)}>
            <div className="tit"><span>Page</span> {item.page}</div>
            <div className="addr">{AddresstoShow(item?.creator)}</div>
            <div className="time">{FormatDate(item.saveAt)}</div>
            <div className="time">{item.base64}</div>
          </li>))
        }

      </UlBox>
    </Rht>
  </Box>
}