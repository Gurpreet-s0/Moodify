import EmotionDetection from "../Components/EmotionDetection";

const EmotionDetectPage = ({setexpression}) => {
  
  return (
    <div>
      <EmotionDetection setlowerexpression={setexpression} />
    </div>
  );
};

export default EmotionDetectPage;
