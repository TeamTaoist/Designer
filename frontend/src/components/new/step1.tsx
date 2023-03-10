import UploadImg from "../../assets/images/icon_add.svg";
import styled from "styled-components";
import {FormEvent, useState} from "react";
import PDFimg from "../../assets/images/icon_pdf.svg";
import BgImg from "../../assets/images/bg.png";
import {useSubstrate} from "../../api/connect";
import {ActionType} from "../../utils/types";
import { stringToU8a,stringToHex } from '@polkadot/util';
import { decodeAddress, encodeAddress } from "@polkadot/util-crypto"
import { web3FromSource} from '@polkadot/extension-dapp';
import {useAccount} from "@gear-js/react-hooks";
// import {Auth, Upload} from "../../api/apiHttp";
import fleekStorage from '@fleekhq/fleek-storage-js';
import  * as uuid  from 'uuid';
import {ApiLoader} from "../loaders";
import {CONFIG_INFO} from "../../consts";
import publicJs from "../../utils/publicJs";

const Box = styled.div`
  padding-top: 20px;
  input[type="file"] {
    display: none;
  }
  .custom-file-upload{
    width: 100%;
  }
`
const UploadBox = styled.div`
  //border: 4px solid #fcca00;
  border: 1px dashed #fcca00;
  border-radius: 4px;
  padding:50px 20px;
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
  //margin-top: 20px;
  height: 46px;
  cursor: pointer;
  &:hover{
    opacity: 0.8;
  }
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

interface Iprops{
    checkStep:Function
    handleUrl:Function
}
export default function Step1(props:Iprops){
    const {dispatch} = useSubstrate();
    const { checkStep,handleUrl } = props;
    const [fileName,setFileName] = useState('');
    const [file,setFile] = useState();
    const { account } = useAccount();
    const [show, setShow] = useState(false);

    const {apiKey,apiSecret} = CONFIG_INFO;

    const updateLogo = (e:FormEvent) =>{
        const { files } = e.target as any;
        const { name } = files[0]
        let url = window.URL.createObjectURL(files[0]);
        setFileName(name);
        handleUrl(url,files[0]);
        setFile(files[0]);
    }


    // const auth = async() =>{
    //     let accountFormat = encodeAddress(decodeAddress(account?.address), 11330)
    //     console.log(account)
    //     let message = "hello"
    //     const messageU8a = stringToU8a(message);
    //     console.log(messageU8a)
    //     const {meta} = account!;
    //     // const {signer} = await web3FromSource(meta.source);
    //     const injector = await web3FromSource(meta.source);
    //     const signRaw = injector?.signer?.signRaw;
    //
    //     if (!signRaw && !account?.address)return;
    //     // const { signature } = await (signRaw as any)({
    //     //     address: account?.address,
    //     //     data: stringToHex(message),
    //     //     type: 'bytes'
    //     // });
    //     // let signatureArr = stringToU8a(signature)
    //
    //     let obj = {
    //         "account": accountFormat,
    //         "message": "",
    //         "signature": []
    //     }
    //     let res = await Auth(obj);
    //     localStorage.setItem("token",res.token);
    //     console.log(res.token)
    // }

    // const upload = (fileData: File) => {
    //     const formData = new FormData();
    //     formData.append("file", fileData);
    //     return request.post("/upload", formData);
    // };


    const handleNext = async () =>{
        if(!file)return;
        setShow(true);
        const key = uuid.v4();
        console.log(key)
        try{
            // await auth();
            const uploadedFile = await fleekStorage.upload({
                apiKey:publicJs.RevertCode(apiKey)!,
                apiSecret:publicJs.RevertCode(apiSecret)!,
                key,
                data: file,
                httpUploadProgressCallback: (event) => {
                    console.log(Math.round(event.loaded/event.total*100)+ '% done');
                }
            });
             console.log("uploadedFile",uploadedFile)
            setShow(false);

            let obj ={
                    fid:uploadedFile.key,
            }
            dispatch({ type: ActionType.SET_PDF, payload:obj });
            checkStep(2)
        } catch (error:any) {
            setShow(false);
            console.error(error?.message);
        }
    }

    return  <Box>
        {
            show && <MaskBox><ApiLoader /></MaskBox>
        }
        <TitleBox>Upload Contract</TitleBox>
        <label htmlFor="file-upload" className="custom-file-upload" >
            <UploadBox >
                <div className="center">
                    <div><img src={UploadImg} alt="" className="uploadImg"/></div>
                    <div>Add a PDF contract file here</div>
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