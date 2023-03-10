import {useEffect, useState} from "react";
import styled from "styled-components";
import Layout from "./components/layout/layout";
import { useNavigate } from "react-router-dom";
import DownImg from "./assets/images/icon_down_arrow_outline.svg";
import CheckImg from "./assets/images/icon_check.svg";
import Wait from "./components/wait";
import { CONFIG_INFO} from "./consts";
import {useAccount} from "@gear-js/react-hooks";
import ReactPaginate from 'react-paginate';
import publicJs from "./utils/publicJs";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CopyImg from "./assets/images/icon-copyWhite.svg";
import {ApiLoader} from "./components";
// import Finished from "./assets/images/icon_check_handwritten.svg";
import ContractImg from "./assets/images/icon_contract.svg";
import FontUrl from "./assets/fonts/Arabella.ttf";
import {PDFDocument, rgb} from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import download from "downloadjs";
import {GearApi, getStateMetadata} from "@gear-js/api";
import fleekStorage from "@fleekhq/fleek-storage-js";

const Box = styled.div`
    padding:20px 40px 40px;
`

const MaskBox = styled.div`
    width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: #000;
  z-index: 19;
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
    width: 100%;
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
  width: 100%;
  .addr{
    padding:10px 20px;
    opacity: 0.5;
    width: 100%;
  }
`

const RhtBox = styled.div`
    padding: 40px;
  width: 40%;
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
  justify-content: flex-start;
  align-items: center;
  .btnT,.rhtBtn{
    border: 1px solid #fcca00;
    font-family: "Lato-Light";
    cursor: pointer;
    width: 100px;
    height: 40px;
    white-space: nowrap;
    border-radius: 4px;
    text-align: center;
    line-height: 35px;
    &:hover{
      opacity: 0.8;
    }
  }
  .btnT{
    margin-right: 10px;
    background: #fcca00;
    color: #000000;
  }
  .rhtBtn{
    background:transparent;
    color: #fcca00;
  }

`
const PageLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 30px;
  a{
    text-decoration: none;
    color: #ffffff;
  }
  .page-break{
    width: 32px;
    height: 32px;
    text-align: center;
    line-height: 32px;
  }
  .page-link,.page-left,.page-right{
    width: 32px;
    height: 32px;
    border: 0;
    text-align: center;
    line-height: 32px;
    padding: 0;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    color: #fff;
    background: transparent;
  }
  .page-link{
    &:hover{
      color: #fcca00;
    }
    &:focus{
      box-shadow: none;
    }
  }


  .disabled {
    .pageL {
      color: #f2f2f2 !important;
    }
    &:hover{
        border: none;
    }
  }
  .active{
    .page-link{
      color: #fcca00;
    }
  }
`

const CopiedBtn = styled.div`
  position: relative;
  img{
    width: 24px;
  }
  span{
    position: absolute;
    top: 25px;
    left: 0;
  }
`
const FL =styled.div`
  display: flex;
  align-items: center;
  a{
    color: #ffffff;
  }
`

const NoEmpty = styled.div`
    width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`


export default function Contract(){
    const navigate = useNavigate();
    const { account } = useAccount();
    const [currentNav, setCurrrentNav] = useState<number>(0);
    const [ Nav ] = useState(['Queue','History']);
    const [ showArr,setShowArr ] = useState(new Array(6).fill(false));

    const [list,setList] = useState<any[]>([]);
    const [pageCount, setPageCount] = useState(1);
    const pageSize = 10;
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(1);
    const [show, setShow] = useState(false);

    const [ showTips,setShowTips] = useState(false);
    const [ showTips2,setShowTips2] = useState(false);
    const {NODE,metaWasm,programId,apiKey,apiSecret} = CONFIG_INFO;

    const handleClick = (i:number) => {
        setCurrrentNav(i);
        setCurrent(1)
    };

    const handleShow = (num:number) =>{
        let arr:boolean[] =new Array(6).fill(false);
        arr[num] = true;
        setShowArr(arr);
    }

    const handleView = (num:number) =>{
        navigate(`/detail/${num}`)
    }



    let arr = currentNav === 0 ? [
        {
            "Created": null
        },
        {
            "Signing": null
        }
    ]:  [
        {
            "Sealed": null
        }
    ]

    useEffect(()=>{

        const getState = async() =>{
            setShow(true);
            const metadataRead = await fetch(metaWasm)
            const gearApi = await GearApi.create({providerAddress: NODE});
            const bufferData = await metadataRead.arrayBuffer()
            const metadataState = await getStateMetadata(new Uint8Array(bufferData));
            console.log(arr)

            const state = await gearApi.programState.readUsingWasm(
                {
                    programId,
                    fn_name: 'query_contract_by_signer_and_status',
                    wasm:new Uint8Array(bufferData),
                    argument:  {
                        "pageNum": current,
                        "pageSize":pageSize,
                        "addr":account?.decodedAddress,
                        "statuses":arr
                    },
                },
                metadataState,
            );

            const map = new Map(Object.entries(JSON.parse(state as any)));
            const jsonFromMap = JSON.stringify(Object.fromEntries(map));
            const jsonFormat = JSON.parse(jsonFromMap);
            const {total,pages,pageNum,data} = jsonFormat;
            if(pageNum == current){
                setShow(false);
            }else{
                setShow(true);
            }
            setPageCount(pages);
            setTotal(total)
            setList(data)
        }
        getState()

    },[arr.length])

    const handlePageClick = (event:{ selected: number }) => {
        setCurrent((event as any).selected + 1);
    }

    const formatTime = (time:string) =>{
        // let str = time.replace(/,/g, "");
        let res =  publicJs.dateFormat(Number(time))
        return res
    }

    const handleCopy = () =>{
        setShowTips(true)
        setTimeout(()=>{
            setShowTips(false)
        },1000)
    }
    const handleCopy2 = () =>{
        setShowTips2(true)
        setTimeout(()=>{
            setShowTips2(false)
        },1000)
    }
    const handleWait = (obj:any) =>{

        let res = false;
        obj.signers.map((item:string)=>{
            res = !!obj.agreeOn[item]
        })

        return res
    }
    const showTit = (item:any) =>{
        if(currentNav){
            return'View'
        } else{
            let res =false;
            for(let key in item.agreeOn){
               if(key == account?.decodedAddress){
                   res = true;
                   break;
               }
            }
            return !res?'Sign Now':'View'
        }
    }

    const handleDownload = async(item:any) =>{
        setShow(true)
        const all = item.otherRes;

        const fontBytes = await fetch(FontUrl).then(res => res.arrayBuffer());

        console.log(item)
        let arr=[];
        for(let key in all){
            let item = all[key][0];
            if(item.cate === "SignMetadata"){
                let info = JSON.parse(item.memo);
                arr.push(info);
            }
        }

        const fid = item.file.digest.sha256;

        const myFile = await fleekStorage.get({
            apiKey:publicJs.RevertCode(apiKey)!,
            apiSecret:publicJs.RevertCode(apiSecret)!,
            key: fid,
            getOptions: [
                'data',
                'bucket',
                'key',
                'hash',
                'publicUrl'
            ],
        })

            const { publicUrl } = myFile;


        const existingPdfBytes = await fetch(publicUrl!).then(res => res.arrayBuffer());

        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        pdfDoc.registerFontkit(fontkit);

        const customFont = await pdfDoc.embedFont(fontBytes)
        const textSize = 30;
        const pages = pdfDoc.getPages();

        arr.map((itemInner)=>{
            const textWidth = customFont.widthOfTextAtSize(itemInner.base64, textSize)
            const textHeight = customFont.heightAtSize(textSize);

            const itemPage = pages[itemInner.page-1];
            const { height,width } = itemPage.getSize()


            itemPage.drawRectangle({
                x: itemInner.left * width,
                y:  height * (1- itemInner.top) ,
                width: textWidth + 20,
                height: textHeight + 20,
                color:rgb(1,1,1),
                opacity:0.9
                // borderColor: rgb(1, 0, 0),
                // borderWidth: 1.5,
            })

            itemPage.drawText(itemInner.base64, {
                x: itemInner.left * width + 10,
                y: height * (1- itemInner.top) + 10 ,
                size: textSize,
                font: customFont,
                color: rgb(0, 0, 0),
            })
        })
        setShow(false);
        const pdfBytes = await pdfDoc.save();
        download(pdfBytes, item.name, "application/pdf");

    }

    return  <div>
        {
            show && <MaskBox><ApiLoader /></MaskBox>
        }
        <Layout>
            <Box>
                <TabBox>
                    {
                        Nav.map((item,index)=><li key={`nav_${index}`} className={currentNav === index ? "active" : ""} onClick={()=>handleClick(index)}>{item}</li>)
                    }
                </TabBox>
                <UlBox>
                    {
                        !list.length && <NoEmpty><img src={ContractImg} alt=""/></NoEmpty>
                    }
                    {
                        !!list.length && list.map((item:any,index:number)=>(<li key={index}>
                            <div className="line" />
                            <dl onClick={()=>handleShow(index)}>
                                <dt>
                                    <div className="name">{item.name}</div>
                                    <div className="time">{formatTime(item.expire)}</div>
                                    <div className="status">
                                        <div>{item.status}</div>
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
                                                        <img src={CheckImg} alt=""/>

                                                    </div>
                                                    <span>Creator</span>
                                                </div>
                                                <ContentBox >
                                                    <div className="addr">{publicJs.AddresstoShow(item.creator)}</div>
                                                </ContentBox>
                                            </div>
                                        </TimeLine>
                                        <TimeLine className="brdr">
                                            <div className="liBox">
                                                <div className="tit">
                                                    <div className="icon">
                                                        {
                                                          !handleWait(item) &&<Wait />
                                                        }
                                                        {
                                                          handleWait(item) && <img src={CheckImg} alt=""/>
                                                        }

                                                    </div>
                                                    <span>Signers</span>
                                                </div>
                                                <ContentBox >
                                                    {
                                                        item.signers.map((Th:string,index:number)=>
                                                            <div key={`signers_${index}`}>{
                                                                Th!==item.creator && <div className="addr">{publicJs.AddresstoShow(Th)}</div>
                                                            }
                                                            </div>
                                                            )
                                                    }
                                                </ContentBox>
                                            </div>
                                        </TimeLine>
                                    </LftBox>
                                    <RhtBox>
                                        <div className="hashLine">
                                            <div className="top">TX Hash: </div>
                                            <FL>
                                                <div>
                                                    <a href={`https://idea.gear-tech.io/messages/${item.creatTx}?node=${NODE}`} target="_blank" rel="noreferrer">{publicJs.AddresstoShow(item.creatTx)}</a>
                                                </div>
                                                <CopyToClipboard text={item.creatTx} onCopy={handleCopy}>
                                                    <CopiedBtn>
                                                        <img src={CopyImg} alt=""/>
                                                        {
                                                            showTips &&<span>Copied!</span>
                                                        }

                                                    </CopiedBtn>
                                                </CopyToClipboard>
                                        </FL>
                                        </div>
                                        {/*<div className="hashLine">*/}
                                        {/*    <div className="top">File Hash: </div><FL><div>{publicJs.AddresstoShow(item.file.digest.SHA256)}</div><CopyToClipboard text={item.file.digest.SHA256} onCopy={handleCopy2}>*/}
                                        {/*    <CopiedBtn>*/}
                                        {/*        <img src={CopyImg} alt=""/>*/}
                                        {/*        {*/}
                                        {/*            showTips2 &&<span>Copied!</span>*/}
                                        {/*        }*/}

                                        {/*    </CopiedBtn>*/}
                                        {/*</CopyToClipboard>*/}
                                        {/*</FL>*/}
                                        {/*</div>*/}
                                        <div className="hashLine">
                                            <div className="top">Created: </div><div>{formatTime(item.createAt)}</div>
                                        </div>
                                        <LastLine>
                                            <div className="btnT" onClick={()=>handleView(item.id)}>  {showTit(item)}</div>
                                            <div className="rhtBtn" onClick={()=>handleDownload(item)}>download</div>
                                        </LastLine>

                                    </RhtBox>
                                </dd>

                            </dl>
                        </li>))
                    }
                </UlBox>
                {
                    !!list.length &&
                    <PageLine>
                        <ReactPaginate
                            previousLabel="<"
                            nextLabel=">"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-left"
                            previousLinkClassName="pageL"
                            nextClassName="page-right"
                            nextLinkClassName="pageR"
                            breakLabel="..."
                            breakClassName="page-break"
                            breakLinkClassName="page-break"
                            pageCount={pageCount}
                            marginPagesDisplayed={1}
                            pageRangeDisplayed={5}
                            onPageChange={(e) => handlePageClick(e)}
                            containerClassName="pagination"
                            activeClassName="active"
                        />
                    </PageLine>
                }
            </Box>
        </Layout>
    </div>
}