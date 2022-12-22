import styled from "styled-components";
import ViewPdf from "./components/ViewPdf";
import Layout from "./components/layout/layout";
import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import pdfdemo from "./assets/Introduction.pdf";
import {useReadState} from "@gear-js/react-hooks";
import {ADDRESS} from "./consts";
import {Hex} from "@gear-js/api";
import {ApiLoader} from "./components";


const MaskBox = styled.div`
    width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: #000;
  z-index: 99999;
`

const Box = styled.div`
  height: 100vh;
  padding: 40px;
`
export default function Detail(){
    const [show, setShow] = useState(true);
    const [agreeList,setAgreeList] = useState<any[]>([]);
    const { id} = useParams();
    const payload ={
        "QueryContractById":id
    }
    const {metadata} = ADDRESS;
    const programId = process.env.REACT_APP_PROGRAM_ID as Hex;
    const stateAll = useReadState(programId, metadata, payload);


    useEffect(()=>{
        if(!stateAll.state)return;
        setShow(false);

        console.log((stateAll as any).state.Contract)
        const str = JSON.parse((stateAll as any).state!.Contract.file.memo)
        setAgreeList([str])

    },[stateAll.state])

     const [ fileUrl,setFileUrl] = useState('');



    return <div>
        {
            show && <MaskBox><ApiLoader /></MaskBox>
        }
        <Layout>
            <Box>
                {/*<ViewPdf fileUrl={fileUrl}/>*/}
                <ViewPdf fileUrl={pdfdemo} agreeList={agreeList}/>
            </Box>
        </Layout>
    </div>
}
