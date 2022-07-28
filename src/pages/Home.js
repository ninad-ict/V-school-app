import React, { useState, useEffect, useContext,useRef } from 'react'

import CTA from '../components/CTA';
import InfoCard from '../components/Cards/InfoCard';
import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Line } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../components/Typography/PageTitle';
//sds
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import response from '../utils/demo/tableData';
import { Card, CardBody } from '@windmill/react-ui';
import { UserContext } from '../context/UserContext';
import { BookIcon } from '../icons';
// import Tiger from '../assets/img/tiger.png';
import { HeartIcon,ZoomIn,ZoomOut,ChevronLeft } from '../icons'
import { Button } from '@windmill/react-ui';
import PartsCard from '../components/Cards/PartsCard';
import { NavLink, Switch,Route, BrowserRouter } from 'react-router-dom';
// import BasicTabs  from '../components/Cards/BasicTabs';

import  McqTest from  "./McqTest";

import {getStudentSubjects,getChapters,getChapterPreview,getChapterPartContentNew} from "../dataFromServer";

import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui';

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import styles from "../assets/css/Slider.module.css";

import SectionTitle from '../components/Typography/SectionTitle';

import { Player, Controls } from '@lottiefiles/react-lottie-player';
import ExamLottie from "../assets/lottie/91736-exams.json";


import { useSpeechSynthesis } from "react-speech-kit";

import {SubjectImage} from "../assets/img/VopaSideBar.png";

import ThemedSuspense from '../components/ThemedSuspense';




import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
} from '@windmill/react-ui'

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from '../utils/demo/chartsData'
import { fa } from 'faker/lib/locales';
// import McqTest from './McqTest';
// import DoorDashFavorite from '../components/Typography/DoorDashFavorite';

function Home() {


  //-------STATES-------------------------
  
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  const [currSubject,setCurrSubject]=useState("");
  const [currChapter,setCurrChapter]=useState("");
  const [currPart,setCurrPart]=useState("");

  const [allSubjects,setAllSubjects]=useState("");
  const [allChapters,setAllChapters]=useState("");
  const [chapterPreview,setChapterPreview]=useState("");
  const [contentList,setContentList]=useState("");

  const [colorSubject,setcolorSubject]=useState("");

  const [partMcq,setPartMcq]=useState();



  const userContext=useContext(UserContext);

  const chapterRef=useRef();
  const subjectRef=useRef();
  const partRef=useRef();

  const marginSize=[0,1,2,3,4,5,6,8,10,12,16,20,24,32,40,48,56,64].map(v=>{
    return "mx-"+v;
  });
  const [marginIndex,setMarginIndex]=useState(10);
  const [marginText,setmarginText]=useState(`flex flex-wrap lg:w-12/12 ${marginSize[marginIndex]}`);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [mcq,setMcq]=useState(false);
  const [startMcq,setStartMcq]=useState(false);


  const [subjectActive,setSubjectActive]=useState(0);
  const [chapterActive,setChapterActive]=useState(-1);
  const [partActive,setPartActive]=useState(0);
  const [listenActivePart,setlistenActivePart]=useState(-1);

    // -----States for Audio Support----------


  const [text, setText] = useState('I am a robot');
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(0.7);
  const [voiceIndex, setVoiceIndex] = useState(21);

  const [loading,setLoading]=useState(false);

  // const [textSound,setTextSound]=useState(false);

  // const [speechProps,setSpeechProps]=useState({
  //   text:"",
  //   pitch:1,
  //   rate:0.7,
  //   voiceIndex:55
  // });

 


    // -----States for Audio Support----------


  //-------STATES-------------------------


  //------Destructuring SpeechSyntehsis--------------

  const onEnd = () => {

setlistenActivePart(-1);


    // You could do something here after speaking has finished
  };

  const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis({
    onEnd,
  });

  //------Destructuring SpeechSyntehsis--------------

//----Handle Speech------------
  function handleSpeech(partText,state)
  {
    if(!supported)
    {
      console.log("Audio is not supported in your system");
      return;
    }

    console.log("It reached handleSpeech");
    console.log(partText);
    console.log(state);

    setText(partText);

    if(state=='Play')
    {
      if(speaking)
        cancel();
      
    voices && speak({ text:partText,voice:voices[voiceIndex] })
    console.log("Part Text");
    }
    else
    {

      cancel();

    }
    // speak({ text, voice, rate, pitch })}
  }

  useEffect(()=>{



  },[text]);
//----Handle Speech------------


  const colors = ['#CCE5FE', '#F8D7DA', '#FFF3CE', '#D4EDDA'];

  // #667380 #eb6c77 #f5d36c #78c48a
  


  let colorIndex = 0;

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }


  useEffect(()=>{

    if(chapterPreview.response)
    {
      setCurrPart(chapterPreview.response.chapter_parts[0]);
      console.log("chapterPreview.response");
      console.log(chapterPreview.response);
    }

  },[chapterPreview]);


  useEffect(()=>{

    const profile=JSON.parse(userContext.profile);

    console.log("Margin size");
    console.log(marginSize);
    

    console.log(profile);
    // console.log(profile.student_id);
    // console.log(profile.class_medium_id);

        setCurrChapter("");
    setCurrSubject("");
    setCurrPart("");
    setContentList("");
    subjectRef.current.scrollIntoView();
    setSubjectActive(0);
    setPartActive(0);


    const params=
    {
      "class_id":profile.class_id,
      "medium_id":profile.medium_id,
      "forceRefresh": true,
      "special_course": false
    }

    console.log(params);

    getStudentSubjects(params).then(d=>{
        setAllSubjects(d.response);
        console.log(d.response[0].subject_name)
      })
      .catch(e=>console.log("Error"+e));

    

   console.log(profile)


    console.log("CHanges again");

  },[userContext.profile,userContext.section]);

  useEffect(()=>{

    if(allSubjects)
    {
      setCurrSubject(allSubjects[0]);
    }

  },[allSubjects])


  function convertJSONtoArray(json)
  {
    let arr = [];
    Object.keys(json).forEach(function(key) {
      arr.push(json[key]);
    });

    return arr
  }

  function handleMcqTest()
  {
    console.log("Mcq Should open");
    setStartMcq(true);
  //  return McqTest();
  }


  // const useMountEffect = fun => useEffect(fun, []);

  // const executeScroll = () => chapterRef.current.scrollIntoView(); // run this function from an event handler or pass it to useEffect to execute scroll

  // useMountEffect(executeScroll); // Scr

  // pagination setup
  const resultsPerPage = 10
  const totalResults = response.length

  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }

  const subjects=[
    {subject:"Hindi",Icon:PeopleIcon},
    {subject:"English",Icon:PeopleIcon},
    {subject:"Science",Icon:PeopleIcon},
    {subject:"Mathematics",Icon:PeopleIcon},
    {subject:"History",Icon:PeopleIcon},
    {subject:"Geography",Icon:PeopleIcon},
    {subject:"Civics",Icon:PeopleIcon},
  // 'Hindi','English','Science','Mathematics','History','Geography','Civics'
]

const chapters=[
  {chapter:"People's Movement",Icon:BookIcon},
  {chapter:"Science of Atom",Icon:BookIcon},
  {chapter:"Budget Watch 2022",Icon:BookIcon},
  {chapter:"Histort of India",Icon:BookIcon},
  {chapter:"Trignometry",Icon:BookIcon},
  {chapter:"Geometry",Icon:BookIcon},
]


const parts=[
  {part:"Part 1",Icon:BookIcon},
  {part:"Part 2",Icon:BookIcon},
  {part:"Part 3",Icon:BookIcon},
  {part:"Part 4",Icon:BookIcon},
  {part:"Part 5",Icon:BookIcon},
  {part:"Part 6",Icon:BookIcon}

]

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage))
  }, [page]);

  useEffect(()=>{
console.log("Current Subject"+currSubject+"\tcurrent Chapter"+currChapter);
  },[currSubject,currChapter]);

  useEffect(()=>{

    // setCurrChapter("");
    // setCurrSubject("");
    // setCurrPart("");
    // setContentList("");
    // subjectRef.current.scrollIntoView();
    // setSubjectActive(0);

    console.log("User Context Changed");

  },[userContext]);

  useEffect(()=>{

    const profile=JSON.parse(userContext.profile);
    setContentList("");
    setCurrPart("");

    if(currSubject)
    {
      setLoading(true);
      setAllChapters("");
      chapterRef.current.scrollIntoView();

      const params=
      {
        subject_id: currSubject.subject_id,
        class_id: profile.class_id,
        forceRefresh: true,
      }

      console.log("Getting chapters");
      console.log(params);

      getChapters(params).then(d=>{
        console.log(d);
        setAllChapters(d.response);
        setLoading(false);
      }).catch(e=>console.log(e));     

    }

    return () => {
      // cancel the subscription
      setLoading(false);
  };

    

  },[currSubject]);  
  
  useEffect(()=>{    
      subjectRef.current.scrollIntoView();

      setContentList("");
      setCurrPart("");
      setChapterPreview("");
      setLoading(true);

      if(currChapter)
      {
        const params=
        {
          "chapter_id":currChapter.chapter_id
        }

        console.log(params);
      
        getChapterPreview(params).then(d=>{
          console.log("Chapter Preview"+d);
          console.log(d.response.chapter_parts[0].mcq);
          setMcq((d.response.chapter_parts[0].mcq.length>0? true :false))
          setChapterPreview(d);
          setLoading(false);

        }).catch(e=>console.log(e));  
      }

      return () => {
        // cancel the subscription
        setLoading(false);
    };

  },[currChapter]); 
  
  
  useEffect(()=>{

    if(currPart)
    {

      console.log("Current Part");
      console.log(currPart);

      
      setContentList("");
      setLoading(true);
      // partRef.current.scrollIntoView();

      const profile=JSON.parse(userContext.profile);


      const params=
        {
          "part_id":currPart.part_id,
          "student_id":profile.student_id
        }


        console.log("Params check");
        console.log(params);
        
      getChapterPartContentNew(params).then(d=>{console.log(d);setContentList(d);setLoading(false)});
    }

    return () => {
      // cancel the subscription
      setLoading(false);
  };

  },[currPart]);

  useEffect(()=>{


    contentList && console.log(contentList.data.response.content);

  },[contentList])


  useEffect(()=>{

    console.log(`Mrgin Index->`+marginIndex)
    console.log(marginIndex);
    setmarginText(`flex flex-wrap lg:w-12/12 ${marginSize[marginIndex]}`);
    console.log(marginSize[marginIndex]);
  },[marginIndex]);


 

  // const slideImages = [
  //   '../assets/img/tiger.png',
  //   '../assets/img/tiger.png',
  //   '../assets/img/tiger.png'
  // ];

//  function renderSwitchForSlides()
//   {
//     switch(v.type)
//     {
//                 case "TEXT":
//                 {
//                   console.log("Reacged Text");
//                   return(  
//                               <span>{v.value}</span>              
//                         )
//                 }
//                 case "IMG":case 'GIF': return v.value.filePath;
//                 case "VIDEO": return (v.value.url.split('/').pop());
//                 case "AUDIO": return v.value;
//                 case "gForm": return v.value;
//                 case "PDF": return v.value;
//     }
//   }

  return (
    <>
   {isModalOpen&& <McqTest isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} part={currPart.part_id || 0}/> } 
     {/* <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Modal header</ModalHeader>
        <ModalBody>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum et eligendi repudiandae
          voluptatem tempore!
        </ModalBody>
        <ModalFooter>
     
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button>Accept</Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large">
              Accept
            </Button>
          </div>
        </ModalFooter>
      </Modal> */}
    <div ref={subjectRef} ></div>
    
      <PageTitle> <Button icon={ChevronLeft} layout="link" aria-label="Like" 
        disabled={!currPart ? 'true':''}
        onClick={()=>{setCurrSubject(allSubjects[0]);setCurrChapter("");setSubjectActive(0);setPartActive(0)}}
      />{userContext.section}</PageTitle>

      {(!currChapter||!currSubject) ?  <>

      <div className='flex flex-wrap '>
      <div className="w-full lg:w-5/12 pr-4 border-r">
      <CTA text='Select Subject' />
      {/* <div>
        Select Subject
      </div> */}

      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-2 overflow-x-auto">
      {/* {allSubjects.response.map((v,k)=>(console.log(v)))} */}
      {console.log("f"+allSubjects)}
      {console.log("f"+subjects)}
      {
        allSubjects&&allSubjects.map((v,k)=>(console.log(v)))
      }
      {/* <BrowserRouter > */}
      {
        allSubjects && allSubjects.map((v,k)=>(

    <>
    {/* <div className="w-full lg:w-12/12 pr-4 font-light my-4 hidden">
       <PartsCard title='Lets Catch a Glimpse of the Tiger' type='text'>
       <p className="text-gray-600 dark:text-gray-400">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full"
              src={Tiger}
              alt="tiger"
            />
            </p>
       </PartsCard>
     </div>   */}
       {
     
         <InfoCard color={(subjectActive==k)? "bg-purple-400 dark:bg-purple-400":""} title={v.subject_name} value={v.subject_name} key={k} handleClick={
            e=>{
              setSubjectActive(k);
              setCurrSubject(v);
              // currSubject&&chapterRef.current.focus();
              setcolorSubject((colorSubject) ? "":'bg-blue-400')
              }} >
          <RoundIcon
            // icon={PeopleIcon}
            iconColorClass="text-purple-500 dark:text-purple-100"
            bgColorClass="bg-purple-100 dark:bg-purple-500 shadow-md from-purple-500"
            className="mr-4"
            letter={v.subject_name[0]}
            mode='subject'
          />
        </InfoCard> 
        }
     
</>
        ))
      }
   {/*   <Switch>
    <Route exact path="/app/Home/subject/:subject">
    {console.log("ROute worked")}
   </Route> 
   </Switch> */}
              {/* </BrowserRouter> */}
        
        </div>

        </div>
        {/* <div className="lg:w-1/12 border-l ml-4">
        </div> */}
        {(currSubject) ?
<>
        <div className="w-full lg:w-7/12 pl-4 ">
        <CTA text={`Select Chapter for ${currSubject.subject_name}`} />
        {/* <BrowserRouter basename="/V-school-app">
        <Switch>
   <Route path="*"> */}
   {loading && <ThemedSuspense/>}
<div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-2" >


{
  allChapters&&allChapters.map((v,k)=>(console.log(v)))
      }
{allChapters&&allChapters.map((v,k)=>(
      <Card className="mb-8 shadow-lg dark:hover:bg-purple-300 hover:bg-purple-300  dark:hover:text-gray-50" onClick={()=>setCurrChapter(v)}>
        <CardBody>

       
          <div className="flex items-center">
        <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-purple-500 dark:text-purple-100"
            bgColorClass="bg-purple-100 dark:bg-purple-500 shadow-md"
            className="mr-4"
            letter={k+1}
            mode='chapter'
          />
        <span className='dark:text-white'>{v.chapter_name}</span>
      </div>
        </CardBody>
      </Card>
      
      )) }
</div>
 {/* </Route>
 </Switch>
</BrowserRouter> */}
        </div>
        </> :""}
    
        </div>

{/* <hr className='mb-4'/> */}

{(currSubject) ?
<>
<div className='flex flex-wrap hidden'>
      <div className="w-full lg:w-6/12">
<div ref={chapterRef}></div>
<CTA text={`Select Chapters for ${currSubject.subject_name}`} />
      
<div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4" >
{
  allChapters&&allChapters.map((v,k)=>(console.log(v)))
      }
{allChapters&&allChapters.map((v,k)=>(
      <Card className="mb-8 shadow-md dark:hover:bg-purple-300 hover:bg-purple-300  dark:hover:text-gray-50" onClick={()=>setCurrChapter(v)}>
        <CardBody>

       
          <div className="flex items-center">
        <RoundIcon
            icon={ZoomIn}
            iconColorClass="text-purple-500 dark:text-purple-100"
            bgColorClass="bg-purple-100 dark:bg-purple-500"
            className="mr-4"
          />
        <span className='dark:text-white'>{v.chapter_name}</span>
      </div>
        </CardBody>
      </Card>
      
      )) }
</div>
</div></div>  
</>
:""}

   </> :<>
     <div className='flex flex-wrap relative'>
     <div className="w-full lg:w-6/12 pr-4 font-light">
     <CTA text={`Subject-${currSubject.subject_name}`} 
    //  showMore='Back' handleClick={()=>{setCurrSubject(allSubjects[0]);setCurrChapter("");setSubjectActive(0);setPartActive(0)}} 

     />
     </div>
     <div className="w-full lg:w-6/12 pr-4 font-light">
     <CTA text={`Chapter-${currChapter.chapter_name}`} bgColor='bg-purple-600' 
    //  showMore='Back' handleClick={()=>{setCurrChapter("");setPartActive(0)}} 

     />
     </div> 
      <div className="w-full lg:w-2/12 pr-4 font-light hidden">
      <Button className='text-purple-600' icon={ZoomIn} layout="link" aria-label="Like" onClick={()=>{
        
        if(marginIndex>=1)
        setMarginIndex(marginIndex-2)
        
        }} />
      <Button  className='text-purple-600' icon={ZoomOut} layout="link" aria-label="Like" onClick={()=>{
        
        if(marginIndex<=30)
        setMarginIndex(marginIndex+2)
        
        }}/>
     </div>

     <div className='flex flex-wrap w-full lg:w-12/12 pr-4'>
     {/* <div class="fixed top-0  p-2 bg-black text-white uppercase">Sticky Heading 1</div> */}


{loading && !chapterPreview && <ThemedSuspense/>}
     {chapterPreview && chapterPreview.response.chapter_parts.map((v,k)=>{
       console.log(v.part_name)
     })}
     
     
     {/* {chapterPreview && [...chapterPreview.response.chapter_parts,"Summary"].map((v,k)=>( */}
     {
      chapterPreview && [...chapterPreview.response.chapter_parts].map((v,k)=>(

       

  
      <div className=" focus:border-purple-400 w-full lg:w-2/12 sm:w-6/12 pr-4 font-light">
      {/* {(k==0)? setCurrPart(v) :""}  */}
      {console.log("Value is"+v)}
      {(console.log("Length:"),console.log(v.mcq.length))}
      {console.log(v)}
      {console.log("Iteration is "+k)}
      {console.log("Length is"+Number.parseInt(chapterPreview.response.chapter_parts.length))}
      <Card className={`mb-8 shadow-lg hover:bg-purple-100 dark:hover:bg-purple-300  ${(k==partActive) ? "bg-purple-300 dark:bg-purple-300 dark:text-black":""}`} onClick={
        ()=>{
          setCurrPart((Number.parseInt(k)==Number.parseInt(chapterPreview.response.chapter_parts.length)) ? "Summary":v);
          setPartActive(k);
          setMcq(()=>v.mcq.length>0? true:false)
          }}>
        <CardBody>

       
          <div className="flex items-center">
        <RoundIcon
            icon={BookIcon}
            iconColorClass="text-purple-500 dark:text-purple-100"
            bgColorClass="bg-purple-100 dark:bg-purple-500"
            className="mr-4"
          />
        <span className={`dark:hover:text-black ${(k==partActive) ? "dark:text-black":"dark:text-white"}`}>{(Number.parseInt(k)==Number.parseInt(chapterPreview.response.chapter_parts.length)) ? "Summary":"Part "+Number.parseInt(k+1)} </span>
      </div>
        </CardBody>
      </Card>
      </div>
     ))
     }
     </div>
     </div>
    { (currPart) ?
     <div className={'flex flex-wrap lg:w-12/12 mx-0'} style={{marginRight:`${userContext.marginIndex}%`,marginLeft:`${userContext.marginIndex}%`}} ref={partRef} >
     <hr className='mb-4 pb-2'/>

     {
      currPart && 
     /* <div className='relative w-full lg:w-12/12 bg-purple-400 text-purple-50 pl-4 py-auto  underline h-10 mb-4  rounded shadow-md'> */
   <SectionTitle>{(currPart.part_name)? currPart.part_name:"Summary"}</SectionTitle>
    
     /* </div> */
     }
     {/* <div className='w-full lg:w-12/12 bg-white py-4 pl-4 underline h-30 border-t-0 rounded shadow-md'></div> */}

    
<hr/>
     {/* {
       contentList && console.log("This is"+JSON.stringify( contentList.data.response.content))
     }    */}

     {
      contentList && console.log("D"+JSON.stringify(contentList.data.response.content))
     }

     {loading && <ThemedSuspense/>}

     {
       contentList && convertJSONtoArray(contentList.data.response.content).map((v,k)=>{
         return(
        <div className="w-full lg:w-12/12 font-light my-4" onClick={()=>setlistenActivePart(k)}>
       <PartsCard title={
         (() => {
                  switch (v.type) {
                        // case "IMG": return v.value.description;
                        case "VIDEO" && v.value: return (v.value.tag) ? v.value.tag:"    ";
                        default: return "";
                                  }
                    })()}       
 type={v.type} index={k} 
 cardColor={(()=>{

   if(v.type=='TEXT')
   {
    let presentColor=colors[colorIndex%4];
   colorIndex+=1;
   return presentColor;
   }

   if(v.type=='SPECIAL_TEXT')
   {
    return "#E6F4FF"; 
   }
 
 })()

 }

 border={

  (()=>{

if(v.type=='TEXT')
{
 switch(colorIndex%4)
 {
  case 1:
    return "2px solid #75b8fa ";  
  case 2:
    return "2px solid #eb6c77 ";  
  case 3:
    return "2px solid #f5d36c ";  
  case 0:
    return "2px solid #73f091";
  default:
    return ;
 }
}

if(v.type=='SPECIAL_TEXT')
{
 return "#E6F4FF"; 
}

if(v.type=='AUDIO')
{
 return "2px solid #7D3AF2"; 
}

})()

}

texttoSpeech={handleSpeech}
listenActivePart={listenActivePart}
 >
       {v.value && (() => {
     switch (v.type) {
                        case "TEXT":case 'SPECIAL_TEXT':  return v.value;
                        case "IMG" :case 'GIF': return (v.value.filePath ? v.value.filePath:v.value? v.value:'');
                        case "VIDEO": return (
                          v.value.url? String(v.value.url).split('/').pop() : String(v.value).split('/').pop()
                          );
                        case "AUDIO": return v.value;
                        case "gForm": {
                          return v.value
                          };
                        case "PDF":case "PPT": return v.value;
                        case 'json': return v.value;
                        {/* default: return v.value ; */}
                    }
})()}
       {/* {v.value} */}
       </PartsCard>
     </div>   
       )
       })
    
     }   
     {
      
      mcq &&
      <div className="w-full lg:w-12/12 font-light p-10" 
      // onClick={openModal} 
      onClick={()=>setIsModalOpen(true)}
      >
       
        
          <PartsCard type='MCQ-Intro' 
          border='2px solid #A015B7'>
                <Player
          autoplay
          loop
          src={ExamLottie}
          style={{ height: '300px', width: '300px' }}
        >
          {/* <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} /> */}
            </Player>
        </PartsCard>
       </div>
       }
     
     {/* {
      contentList &&   Object.keys(contentList.data.response.content).forEach(function(key) {
        let f=contentList.data.response.content[key];
        <div className="w-full lg:w-12/12 pr-4 font-light my-4">
       <PartsCard title='' type={f.type}>
       <p className="text-gray-600 dark:text-gray-400">
            The magnificent tiger, Panthera tigris is a striped animal. It has a thick yellow coat of fur with dark stripes. The combination of grace, strength, agility and enormous power has earned the tiger its pride of place as the national animal of India.
            </p>
       </PartsCard>
     </div>   
    })
     } */}

     {/* {
      contentList && contentList.data.response && contentList.data.response.content.map((v,k)=>(

        <div className="w-full lg:w-12/12 pr-4 font-light my-4">
       <PartsCard title='' type={v.type}>
       <p className="text-gray-600 dark:text-gray-400">
            The magnificent tiger, Panthera tigris is a striped animal. It has a thick yellow coat of fur with dark stripes. The combination of grace, strength, agility and enormous power has earned the tiger its pride of place as the national animal of India.
            </p>
       </PartsCard>
     </div>   

      ))
     } */}
    
     {/* <div className="w-full lg:w-12/12 pr-4 font-light my-4 hidden">
       <PartsCard title='Tiger Our National Animal'>
       <p className="text-gray-600 dark:text-gray-400">
            The magnificent tiger, Panthera tigris is a striped animal. It has a thick yellow coat of fur with dark stripes. The combination of grace, strength, agility and enormous power has earned the tiger its pride of place as the national animal of India.
            </p>
       </PartsCard>
     </div>      */}
     
     {/* <div className="w-full lg:w-12/12 pr-4 font-light my-4 hidden">
       <PartsCard title='Lets Catch a Glimpse of the Tiger' type='text'>
       <p className="text-gray-600 dark:text-gray-400">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full"
              src={Tiger}
              alt="tiger"
            />
            </p>
       </PartsCard>
     </div>   */}
     
      {/* <div className="w-full lg:w-12/12 pr-4 font-light my-4 hidden">
       <PartsCard title='Tiger In Motionss!'>
       <iframe width="100%" height="600" src="https://youtu.be/LLw0-5lmxR4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
       </PartsCard>
     </div>
     */}
     </div>
     :""}
   </>}
    </>
  )
}

export default Home
