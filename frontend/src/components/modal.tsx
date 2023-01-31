import styled from "styled-components";
import CloseImg from "../assets/images/icon_closeWhite.svg";

const Mask = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  z-index: 999;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Box = styled.div`
    padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  position: relative;
  background: #1c1d22;
  box-shadow: 2px 0 5px rgb(0 0 0 / 20%);
  border-radius: 4px;
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
  width: 150px;
  margin-top: 40px;
  height: 45px;
  cursor: pointer;
  &:hover{
    opacity: 0.8;
  }
`

const NextBtn = styled.button`
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
  height: 45px;
  cursor: pointer;
  margin-left: 20px;
  &:hover{
    opacity: 0.8;
  }
  &:disabled{
    opacity: 0.5;
    cursor: not-allowed;
  }
`
const FirstLine = styled.div`
    text-align: left;
  width: 100%;
`
const LastLine = styled.div`
    display: flex;
`
const CloseBox = styled.div`
    position: absolute;
  right: 15px;
  top:10px;
  z-index: 999;
  cursor: pointer;
  img{
    width: 20px;
  }
`
interface ModalProps{
    closeModal: Function
    handleWithdraw: Function
}

export default function Modal(props:ModalProps){

    const {closeModal,handleWithdraw} = props;
    const handleClose = () =>{
        closeModal();
    }
    const handleConfirm = () =>{
        handleWithdraw();
    }

    return <Mask>
        <Box>
            <CloseBox onClick={()=>handleClose()}>
                <img src={CloseImg} alt=""/>
            </CloseBox>
            <FirstLine>Do you confirm?</FirstLine>
            <LastLine>
                <Wallet onClick={()=>handleConfirm()}>Confirm</Wallet>
                <NextBtn onClick={()=>handleClose()}>Cancel</NextBtn>
            </LastLine>
        </Box>
    </Mask>
}