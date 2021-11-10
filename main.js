Webcam.set({
    width:300,
    height:200,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach(camera);
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured" src="'+data_uri+'">'
    })
}
console.log('ml5 version',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/YV6dx8nNM/model.json',modelLoaded);
function modelLoaded(){
    console.log("Model Loaded")
}
function identify_image(){
    var img=document.getElementById("captured");
    classifier.classify(img,gotResult);
}
function gotResult(error,result){
    if(error){
        console.error(error);
    }
    else{
        console.log(result);
        document.getElementById("object").innerHTML=result[0].label;
        document.getElementById("accuracy").innerHTML=result[0].confidence.toFixed(3);
    }
}