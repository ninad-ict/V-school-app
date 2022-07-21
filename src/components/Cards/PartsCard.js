import React,{Children, useState} from 'react';
import { Card, CardBody } from '@windmill/react-ui';
import { MenuIcon } from '../../icons';
import { Avatar, Badge, Input, Dropdown, DropdownItem, WindmillContext,Button } from '@windmill/react-ui'
import ReactAudioPlayer from 'react-audio-player';
import { HeartIcon,ZoomIn,ZoomOut,SoundOn,SoundOff } from '../../icons';

import { useSpeechSynthesis } from "react-speech-kit";

import BloomImage from "../../assets/img/BloomBox.png";
import McqCardImage from "../../assets/img/TestCard.png";
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import QuizLottie from "../../assets/lottie/StartQuiz.json"




// import DoorDashFavorite from '../Typography/DoorDashFavorite';

function PartsCard(props) {

  const {title,children,type,index,cardColor,texttoSpeech,listenActivePart,border} = {...props};
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);

  const [value, setValue] = React.useState("");

  // if (!props.children)
  // return;

  // function getTextBorder(cardColor)
  // {
  //   switch(cardColor):
  // }



  console.log("voices");
  // console.log(voices[55]);

  // const englishMalevoice=voices[0];
  // const hindiFemalevoice=voices[21];
  // const hindiGoogleFemalevoice=voices && voices[55];

  const [textSound,setTextSound]=useState(false);

  const colors = ['#CCE5FE', '#e3b3b8', '#FFF3CE', '#D4EDDA'];
  let colorIndex = 0;

  function getMarkdownText(text) {
    return { __html: text };
  }

  function CheckPart()
  {
    switch(type) {
      case 'TEXT':
        return (
          <>
          { 
            console.log("XXX"+children.replace(/<[^>]+>/g, '').replace(/&nbsp;/gi,''))
            }
            {
              (console.log(listenActivePart),console.log(index))
            }
          {setValue(children.replace(/<[^>]+>/g, '').replace(/&nbsp;/gi,''))}
          {/* {setValue(children.innerHTML)} */}
                      <Button className='text-red-600 float-right hidden' icon={(textSound && (listenActivePart==index))? SoundOn:SoundOff} layout="link" aria-label="Like"  
                        onClick={()=>{

                          texttoSpeech(value,(textSound)? "Stop":"Play");

                          
                          // speak({text:""})
                          setTextSound(!textSound);
                          // if(!textSound)
                          // {
                          //   console.log("It must SPEAK")
                          //   hindiGoogleFemalevoice && speak({ text:value,voice:hindiGoogleFemalevoice })
                          // }
                          // else
                          // {
                            
                          // }

                        }}
                        
                      />

            <p className="text-gray-600 dark:text-gray-600 text-2xl p-3 break-all" dangerouslySetInnerHTML={getMarkdownText(String(children).replaceAll('text-white',''))}
            >
{/* {setValue(this.target.innerText)} */}
          
            </p>

          </>
        );      
      case 'GIF':
      case 'IMG':
        return (

          (!String(children).includes('.gif')&&!String(children).includes('.GIF')&&!String(children).includes('.png')&&!String(children).includes('.PNG')&&!String(children).includes('.jpg')&&!String(children).includes('.JPG')&&!String(children).includes('.jpeg')&&!String(children).includes('.JPEG')&&!String(children).includes('.tiff')&&!String(children).includes('.raw'))?
          "":
          <>
          {console.log("Check IMage")}
          {console.log(children)}
          {children  && console.log(String(children).replaceAll(' ','%20'))}
          {children  &&
            <div className='flex flex-wrap'>
            <div className='w-full lg:w-12/12'>
            <img
              aria-hidden="true"
              className="object-cover w-full h-full"
              src={String(children).replaceAll(' ','%20')}
              alt="Unable to Load Image"
              style={{borderRadius: '10px'}}
            />
            </div>
            <div className='w-full lg:w-12/12 text-lg py-auto my-auto font-extrabold text-justify' dangerouslySetInnerHTML={getMarkdownText(children.description)}>
              
            </div>


            </div>
          }

          </>
        );          
      case 'VIDEO':
        return (<>
        
        {console.log(`https://www.youtube.com/embed/${String(children).replaceAll("watch?v=",'')}`)}
        <div className="video-container" style={{borderRadius: '10px'}}>
    {/* <iframe src={`https://www.youtube.com/embed/${children}?rel=0&autoplay=1`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
    <iframe src={`https://www.youtube.com/embed/${String(children).replaceAll("watch?v=",'')}`} allow="fullscreen;" frameborder="0" allowFullScreen></iframe>
    </div> </>);   
      case 'PPT':
        return (<>
        {/* {children_1=children.trim().replace(' ','%20')} */}
        {children && (console.log("It worked"),console.log(`https://view.officeapps.live.com/op/embed.aspx?src=${String(children).trim().replaceAll(' ','%20')}`))}
        {/* https://view.officeapps.live.com/op/embed.aspx?src=${linkToPPTFile}` */}
        { children && <iframe src={`https://view.officeapps.live.com/op/embed.aspx?src=${String(children).trim().replaceAll(' ','%20')}`} width="100%" height="500px" frameborder='0'/>  }      </>);    
      case 'PDF':
        return (<>
        {console.log(`${children}`)}
        <iframe src={children} width="100%" height="500px"/>        </>);     
      case 'gForm':
        return (<>
        {console.log(`https://docs.google.com/gview?url=${children}`)}
        {(children.includes('forms.gle'))? 
       <><div className='relative align-items-center'> <a href={children} target='_blank'>
        <Player
          autoplay
          loop
          src={QuizLottie}
          style={{ height: '300px', width: '300px' }}
        >
          {/* <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} /> */}
            </Player>
            </a>
            {/* <p className='text-center text-purple-800'>Its time for Quiz!</p> */}
            </div></>:
        <iframe src={children} width="100%" height="500px"/> }
               
        {/* <iframe src={`https://docs.google.com/gview?url=${children}`} width="100%" height="500px"/>         */}
        </>);      
      case 'AUDIO':
        return (<>
         {console.log(`The audio file is ${children}`)}
        <div className='flex items-center'>
        <p className="text-gray-600 dark:text-gray-400 mx-auto">
        <audio controls>
          <source src={`${children}`} type="audio/mp3"/>
          </audio>
        {/* <ReactAudioPlayer className='text-center'
  src={children}
  controls
/>      */}
        </p>
        </div>
</>);
      case 'SPECIAL_TEXT':
        return(
          <>
            <div
            className='flex flex-wrap p-4' style={{'background':'#E6F4FF'}}>
            <div className='w-full lg:w-12/12 pr-4'>
            <img
              aria-hidden="true"
              className="object-cover w-full h-full px-24"
              src={BloomImage}
              alt="tiger"
            />
            </div>
            <div className='w-full lg:w-12/12 text-lg py-auto my-auto font-extrabold' dangerouslySetInnerHTML={getMarkdownText(children)}>
              
            </div>


            </div>
          </>
        )
        case 'json':

      if(children.filePath)
          return(
            <>
                  <Player
          autoplay
          loop
          // src={`"https://vopa-bunny.b-cdn.net/media/LOTTY%20FILE/lottie_test.json_1645781109lottie_test.json"`}
          src={children.filePath.replaceAll(' ','%20')}
          style={{ height: '300px', width: '300px' }}
        >
          {/* <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} /> */}
            </Player>
            </>
          )
        case 'MCQ-Intro':
          return(
            <>
                  <div className='flex flex-wrap'>
            <div className='w-full lg:w-12/12 pr-4'>
            <img
              aria-hidden="true"
              className="object-cover w-full h-full"
              src={McqCardImage}
              
              
            />
            </div>
            </div>
   
            </>
          )    
      default:
        return `Unable to display ${type}`;
    }

  }
  // switch(param) {
  //   case 'foo':
  //     return 'bar';
  //   default:
  //     return 'foo';
  // }


  function handleNotificationsClick() {
    setIsNotificationsMenuOpen(!isNotificationsMenuOpen)
  }

  if(children)
  return (
    <Card style={{borderRadius: '10px',border:border,backgroundColor:'none',padding:'0px'}}>
    {/* <div className="relative mr-10">
<Dropdown
              align="right"
              isOpen={isNotificationsMenuOpen}
              onClose={() => setIsNotificationsMenuOpen(false)}
              
            >
              <DropdownItem tag="a" href="#" className="justify-between">
                <span>Full Screen</span>
              </DropdownItem>
              <DropdownItem tag="a" href="#" className="justify-between">
                <span>Info</span>
              </DropdownItem>
              <DropdownItem tag="a" href="#" className="justify-between" >
                <span>More...</span>
              </DropdownItem>
</Dropdown>
</div> */}
{
  console.log(cardColor)}
    <CardBody style={{
       backgroundColor: cardColor ||'none',
      //  backgroundColor: 'red',
       padding:'0px',
      
      
       
       
       
    }}>
      <p className="font-semibold text-gray-100 dark:text-gray-100" >
      <p dangerouslySetInnerHTML={getMarkdownText(title)}/>
</p>
      {/* <p className="text-gray-600 dark:text-gray-400"> */}
      <CheckPart/>
      {/* </p> */}
    </CardBody>
  </Card>
  )
  else
  return "";
}

export default PartsCard
