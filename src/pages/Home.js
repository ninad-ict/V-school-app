import React, { useState, useEffect, useContext,useRef } from 'react'

import CTA from '../components/CTA';
import InfoCard from '../components/Cards/InfoCard';
import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Line } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../components/Typography/PageTitle';
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import response from '../utils/demo/tableData';
import { Card, CardBody } from '@windmill/react-ui';
import { UserContext } from '../context/UserContext';
import { BookIcon } from '../icons';
import Tiger from '../assets/img/tiger.png';
import { HeartIcon,ZoomIn,ZoomOut } from '../icons'
import { Button } from '@windmill/react-ui';
import PartsCard from '../components/Cards/PartsCard';
import { NavLink } from 'react-router-dom';
// import BasicTabs  from '../components/Cards/BasicTabs';

import {getStudentSubjects,getChapters,getChapterPreview,getChapterPartContentNew} from "../dataFromServer";

import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui';





import SectionTitle from '../components/Typography/SectionTitle'

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

function Home() {
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

  const userContext=useContext(UserContext);

  const chapterRef=useRef();
  const subjectRef=useRef();
  const partRef=useRef();

  const marginSize=[0,1,2,3,4,5,6,8,10,12,16,20,24,32,40,48,56,64].map(v=>{
    return "mx-"+v;
  });
  const [marginIndex,setMarginIndex]=useState(10);
  const [marginText,setmarginText]=useState(`flex flex-wrap lg:w-12/12 ${marginSize[marginIndex]}`);

  const [isModalOpen, setIsModalOpen] = useState(false)

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }



  useEffect(()=>{

    const profile=JSON.parse(userContext.profile);

    console.log("Margin size");
    console.log(marginSize);
    

    console.log(profile);
    // console.log(profile.student_id);
    // console.log(profile.class_medium_id);


    const params=
    {
      "class_id":profile.class_id,
      "medium_id":profile.medium_id,
      "forceRefresh": true,
      "special_course": false
    }

    console.log(params);

    getStudentSubjects(params).then(d=>{setAllSubjects(d.response);console.log(d.response[0].subject_name)}).catch(e=>console.log("Error"+e));

    

   console.log(profile)


    console.log("CHanges again");

  },[]);


  function convertJSONtoArray(json)
  {
    let arr = [];
    Object.keys(json).forEach(function(key) {
      arr.push(json[key]);
    });

    return arr
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

    setCurrChapter("");
    setCurrSubject("");
    setCurrPart("");
    setContentList("");
    subjectRef.current.scrollIntoView();

  },[userContext]);

  useEffect(()=>{

    const profile=JSON.parse(userContext.profile);
    setContentList("");
    setCurrPart("");

    if(currSubject)
    {
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
      }).catch(e=>console.log(e));     

    }

    

  },[currSubject]);  
  
  useEffect(()=>{    
      subjectRef.current.scrollIntoView();

      setContentList("");
      setCurrPart("");
  

      if(currChapter)
      {
        const params=
        {
          "chapter_id":currChapter.chapter_id
        }

        console.log(params);
      
        getChapterPreview(params).then(d=>{
          console.log("Chapter Preview"+d);
          setChapterPreview(d);
        }).catch(e=>console.log(e));  
      }



  },[currChapter]); 
  
  
  useEffect(()=>{

    if(currPart)
    {
      partRef.current.scrollIntoView();

      const profile=JSON.parse(userContext.profile);


      const params=
        {
          "part_id":currPart.part_id,
          "student_id":profile.student_id
        }

        
      getChapterPartContentNew(params).then(d=>{console.log(d);setContentList(d)});
    }

  },[currPart]);

  useEffect(()=>{


    contentList && console.log(contentList.data.response.content);

  },[contentList])


  useEffect(()=>{

    console.log(`Mrgin Index->`+marginIndex)
    console.log(marginIndex);
    setmarginText(`flex flex-wrap lg:w-12/12 ${marginSize[marginIndex]}`);
    console.log(marginSize[marginIndex]);
  },[marginIndex])

  return (
    <>
     <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalBody className='h-screen py-50'>

      
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum et eligendieligendieligendieligendieligendieligendieligendi repudiandae voluptatem tempore!Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum et eligendieligendieligendieligendieligendieligendieligendi repudiandae voluptatem tempore!Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum et eligendieligendieligendieligendieligendieligendieligendi repudiandae voluptatem tempore!Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum et eligendieligendieligendieligendieligendieligendieligendi repudiandae voluptatem tempore!
        
        
        </ModalBody>
        <ModalFooter className='hidden'>
          {/* I don't like this approach. Consider passing a prop to ModalFooter
           * that if present, would duplicate the buttons in a way similar to this.
           * Or, maybe find some way to pass something like size="large md:regular"
           * to Button
           */}
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
      </Modal>
    <div ref={subjectRef} ></div>
      <PageTitle>{userContext.section}</PageTitle>

      {(!currChapter||!currSubject) ?  <>

      <div className='flex flex-wrap '>
      <div className="w-full lg:w-6/12 pr-4 border-r">
      <CTA text='Select Subject' />

      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-2 overflow-x-auto">
      {/* {allSubjects.response.map((v,k)=>(console.log(v)))} */}
      {console.log("f"+allSubjects)}
      {console.log("f"+subjects)}
      {
        allSubjects&&allSubjects.map((v,k)=>(console.log(v)))
      }
      {
        allSubjects && allSubjects.map((v,k)=>(
      
       <InfoCard color={colorSubject} title={v.subject_name} value={v.subject_name} handleClick={
            e=>{
              setCurrSubject(v);
              // currSubject&&chapterRef.current.focus();
              setcolorSubject((colorSubject) ? "":'bg-blue-400')
              }} >
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        ))
      }        
        </div>

        </div>
        {/* <div className="lg:w-1/12 border-l ml-4">
        </div> */}
        {(currSubject) ?
<>
        <div className="w-full lg:w-6/12 pl-4 ">
        <CTA text={`Select Chapter for ${currSubject.subject_name}`} />
      
<div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-2" >
{
  allChapters&&allChapters.map((v,k)=>(console.log(v)))
      }
{allChapters&&allChapters.map((v,k)=>(
      <Card className="mb-8 shadow-lg dark:hover:bg-red-300 hover:bg-red-300  dark:hover:text-gray-50" onClick={()=>setCurrChapter(v)}>
        <CardBody>

       
          <div className="flex items-center">
        <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        <span className='dark:text-white'>{v.chapter_name}</span>
      </div>
        </CardBody>
      </Card>
      
      )) }
</div>
        </div>
        </> :""}
    
        </div>

{/* <hr className='mb-4'/> */}

{(currSubject) ?
<>
<div className='flex flex-wrap hidden'>
      <div className="w-full lg:w-6/12">
<div ref={chapterRef}></div>
<CTA text={`Select Chapter for ${currSubject.subject_name}`} />
      
<div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4" >
{
  allChapters&&allChapters.map((v,k)=>(console.log(v)))
      }
{allChapters&&allChapters.map((v,k)=>(
      <Card className="mb-8 shadow-md dark:hover:bg-red-300 hover:bg-red-300  dark:hover:text-gray-50" onClick={()=>setCurrChapter(v)}>
        <CardBody>

       
          <div className="flex items-center">
        <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
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
     <div className='flex flex-wrap'>
     <div className="w-full lg:w-4/12 pr-4 font-light">
     <CTA text={`Subject-${currSubject.subject_name}`} showMore='Back' handleClick={()=>{setCurrSubject("");setCurrChapter("")}} />
     </div>
     <div className="w-full lg:w-6/12 pr-4 font-light">
     <CTA text={`Chapter-${currChapter.chapter_name}`} bgColor='bg-orange-600' showMore='Back' handleClick={()=>setCurrChapter("")} />
     </div> 
      <div className="w-full lg:w-2/12 pr-4 font-light">
      <Button className='text-red-600' icon={ZoomIn} layout="link" aria-label="Like" onClick={()=>{
        
        if(marginIndex>=1)
        setMarginIndex(marginIndex-2)
        
        }} />
      <Button  className='text-red-600' icon={ZoomOut} layout="link" aria-label="Like" onClick={()=>{
        
        if(marginIndex<=30)
        setMarginIndex(marginIndex+2)
        
        }}/>
     </div>

     <div className='sticky top-500 flex flex-wrap w-full lg:w-12/12 pr-4'>

     {chapterPreview && chapterPreview.response.chapter_parts.map((v,k)=>{
       console.log(v.part_name)
     })}
     
     
     {/* {chapterPreview && [...chapterPreview.response.chapter_parts,"Summary"].map((v,k)=>( */}
     {chapterPreview && [...chapterPreview.response.chapter_parts].map((v,k)=>(

      <div className=" focus:border-red-400 w-full lg:w-2/12 sm:w-6/12 pr-4 font-light">
      {console.log("Value is"+v)}
      {console.log("Iteration is "+k)}
      {console.log("Length is"+Number.parseInt(chapterPreview.response.chapter_parts.length))}
      <Card className="mb-8 shadow-lg hover:bg-red-100 dark:hover:bg-red-300" onClick={()=>setCurrPart((Number.parseInt(k)==Number.parseInt(chapterPreview.response.chapter.no_of_parts)) ? "Summary":v)}>
        <CardBody>

       
          <div className="flex items-center">
        <RoundIcon
            icon={HeartIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        <span className='dark:text-white'>{(Number.parseInt(k)==Number.parseInt(chapterPreview.response.chapter_parts.length)) ? "Summary":"Part "+Number.parseInt(k+1)} </span>
      </div>
        </CardBody>
      </Card>
      </div>
     ))}
     </div>
     </div>
    { (currPart) ?
     <div className={'flex flex-wrap lg:w-12/12 mx-0'} style={{marginRight:`${marginIndex}%`,marginLeft:`${marginIndex}%`}} ref={partRef} onClick={openModal}>
     <hr className='mb-4'/>

     {currPart && <SectionTitle>{(currPart.part_name)? currPart.part_name:"Summary"}</SectionTitle>}
<hr/>
     {/* {
       contentList && console.log("This is"+JSON.stringify( contentList.data.response.content))
     }    */}

     {
      contentList && console.log("D"+JSON.stringify(contentList.data.response.content))
     }

     {
       contentList && convertJSONtoArray(contentList.data.response.content).map((v,k)=>{
         return(
        <div className="w-full lg:w-12/12 pr-4 font-light my-4 transform shadow hover:shadow-lg">
        {console.log(v)}
       <PartsCard title={
         (() => {
                  switch (v.type) {
                        case "IMG": return v.value.description;
                        case "VIDEO": return (v.value.tag) ? v.value.tag:"    ";
                        default: return "";
                                  }
                    })()}       
 type={v.type} index={k}>
       {(() => {
    switch (v.type) {
                        case "TEXT":  return v.value;
                        case "IMG":case 'GIF': return v.value.filePath;
                        case "VIDEO": return (v.value.url.split('/').pop());
                        case "AUDIO": return v.value;
                        case "gForm": return v.value;
                        case "PDF": return v.value;
                        default: return v.value;
                    }
})()}
       {/* {v.value} */}
       </PartsCard>
     </div>   
       )
       })
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
    
     <div className="w-full lg:w-12/12 pr-4 font-light my-4 hidden">
       <PartsCard title='Tiger Our National Animal'>
       <p className="text-gray-600 dark:text-gray-400">
            The magnificent tiger, Panthera tigris is a striped animal. It has a thick yellow coat of fur with dark stripes. The combination of grace, strength, agility and enormous power has earned the tiger its pride of place as the national animal of India.
            </p>
       </PartsCard>
     </div>     
     
     <div className="w-full lg:w-12/12 pr-4 font-light my-4 hidden">
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
     </div>  
     
      <div className="w-full lg:w-12/12 pr-4 font-light my-4 hidden">
       <PartsCard title='Tiger In Motionss!'>
       <iframe width="100%" height="600" src="https://youtu.be/LLw0-5lmxR4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
       </PartsCard>
     </div>
    
     </div>
     :""}
   </>}
    </>
  )
}

export default Home
