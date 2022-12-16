import styled from "styled-components";
import BgImg from "../../assets/images/bg.png";
import CloseImg from "../../assets/images/icon_close.svg";
import MeImg from "../../assets/images/icon_person.svg";
import GroupImg from "../../assets/images/icon_group.svg";
import {ChangeEvent, useEffect, useState} from "react";
import {useAccount} from "@gear-js/react-hooks";

const Box = styled.div`
  padding-top: 40px;
`

const UlBox = styled.div`
    dl{
      background: #1c1d22;
      box-shadow: 2px 0 5px rgb(0 0 0 / 20%);
      display: flex;
      align-items: center;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 4px;
      position: relative;
      &:first-child{
        .close{
          display: none;
        }
      }
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
  .close{
    position: absolute;
    right: -10px;
    top: -10px;
    width: 30px;
    height:30px;
    background: #000;
    border: 1px solid #fcca00;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    img{
      width: 15px;
    }
  }
`
const Wallet = styled.div`
    display: flex;
  justify-content: center;
  align-items: center;
  background: #fcca00;
  color: #000000;
  padding: 0 20px;
  border-radius: 4px;
  font-family: "Lato-Regular";
  width: 200px;
  margin-top: 40px;
  height: 50px;
  cursor: pointer;
  &:hover{
    opacity: 0.8;
  }
`

const NextBtn = styled.div`
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
  margin-left: 20px;
  &:hover{
    opacity: 0.8;
  }
`

const InputBox = styled.div`
    input{
      background: #000;
      border: 0;
      height: 40px;
      margin-top: 10px;
      border-radius: 4px;
      width: 250px;
      color: #ffffff;
      padding: 0 20px;
      &:focus{
        outline: none;
        box-shadow: none;
      }
    }
`

const LastLine = styled.div`
    display: flex;
  align-items: center;
`
interface Iprops{
    checkStep:Function
}
interface obj{
    name:string
    address:string
}


export default function Step2(props:Iprops){

    const { checkStep } = props;
    const [ list,setList] = useState<obj[]>([]);
    const { account } = useAccount();

    useEffect(()=>{
        if(!account) return;
        let obj ={
            name:"Me",
            address:account.address
        }
        let arr:obj[] = [];
        arr.push(obj);
        setList(arr);

    },[])

    const handleNext = () =>{
        checkStep(3)
    }
    const addNew = () =>{

        let obj ={
            name:"Adding a Participants Address",
            address:''
        }
        let arr:obj[] = [...list];
        arr.push(obj);
        setList(arr);
    }

    const handleInput = (e:ChangeEvent,num:number) =>{
        let arr:obj[] = [...list];
        const {value} = e.target as HTMLInputElement;
        arr[num].address = value;
        setList(arr);
    }
    const removeItem = (num:number)=>{
        let arr:obj[] = [...list];
        arr.splice(num,1);
        console.log(arr)
        setList(arr)
    }

    return <Box>
        <UlBox>
            {
                list.map((item,index)=>(<dl key={index}>
                    <div className="close" onClick={()=>removeItem(index)}>
                        <img src={CloseImg} alt=""/>
                    </div>
                    <dt>
                        <img src={MeImg} alt=""/>
                    </dt>
                    <dd>
                        <div className="name">{item.name}</div>
                        {
                            !index &&<div>{item.address}</div>
                        }
                        {
                            !!index && <InputBox>
                                <input type="text" placeholder="please fill the address to sign" value={list[index].address} onChange={(e)=>handleInput(e,index)}/>
                            </InputBox>
                        }

                    </dd>
                </dl>))
            }
        </UlBox>
        <LastLine>
            <Wallet onClick={()=>addNew()}>Add a signer</Wallet>
            <NextBtn onClick={()=>handleNext()}>Next</NextBtn>
        </LastLine>
    </Box>
}