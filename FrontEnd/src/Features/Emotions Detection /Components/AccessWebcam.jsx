import React, { useEffect} from "react";

const AccessWebcam = ({videoRef}) => {
  
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({
        video:true
    })
    .then((stream)=>{
        videoRef.current.srcObject = stream
    })

  }, []);

  return <video autoPlay  playsInline width={600} ref={videoRef}></video>;
};

export default AccessWebcam;
