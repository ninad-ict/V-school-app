import React, { useState, useEffect, useContext,useRef } from 'react'

import CTA from '../components/CTA'
import InfoCard from '../components/Cards/InfoCard'
import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Line } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../components/Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import response from '../utils/demo/tableData';
import { Card, CardBody } from '@windmill/react-ui';
import { UserContext } from '../context/UserContext';
import { BookIcon } from '../icons';
import Tiger from '../assets/img/tiger.png';
import { HeartIcon, MenuIcon } from '../icons'
import { Button } from '@windmill/react-ui';
import PartsCard from '../components/Cards/PartsCard';



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

  const [colorSubject,setcolorSubject]=useState("");

  const pageHeading=useContext(UserContext);

  const chapterRef=useRef();
  const subjectRef=useRef();
  const partRef=useRef();


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
  }, [page])

  useEffect(()=>{
console.log("Current Subject"+currSubject+"\tcurrent Chapter"+currChapter);
  },[currSubject,currChapter]);

  useEffect(()=>{
    setCurrChapter("");
    setCurrSubject("");
    setCurrPart("");
    subjectRef.current.scrollIntoView();

  },[pageHeading]);

  useEffect(()=>{

    if(currSubject)
    {
      chapterRef.current.scrollIntoView();
    }

  },[currSubject]);  
  
  useEffect(()=>{    
      subjectRef.current.scrollIntoView();
  },[currChapter]); 
  
  
  useEffect(()=>{

    if(currPart)
    {
      partRef.current.scrollIntoView();
    }

  },[currPart]);

  return (
    <>
    <div ref={subjectRef}></div>
      <PageTitle>{pageHeading.section}</PageTitle>

      {(!currChapter||!currSubject) ?  <>

      
      <CTA text='Select Subject' />

      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4 overflow-x-auto">
      {
        subjects.map((v,k)=>(
          <InfoCard color={colorSubject} title={v.subject} value={v.subject} handleClick={
            e=>{
              setCurrSubject(v.subject);
              currSubject&&chapterRef.current.focus();
              setcolorSubject((colorSubject) ? "":'bg-blue-400')
              }} >
          <RoundIcon
            icon={v.Icon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>
        ))
      }        
        </div>

<hr className='mb-4'/>

{(currSubject) ?
<>
<div ref={chapterRef}></div>
<CTA text={`Select Chapter for ${currSubject}`} />
      
<div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4" >
{chapters.map((v,k)=>(
      <Card className="mb-8 shadow-md dark:hover:bg-purple-300 hover:bg-purple-300  dark:hover:text-gray-50" onClick={()=>setCurrChapter(v.chapter)}>
        <CardBody>

       
          <div className="flex items-center">
        <RoundIcon
            icon={v.Icon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        <span className='dark:text-white'>{v.chapter}</span>
      </div>
        </CardBody>
      </Card>
      
      )) }
</div>
</>
:""}

   </> :<>
     <div className='flex flex-wrap'>
     <div className="w-full lg:w-4/12 pr-4 font-light">
     <CTA text={`Chapter-${currSubject}`} showMore='Back' handleClick={()=>{setCurrSubject("");setCurrChapter("")}} />
     </div>
     <div className="w-full lg:w-8/12 pr-4 font-light">
     <CTA text={`Subject-${currChapter}`} bgColor='bg-orange-600' showMore='Back' handleClick={()=>setCurrChapter("")} />
     </div>
     {parts.map((v,k)=>(
      <div className="w-full lg:w-2/12 sm:w-6/12 pr-4 font-light">
      <Card className="mb-8 shadow-md hover:bg-purple-100 dark:hover:bg-purple-300" onClick={()=>setCurrPart(v.part)}>
        <CardBody>

       
          <div className="flex items-center">
        <RoundIcon
            icon={v.Icon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        <span className='dark:text-white'>{v.part}</span>
      </div>
        </CardBody>
      </Card>
      </div>
     ))}
     </div>
    { (currPart) ? 
     <div className='flex flex-wrap' ref={partRef}>
    
     <div className="w-full lg:w-12/12 pr-4 font-light my-4">
       <PartsCard title='Tiger Our National Animal'>
       <p className="text-gray-600 dark:text-gray-400">
            The magnificent tiger, Panthera tigris is a striped animal. It has a thick yellow coat of fur with dark stripes. The combination of grace, strength, agility and enormous power has earned the tiger its pride of place as the national animal of India.
            </p>
       </PartsCard>
     </div>     
     
     <div className="w-full lg:w-12/12 pr-4 font-light my-4">
       <PartsCard title='Lets Catch a Glimpse of the Tiger'>
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
     
      <div className="w-full lg:w-12/12 pr-4 font-light my-4">
       <PartsCard title='Tiger In Motion!'>
       <iframe width="100%" height="600" src="https://www.youtube.com/embed/FK3dav4bA4s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
       </PartsCard>
     </div>
    
     </div>
     :""}
   </>}
    </>
  )
}

export default Home
