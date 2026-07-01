import { useEffect, useRef, useState } from "react";
import init, { detect } from "../Utils/utils";

export default function FaceExpression() {
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

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
      }}
    >
      <video
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

      <h2>{expression}</h2>

      <button onClick={()=>{
        detect({videoRef,landmarkerRef,setExpression})
      }}>Detect Expression</button>
    </div>
  );
}
