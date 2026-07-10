import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

  
export default async function init({videoRef,landmarkerRef,stream}) {
    
    try {
      // Load MediaPipe
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm",
      );

      landmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
        },
        runningMode: "VIDEO",
        outputFaceBlendshapes: true,
        numFaces: 1,
      });

      // Start Camera
      stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      videoRef.current.srcObject = stream;

      // Wait until video is ready
      videoRef.current.onloadeddata = () => {
        detect({videoRef,landmarkerRef});
      };
    } catch (err) {
      console.error(err);
    }
  }

 export  function detect({videoRef,landmarkerRef,setExpression}) {
    if (!videoRef.current || !landmarkerRef.current) {
      return;
    }

    const results = landmarkerRef.current.detectForVideo(
      videoRef.current,
      performance.now(),
    );

    if (results.faceBlendshapes?.length) {
      const blendshapes = results.faceBlendshapes[0].categories;

      const getScore = (name) =>
        blendshapes.find((b) => b.categoryName === name)?.score || 0;

      const smileLeft = getScore("mouthSmileLeft");
      const smileRight = getScore("mouthSmileRight");
      const jawOpen = getScore("jawOpen");
      const browUp = getScore("browInnerUp");
      const frownLeft = getScore("mouthFrownLeft");
      const frownRight = getScore("mouthFrownRight");

      let currentExpression = "😐 Neutral";

      if (smileLeft > 0.5 && smileRight > 0.5) {
        currentExpression = "happy";
      } else if (jawOpen > 0.3 && browUp > 0.4) {
        currentExpression = "surprised";
      } else if (frownLeft > 0.005 && frownRight > 0.005) {
        currentExpression = "sad";
      }

      setExpression(currentExpression);
      return currentExpression
    }
  }
