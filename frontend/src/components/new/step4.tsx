import styled from "styled-components";
import BgImg from "../../assets/images/bg.png";
import GroupImg from "../../assets/images/icon_group.svg";
import PDFimg from "../../assets/images/icon_pdf.svg";
import MeImg from "../../assets/images/icon_person.svg";
import Wait from "../wait";

import {CONFIG_INFO} from "../../consts";
import {useAccount} from "@gear-js/react-hooks";
import {useEffect, useState} from "react";
import {useSubstrate} from "../../api/connect";
import {useNavigate} from "react-router-dom";
import metaWasm from "../../wasm/multisig_wallet_state.meta.wasm";
import {GearApi} from "@gear-js/api";
import { getProgramMetadata } from '@gear-js/api';
import MetaTxt from "../../wasm/meta.txt";
import {  web3FromSource } from '@polkadot/extension-dapp';
import {ApiLoader} from "../loaders";

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
const TitleBox = styled.div`
    margin-bottom: 10px;
  font-family: "bold";
  font-size: 20px;
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


interface obj{
    name:string
    address:string
    decodedAddress:string
}

interface Iprops{
    list:obj[]
    fileUrl:string
    fileObj:any
}
export default function Step4(props:Iprops){
    const {state} = useSubstrate();
    const {iframeList,pdf} = state;
    const navigate = useNavigate();
    const { account } = useAccount();
    const {list,fileObj} =props;
    const [signers,setSigners]= useState<string[]>([]);
    const [show, setShow] = useState(false);

    useEffect(()=>{
        let arr:string[]=[];
        list.map((item:obj)=>{
            arr.push(item.decodedAddress);
        })
        setSigners(arr);
    },[list])

    const {NODE,programId} = CONFIG_INFO;
    // const sendMessage = useSendMessage(programId, metadata);

    const dateTime = (new Date()).valueOf() + 30 * 24 * 3600 * 1000;

    // const IPFS_URL = process.env.REACT_APP_IPFS_URL;
    const payload = {
        "createContractWithAgree": {
            "name": fileObj?.name,
            "signers":signers,
            "file": {
                "digest": {
                    "SHA256": pdf.fid
                },
                // "url": `/preview/${pdf.fid}`,
                "memo":null
            },
            "resource": {
                "digest": {
                    "SHA256": "-"
                },
                "url": "-",
                "memo": JSON.stringify(iframeList![0])
            },

            "expire": dateTime
        }
    };
    console.log(signers)
    // const payload = {
    //     "createContractWithAgree": {
    //         "name": fileObj?.name,
    //         // "signers":signers,
    //         "signers":["0xc4a4583f82475091d80f972ea0a6c7a12774cd01a0fac5ed2b57f2cffe778f7d"],
    //         "file": {
    //             "digest": {
    //                 "SHA256": "0xD85c413dA833CeBD8338138CcEFA04979DF70E8e"
    //             },
    //             "url": `/preview/0xD85c413dA833CeBD8338138CcEFA04979DF70E8e`,
    //             "memo":null
    //         },
    //         "resource": {
    //             "digest": {
    //                 "SHA256": "-"
    //             },
    //             "url": "-",
    //             "memo":"{\"left\":259,\"top\":84,\"base64\":\"aaa\",\"index\":0,\"page\":2,\"creator\":\"0xc4a4583f82475091d80f972ea0a6c7a12774cd01a0fac5ed2b57f2cffe778f7d\",\"saveAt\":1672079578673}"
    //         },
    //
    //         "expire": dateTime
    //     }
    // };

    console.log(JSON.stringify(payload))

    const reset = () =>{
        navigate(`/mine`);
    }

    const sendReply = async() =>{

        setShow(true);
        try {
            const message = {
                destination: programId, // programId
                payload,
                gasLimit: 10000000000,
                value: 0,
            };
            const metadataRead = await fetch(metaWasm)
            const gearApi = await GearApi.create({providerAddress: NODE});


        const metaTXTRead = await fetch(MetaTxt);
        const metaStr = await metaTXTRead.text();

        const metadata = getProgramMetadata(`0x${metaStr}`);

        console.error(gearApi.message)
            let extrinsic = gearApi.message.send(message, metadata);
            console.log(extrinsic,account)

        const injector = await web3FromSource(account!.meta.source);
            console.error("===injector",injector)

        await extrinsic.signAndSend(account!.address, { signer: injector.signer },(event) => {
            console.log(event.toHuman());
            setShow(false);
            setTimeout(()=>{
                    reset()
                }
                ,500)
        });

        } catch (error:any) {
            console.error(`${error.name}: ${error.message}`);
            setShow(false);
        }
    }

    return <Box>
        {
            show && <MaskBox><ApiLoader /></MaskBox>
        }
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
                            {/*<img src={CheckImg} alt=""/>*/}
                            <Wait />
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
                            {/*<img src={CheckImg} alt=""/>*/}
                            <Wait />
                        </div>
                    </FinishedBox>
                    <dl>

                        <dt>
                            <img src={item.name==='Me'?MeImg:GroupImg} alt=""/>
                        </dt>
                        <dd>
                            <div className="name">{item.name}</div>
                            <div>{item.decodedAddress}</div>
                        </dd>
                    </dl>
                </div>))
            }
        </UlBox>
        <div>
            <Wallet onClick={()=>sendReply()}>Submit</Wallet>
        </div>
    </Box>
}