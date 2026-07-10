import { useEffect, useRef, useState } from "react";
import init, { detect } from "../Utils/utils";

export default function FaceExpression({setlowerexpression}) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const animationRef = useRef(null);
  const stream = useRef(null)
  const [expression, setExpression] = useState("Detecting ....");

  useEffect(() => {
    init({videoRef,landmarkerRef});

    return () => {
      cancelAnimationFrame(animationRef.current);

      landmarkerRef.current?.close();

      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  function detectHandler(){

      const expression =  detect({videoRef,landmarkerRef,setExpression})
     setlowerexpression(expression)
      
  }

  return (
    <div
    className="flex flex-col justify-center items-center"
      style={{
        textAlign: "center",
        padding: "20px",
      }}
    >
      <video
      className=""
        ref={videoRef}
        autoPlay
        muted
        playsInline
        width={500}
        style={{
          borderRadius: "12px",
          border: "2px solid #ccc",
        }}
      />

      <h2 className="text-3xl mt-5 ">{expression}</h2>

      <button className="text-3xl mt-5 border rounded-2xl px-8 py-4" onClick={detectHandler}>Detect Expression</button>
    </div>
  );
}
