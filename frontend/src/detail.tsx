import styled from "styled-components";
import ViewPdf from "./components/ViewPdf";
import Layout from "./components/layout/layout";
import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import {ADDRESS} from "./consts";
import {ApiLoader} from "./components";
import {GearApi, getStateMetadata} from "@gear-js/api";
import fleekStorage from '@fleekhq/fleek-storage-js';

const MaskBox = styled.div`
    width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: #000;
  z-index: 19;
`

const Box = styled.div`
  height: 100vh;
  padding: 40px;
  box-sizing: border-box;
`

export default function Detail(){
    const [show, setShow] = useState(true);
    const [agreeList,setAgreeList] = useState<any[]>([]);
    const [contract,setContract] = useState<any[]>([]);
    const [url,setUrl] = useState('');
    const [fid,setFid] = useState('d9060831-2355-45d6-9780-3d6e8d391146');
    const [stateAll,setStateAll] = useState<any>();

    const {id} = useParams();

    // const payload ={
    //     "QueryContractById":id
    // }

    const {NODE,metaWasm,programId,apiSecret,apiKey} = ADDRESS;

    useEffect(()=>{
        const getState = async() =>{

            setShow(true);
            const metadataRead = await fetch(metaWasm)
            const gearApi = await GearApi.create({providerAddress: NODE});
            const bufferData = await metadataRead.arrayBuffer()
            const metadataState = await getStateMetadata(new Uint8Array(bufferData));
            console.log(id)


            const state = await gearApi.programState.readUsingWasm(
                {
                    programId,
                    fn_name: 'query_all_contract_by_id',
                    wasm:new Uint8Array(bufferData),
                    argument: [id],
                },
                metadataState,
            );



            const map = new Map(Object.entries(JSON.parse(state as any)));
            const jsonFromMap = JSON.stringify(Object.fromEntries(map));
            const jsonFormat = JSON.parse(jsonFromMap);
            setStateAll(jsonFormat[0])
            console.log(jsonFormat[0])
            setShow(false);
            const fidUrl = jsonFormat[0].file.digest.sha256;
            setFid(fidUrl);
        }
        getState()

    },[])
    useEffect(()=>{
        if(!fid)return;
        const getFile = async() =>{
            const myFile = await fleekStorage.get({
                apiKey:apiKey!,
                apiSecret:apiSecret!,
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
            setUrl(publicUrl!);
        }


        getFile();

    },[fid])
    // const stateAll:any = {};
    //  stateAll.state  = {
    //     "Contract": {
    //         "id": "4",
    //         "creator": "0x7070189aebb91e842b482632acf8016110e48a0051bb2e64c1f458d34538145d",
    //         "creatTx": "0x93c2100339739f5a2465fb233107d6ab70185251b36757e93c4b8ca1a1c305e6",
    //         "name": "Hackathon-2022-winter.pdf",
    //         "createAt": "1,672,084,118,000",
    //         "expire": "1,674,676,104,132",
    //         "status": "Sealed",
    //         "signers": [
    //             "0x7070189aebb91e842b482632acf8016110e48a0051bb2e64c1f458d34538145d",
    //             "0xc4a4583f82475091d80f972ea0a6c7a12774cd01a0fac5ed2b57f2cffe778f7d"
    //         ],
    //         "agreeOn": {
    //             "0x7070189aebb91e842b482632acf8016110e48a0051bb2e64c1f458d34538145d": {
    //                 "msgId": "0x93c2100339739f5a2465fb233107d6ab70185251b36757e93c4b8ca1a1c305e6",
    //                 "createAt": "1,672,084,118,000"
    //             },
    //             "0xc4a4583f82475091d80f972ea0a6c7a12774cd01a0fac5ed2b57f2cffe778f7d": {
    //                 "msgId": "0x475c406c691e20c12de1f5c1a0dc2d91fe33a22bd0d3b9eef7b63aaf81f7da63",
    //                 "createAt": "1,672,084,215,001"
    //             }
    //         },
    //         "file": {
    //             "digest": {
    //                 "SHA256": "26181c8d481d75a930886d82bac166193eed215556656e1ca1ab7e32673d42de"
    //             },
    //             "url": ContractFile,
    //             "memo": null,
    //             "cate": "MainFile",
    //             "creator": "0x7070189aebb91e842b482632acf8016110e48a0051bb2e64c1f458d34538145d",
    //             "creatAt": "1,672,084,118,000"
    //         },
    //         "otherRes": {
    //             "0x7070189aebb91e842b482632acf8016110e48a0051bb2e64c1f458d34538145d": [
    //                 {
    //                     "digest": {
    //                         "SHA256": "-"
    //                     },
    //                     "url": "-",
    //                     "memo": "{\"left\":0.4298,\"top\":0.2502,\"base64\":\"test003\",\"index\":0,\"page\":2,\"creator\":\"0x7070189aebb91e842b482632acf8016110e48a0051bb2e64c1f458d34538145d\",\"saveAt\":1672084099695}",
    //                     "cate": "SignMetadata",
    //                     "creator": "0x7070189aebb91e842b482632acf8016110e48a0051bb2e64c1f458d34538145d",
    //                     "creatAt": "1,672,084,118,000"
    //                 }
    //             ],
    //             "0xc4a4583f82475091d80f972ea0a6c7a12774cd01a0fac5ed2b57f2cffe778f7d": [
    //                 {
    //                     "digest": {
    //                         "SHA256": "26181c8d481d75a930886d82bac166193eed215556656e1ca1ab7e32673d42de"
    //                     },
    //                     "url": "http://localhost:8080/preview/26181c8d481d75a930886d82bac166193eed215556656e1ca1ab7e32673d42de",
    //                     "memo": "{\"left\":0.4298,\"top\":0.2502,\"base64\":\"Test001\",\"index\":1,\"page\":3,\"creator\":\"0xc4a4583f82475091d80f972ea0a6c7a12774cd01a0fac5ed2b57f2cffe778f7d\",\"saveAt\":1672084195359}",
    //                     "cate": "SignMetadata",
    //                     "creator": "0xc4a4583f82475091d80f972ea0a6c7a12774cd01a0fac5ed2b57f2cffe778f7d",
    //                     "creatAt": "1,672,084,215,001"
    //                 }
    //             ]
    //         }
    //     }
    // }
    useEffect(()=>{
        if(!stateAll)return;
        setShow(false);
        let all = (stateAll as any).otherRes;

        let arr=[];
        for(let key in all){
            let item = all[key][0];
            if(item.cate === "SignMetadata"){
                const{creatAt,creator} = item;
                let info = JSON.parse(item.memo);
                // let str = creatAt.replace(/,/g, "");
                arr.push(
                    {
                        ...info,
                        saveAt:Number(creatAt),
                        creator
                    }
                )
            }
        }
        setAgreeList(arr)
        setContract((stateAll as any))
        // const {file } = (stateAll as any);
        // const {url} = file;
        // setUrl(url);
    },[stateAll,url])

    return <div>
        {
            show && <MaskBox><ApiLoader /></MaskBox>
        }
        <Layout>
            <Box>
                <ViewPdf fileUrl={url} agreeList={agreeList} showBtn={true} id={id} contract={contract} />
            </Box>

        </Layout>
    </div>
}
