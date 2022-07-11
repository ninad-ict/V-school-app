import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui';
import React, { useEffect, useState } from 'react';
import { Button } from '@windmill/react-ui';

import {getMCQForPart} from "../dataFromServer";
import PageTitle from '../components/Typography/PageTitle';
import SectionTitle from '../components/Typography/SectionTitle';
import ThemedSuspense from '../components/ThemedSuspense';
import { fa } from 'faker/lib/locales';
import { Card, CardBody } from '@windmill/react-ui'


export default function McqTest(props) {

    

    const {start}=props;

    // const [isModalOpen, setIsModalOpen] = useState(false);
    const {isModalOpen, setIsModalOpen,part} = props;
    const [mcqDetails,setMcqDetails]=useState("");
    const [currQuestion,setCurrQuestion]=useState(-1);

    const [activeAnswer,setActiveAnswer]=useState({});
    const [testSubmitted,setTestSubmitted]=useState({
        status:false,
        correctAnswer:0,
        totalScore:0,
        maximumScore:0,
        time:0,
        maximumTime:0
    });

    const [loading,setLoading]=useState(true);
    const [timeTaken,setTimeTaken]=useState(0);

    console.log("partCheck");
    console.log(part);

    function openModal() {
        setIsModalOpen(true)
      }
    
      function closeModal(e) {
        // e.preventDefault();
     
        setIsModalOpen(false)
      }

      function handleCross(e)
      {console.log("eee");
        console.log(e);

        e.preventDefault();
        closeModal();

      }

    //   const closeModal = (event, reason) => {
    //     console.log("reason");
    //     console.log(reason);
    //     if (reason && reason == "backdropClick") 
    //         return;
    //         setIsModalOpen(false)
    // }

      useEffect(()=>{
        console.log("Reached MCQ");


        getMCQForPart(part).then(d=>
            {
            console.log(d);
            setMcqDetails(d);
            setLoading(false);
            }
            );
      },[]);

      useEffect(()=>{
        console.log(currQuestion);
        console.log(testSubmitted);
        // setActiveAnswer(-1);
      },[currQuestion]);      
      
      useEffect(()=>{
        console.log(activeAnswer);
        // setActiveAnswer(-1);
      },[activeAnswer]);

      useEffect(()=>{
        console.log("time->");
        console.log(timeTaken);
        setTestSubmitted({...testSubmitted,time:timeTaken});
      },[timeTaken]);


      useEffect(()=>{
        console.log("testSubmitted");
        console.log(testSubmitted);
      },[testSubmitted]);
    

    // const []

    function handleSubmitMcq()
    {

        // setTestSubmitted({...testSubmitted,status:true});
        let rightAnswer=0;
        let totalScore=0;
        let maximumScore=0;
        let maximumTime=0;



        // Object.keys(activeAnswer).forEach(function(key) {
        //     // arr.push(json[key]);

        //     if (activeAnswer[key]+1==mcqDetails.result.questions[key].correctAnswer)
        //     {
        //         rightAnswer++;
        //         totalScore +=Number(mcqDetails.result.questions[key].point);

        //     }
        //     maximumScore+=Number(mcqDetails.result.questions[key].point);
        //     maximumTime+=Number(mcqDetails.result.questions[key].time);

        //     console.log(maximumScore);

        //   });

          mcqDetails.result.questions.map((v,k)=>{
            console.log("ValuesAnswers");
            console.log(v);
            console.log(k);
            console.log(activeAnswer[k]);
            console.log(activeAnswer[k]+1);
            console.log(v.correctAnswer);

            if (activeAnswer[k]+1==v.correctAnswer)
            {
                rightAnswer+=1;
                totalScore +=Number(v.point);

                console.log("AnswerIsRight");
                console.log(rightAnswer);

            }

            maximumScore+=Number(v.point);
            maximumTime+=Number(v.time);

            console.log(maximumScore);


          })

           setTimeTaken(Math.round((new Date()-timeTaken)/1000));

        setTestSubmitted({...testSubmitted,
          status:true,
          correctAnswer:rightAnswer,
          totalScore:totalScore,
          maximumScore:maximumScore,
          maximumTime:maximumTime,
        });
        setCurrQuestion(currQuestion+1);
        console.log("testSubmit Data Updated");
        console.log(testSubmitted);
    }

    return(

<>
{loading && 

    <Modal isOpen={isModalOpen} onClose={closeModal} >
       <div className='text-center my-auto'><p>Loading...</p></div>
      </Modal>}


{mcqDetails &&
        <Modal isOpen={isModalOpen} 
        data-backdrop="false"
         onClose={
           (e)=> handleCross(e)
          }
          shouldCloseOnOverlayClick={true}
         >
        <ModalHeader ><div className='text-center'><p>Test-{mcqDetails.result.quizTitle} {(testSubmitted.status)?"(Results)":""}</p></div></ModalHeader>
        <ModalBody>
        {currQuestion==-1?
            <><p className='text-center'>(Total Marks:{mcqDetails.id[0].max_marks})</p>
        <p className='text-center mt-2'>{mcqDetails.result.quizSynopsis}</p>
        </>:(!testSubmitted.status || currQuestion<mcqDetails.result.questions.length) ?
        <>
            <p className='mb-4'><span className='font-extrabold'>Q. {currQuestion+1}. </span>
            {mcqDetails.result.questions[currQuestion].question} 
            <span className='float-right'>({currQuestion+1}/{mcqDetails.result.questions.length}) </span> </p>
           
            {mcqDetails.result.questions[currQuestion].answers.map((v,k)=>(
                <Card key={k} className={`
                mb-4 shadow-lg bg-grey-40  
                ${
                    (!testSubmitted.status)? 'hover:bg-purple-200':
                    (k+1==mcqDetails.result.questions[currQuestion].correctAnswer)? "bg-green-400 dark:bg-green-400 dark:text-white":""
                }  
                border 
                ${(activeAnswer[currQuestion]==k)? 
                (!testSubmitted.status)?
                "bg-purple-400 dark:bg-purple-400 dark:text-white"
                :
                (activeAnswer[currQuestion]+1==mcqDetails.result.questions[currQuestion].correctAnswer)?
                "bg-green-400 dark:bg-green-400 dark:text-white":"bg-red-400 dark:bg-red-400 dark:text-white"
                :
                ""
                }
                `}
                onClick={()=> !testSubmitted.status && setActiveAnswer({...activeAnswer,[currQuestion]:k})}>
                <CardBody>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {k+1}. {v}
                </p>
                </CardBody>
            </Card>

            ))}

            {
                testSubmitted.status && 
                <><hr/> 
            {(activeAnswer[currQuestion]+1==mcqDetails.result.questions[currQuestion].correctAnswer)?
                <div className='mt-1 border-2 border-green-400 bg-green-100 rounded p-2' >
                Right Answer :{mcqDetails.result.questions[currQuestion].messageForCorrectAnswer}</div>:
                <div className='mt-1 border-2 border-red-400 bg-red-100 rounded p-2' >
                Wrong Answer: {mcqDetails.result.questions[currQuestion].messageForIncorrectAnswer}
                </div>}
            </>}
           
        </> :
        <>
            <div className='p-2'>
            <p className='pl-1 font-bold'>Results:</p>
            <div className='flex flex-wrap '>
            <div className="w-full lg:w-6/12 p-1">
            <Card className={`mb-4 shadow-lg bg-grey-40 border`}
                >
                <CardBody>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className='font-bold'>Correct Answer :</span> {testSubmitted.correctAnswer} / {mcqDetails.result.questions.length}
                </p>
                </CardBody>
            </Card>

            </div>        
            {/* <div className="w-full lg:w-6/12  p-1">
            <Card className={`mb-4 shadow-lg bg-grey-40 border`}
                >
                <CardBody>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className='font-bold'> Wrong Answer :</span>  
                </p>
                </CardBody>
            </Card>

            </div>     */}
                <div className="w-full lg:w-6/12  p-1">
            <Card className={`mb-4 shadow-lg bg-grey-40 border`}
                >
                <CardBody>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className='font-bold'> Total Score : </span> {testSubmitted.totalScore} / {testSubmitted.maximumScore}
                </p>
                </CardBody>
            </Card>

            </div>
            
            <div className="w-full lg:w-12/12 p-1">
            <Card className={`mb-4 shadow-lg bg-grey-40 border`}
                >
                <CardBody>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className='font-bold'>  Time Taken / Total Time : </span>  {timeTaken} Seconds / {testSubmitted.maximumTime} Seconds
                </p>
                </CardBody>
            </Card>

            </div>
      </div>

            </div>
        </>
        }
        </ModalBody>
        <ModalFooter>
          {/* I don't like this approach. Consider passing a prop to ModalFooter
           * that if present, would duplicate the buttons in a way similar to this.
           * Or, maybe find some way to pass something like size="large md:regular"
           * to Button
           */}
         { (!testSubmitted.status || currQuestion!=0) && 
         <div className="sm:block">
            <Button layout="outline" 
            onClick={()=>{(testSubmitted.status&&currQuestion==mcqDetails.result.questions.length)?closeModal():(currQuestion>-1)? setCurrQuestion(currQuestion-1):closeModal()}}>
            {(testSubmitted.status&&currQuestion==mcqDetails.result.questions.length)?"Close Test":(currQuestion==-1)? 'Cancel':'Previous'}
            </Button>
          </div>
          }

         {
             <div className="sm:block">
            <Button onClick={()=>{
                (testSubmitted.status)
                ? 
                  setCurrQuestion(currQuestion>=mcqDetails.result.questions.length? 0:currQuestion+1)
                :
                  (
                  (currQuestion+1<mcqDetails.result.questions.length)
                  ?
                    (
                    (currQuestion==-1)
                    ?
                      (()=>{setTimeTaken(new Date());setCurrQuestion(currQuestion+1)})()
                    :
                      setCurrQuestion(currQuestion+1)
                    )
                  :
                    handleSubmitMcq()
                  )
                
                }}>
            {
              (testSubmitted.status&&currQuestion==mcqDetails.result.questions.length)?"Verify Answers":
              (currQuestion==-1)? 'Start Test':
               (!testSubmitted.status&&currQuestion+1==mcqDetails.result.questions.length)?"Submit":'Next'
            }
            </Button>
          </div>
          }
{/* 
          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeModal}>
            Cancel
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large">
              Accept
            </Button>
          </div> */}
        </ModalFooter>
      </Modal>

}

</>

    )
}