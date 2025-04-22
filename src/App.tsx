import React, {useEffect, useState} from 'react';
// import logo from './logo.svg';
import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailBulk, faPhone } from '@fortawesome/free-solid-svg-icons';
import Slider from "react-slick";
import database from './students';
import Swal from 'sweetalert2';

function App() {

  const [loading, setLoading] = useState(false);
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [adminNumber, setAdmin] = useState("");
  const [password, setPassword] = useState("");
  const [studentInfo, setStudentInfo] = useState({image:"", name:"", admin:"", course:"", date:"", class:"",credit:""});
  const [checked, setChecked] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.screen.width);
    } 
    handleResize()
  })
  const checkCert = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if(!adminNumber){
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter certificate number!',
      })
      return
    }


    const student = database.find(({admin}) => admin === adminNumber)
    if(student){
      setChecked(true);
      setStudentInfo(() => ({...student}))
    }else
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Certificate not found!',
      })

    setLoading(false);
  }
  const downloadDocs = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingDocs(true);
    if(!password){
      setLoadingDocs(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter password!',
      })
      return
    }
    const allow = database.find(({restrict,admin}) => restrict === password && adminNumber === admin)
    console.log(allow,"password")
    if(!allow){
      setLoadingDocs(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Wrong password!',
      })
      return
    }
    ['certificates','transcripts'].map(value => {
      const link = document.createElement('a');
      link.href = `./${value}/${studentInfo?.admin}.pdf`;
      link.setAttribute('download', `./${value}/${studentInfo?.admin}.pdf`);
      document.body.appendChild(link);
      link.click();
    })

    setLoadingDocs(false);
  }
  const settings = {
    // dots: true,
    infinite: true,
    autoplaySpeed: 5,
    speed:5000,
    swipeToSlide:true,
    draggable:true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay:true,
    arrows:false,
    pauseOnHover:true,
    dots:false,
    cssEase:"ease",
    responsive: [{

        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          infinite: true
        }
   
      }, {
   
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          dots: false
        }
   
      }, {
   
        breakpoint: 300,
        settings: "unslick" as "unslick" // destroys slick
   
      }]
  };

  const slider = [
    {
      image:"./slider1.jpg"
    },
    {
      image:"./slider2.jpg"
    },
    {
      image:"./slider3.jpg"
    },
    {
      image:"./slider4.jpg"
    },
    {
      image:"./slider5.jpg"
    }
  ]

  return (
    <>
      <div className={windowWidth > 800 ? "w-[100%] h-[15%] bg-[#ffffff] flex flex-row justify-center items-center" : "w-[100%] h-[auto] bg-[#ffffff] flex flex-row flex-wrap"}>
        <img src="./Picture1.png" alt="Logo" width={200} height={200} className="w-[20%] object-contain h-[100%] m-[1%]" />
        <div className={windowWidth > 800 ? 'w-[20%] m-[1%]' : 'min-w-[48%] m-[1%]'}>
          <FontAwesomeIcon icon={faPhone} className="text-[#000000] text-[120%] m-[1%]" />
          <p>0719286680</p>
        </div>
        <div className={windowWidth > 800 ? 'w-[20%] m-[1%]' : 'min-w-[48%] m-[1%]'}>
          <FontAwesomeIcon icon={faMailBulk} className="text-[#000000] text-[120%] m-[1%]" />
          <p>ancillavtcmombasa565@gmail.com</p>
        </div>
        <div className={windowWidth > 800 ? 'w-[20%] m-[1%]' : 'min-w-[48%] m-[1%]'}>
          <p>P.O BOX 12395 – 80117 MTOPANGA – MOMBASA</p>
        </div>
      </div>
      <div className={windowWidth > 800 ? 'w-[100%] h-[80%] bg-[#000]' : 'w-[100%] h-[100%] bg-[#000]'}>
        <h1 style={{textAlign:"center",color:"#fff",fontSize:windowWidth > 800 ? "300%" : "180%",textDecoration:"underline"}}>ANCILLA VOCATIONAL TRAINING COLLEGE</h1>
      
        <div className='w-[100%] h-[60%]'>
          <Slider {...settings}>
            {
                slider.map(({image},index) => 
                (
                    <div className="w-[24%] m-[0.5%] shadow-xl" key={index}>
                        <img src={image} alt="https://late-developers.com" height={400} width={400} style={{backgroundImage:"linear-gradient(rgba(0,0,0,0.75),rgba(0,0,0,0.45),rgba(0,0,0,0.42))"}} className={windowWidth > 800 ? "h-[500px] w-[100%] shadow-xl" : "h-[300px] w-[100%] shadow-xl"}/>
                    </div>
                )
                )
            }
          </Slider>
        </div>
      </div>
      <div className={windowWidth > 800 ? 'w-[100%] h-[70%] bg-[#FDF8F2] flex flex-row' : 'w-[100%] h-[auto] bg-[#FDF8F2] flex flex-col'}>
        <img src="./avatar.png" alt="Logo" width={200} height={200} className={windowWidth > 800 ? "w-[60%] object-contain h-[100%] m-[1%]" : "w-[100%] object-contain h-[100%] m-[1%]"} />
        <div className={windowWidth > 800 ? "w-[40%] h-[100%] m-[1%]" : "w-[98%] h-[100%] m-[1%]"}>
          <article className="w-[100%] h-[30%] card shadow-md my-[2%]" style={{textAlign:"center",fontSize:"150%"}}>
            “You are most welcome, child of God. May the peace of the Lord be always with you.”
          </article>
          <article className='w-[100%] h-[30%] card shadow-md my-[2%]' style={{textAlign:"center",fontSize:"150%"}}>
              <h1>VISION</h1>
              <p>To be a centre of excellence in vocational skills training for all sectors of economy</p>
          </article>
          <article className='w-[100%] h-[30%] card shadow-md my-[2%]' style={{textAlign:"center",fontSize:"150%"}}>
              <h1>MISSION</h1>
              <p>To train youth to acquire relevant skills to make them self-reliant and instil in them the fear of God</p>
          </article>
        </div>
      </div>
      <div className={windowWidth > 800 ? 'w-[100%] h-[auto%] bg-[#FDF8F2]' : 'w-[100%] h-[auto] bg-[#FDF8F2]' }>
        <h1 style={{textAlign:"center",fontSize:"180%"}}>CHECK CERTIFICATION CREDIBILITY</h1>
        <div className={windowWidth > 800 ? 'w-[100%] h-[100%] flex flex-row flex-wrap justify-center items-center' : 'w-[100%] h-[auto]'}>
          <div className={windowWidth > 800 ? 'w-[38%] h-[100%] m-[1%]':'w-[98%] h-[100%] m-[1%]'}>
          
            <form
              onSubmit={(e) => checkCert(e)}
              className="w-[80%] mx-[10%] h-[100%] flex flex-col justify-center items-center"
            >
              <p>Input certificate number below</p>
              <input 
              onChange={(e) => setAdmin(e.target.value)}
              placeholder="certificate number"
                className="w-[50%] h-[10%] border-2 border-[#000] rounded-md p-[1%] my-[2%]"
                required/>
                <button 
                type="submit"
                disabled={loading}
                className="w-[50%] h-[10%] bg-[#000] text-[#fff] rounded-md p-[1%] my-[2%]"
                >
                  {loading ? "checking..." : "check"}
                </button>

            </form>
          </div>
          <div className={windowWidth > 800 ? 'w-[58%] h-[auto] m-[1%] items-center flex flex-col justify-center':'w-[98%] h-[100%] m-[1%] items-center flex flex-col justify-center'}>
            {
              checked ? (
                <>
                <h1 className='text-[200%]'>Certificate No {adminNumber}</h1>
                <div className='w-[23%] m-[1%] h-[200px]'>
                  <img src={studentInfo?.image} alt="Logo" width={200} height={200} className="w-[100%] object-contain h-[100%] m-[1%] rounded-[50%]" />
                </div>
                <div className={windowWidth > 800 ? 'w-[100%] h-[100%] flex flex-row flex-wrap' : 'w-[100%] h-[auto] flex flex-row flex-wrap'}>
                  <div className={windowWidth > 800 ? 'w-[23%] m-[1%] border-[1px] border-[#ccc] h-[100px] text-center' : 'w-[48%] m-[1%] border-[1px] border-[#ccc] h-[auto] text-center'}>
                    <h2 className='text-[120%]'>Name</h2>
                    <p className='text-[100%]'>{studentInfo?.name}</p>
                  </div>
                  <div className={windowWidth > 800 ? 'w-[23%] m-[1%] border-[1px] border-[#ccc] h-[100px] text-center' : 'w-[48%] m-[1%] border-[1px] border-[#ccc] h-[auto] text-center'}>
                    <h2 className='text-[120%]'>Course</h2>
                    <p className='text-[100%]'>{studentInfo?.course}</p>
                  </div>
                  <div className={windowWidth > 800 ? 'w-[23%] m-[1%] border-[1px] border-[#ccc] h-[100px] text-center' : 'w-[48%] m-[1%] border-[1px] border-[#ccc] h-[auto] text-center'}>
                    <h2 className='text-[120%]'>Date</h2>
                    <p className='text-[100%]'>{studentInfo?.date}</p>
                  </div>
                  <div className={windowWidth > 800 ? 'w-[23%] m-[1%] border-[1px] border-[#ccc] h-[100px] text-center' : 'w-[48%] m-[1%] border-[1px] border-[#ccc] h-[auto] text-center'}>
                    <h2 className='text-[120%]'>Class</h2>
                    <p className='text-[100%]'>{studentInfo?.class}</p>
                  </div>
                  <div className={windowWidth > 800 ? 'w-[23%] m-[1%] border-[1px] border-[#ccc] h-[100px] text-center' : 'w-[48%] m-[1%] border-[1px] border-[#ccc] h-[auto] text-center'}>
                    <h2 className='text-[120%]'>CREDIT</h2>
                    <p className='text-[100%]'>{studentInfo?.credit}</p>
                  </div>

                </div>
                <div className={windowWidth > 800 ? 'w-[100%] h-[100%] flex flex-row flex-wrap' : 'w-[100%] h-[auto] flex flex-row flex-wrap'}>
                  {
                    <form
                      onSubmit={(e) => downloadDocs(e)}
                      className="w-[80%] mx-[10%] h-[100%] flex flex-col justify-center items-center"
                    >
                    <p>Input password to download academic documents</p>
                    <input 
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="password"
                      type="password"
                      className="w-[50%] h-[10%] border-2 border-[#000] rounded-md p-[1%] my-[2%]"
                      required/>
                      <button 
                      type="submit"
                      disabled={loadingDocs}
                      className="w-[50%] h-[10%] bg-[#000] text-[#fff] rounded-md p-[1%] my-[2%]"
                      >
                        {loadingDocs ? "downloading..." : "Download"}
                      </button>
      
                  </form>
                  }
                </div>
                </>
              ) : (
                <div className='w-[100%] h-[100%] flex flex-col justify-center items-center'>
                  <h1 className='text-[200%]'>For problems contact 
                    <p><a href="https://late-developers.com" style={{textDecoration:"underline",textShadow:"0 0 10px 10px"}}>web builder</a></p>
                  </h1>
                </div>
              )
            }
          </div>
        </div>
      </div>


    </>
  );
}

export default App;
