import Layout from "./components/layout/layout";
import styled from "styled-components";
import StepNav from "./components/new/stepNav";
import Step1 from "./components/new/step1";
import Step2 from "./components/new/step2";
import Step3 from "./components/new/step3";
import Step4 from "./components/new/step4";
import {useState} from "react";

const Box = styled.div`
    padding:20px 40px 40px;
`


export default function New(){

    const [currentStep, setCurrentStep] = useState(1);

    const checkStep = (num:number)=>{
        setCurrentStep(num)
    }
    return <div>
        <Layout>
            <Box>
                <StepNav checkStep={checkStep} currentStep={currentStep}/>
                {
                    currentStep === 1 &&<Step1  checkStep={checkStep}/>
                }
                {
                    currentStep === 2 &&<Step2 />
                }
                {
                    currentStep === 3 &&<Step3 />
                }
                {
                    currentStep === 4 &&<Step4 />
                }

            </Box>
        </Layout>
    </div>
}