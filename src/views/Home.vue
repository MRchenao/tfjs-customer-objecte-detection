<template>
    <div class="home">
        <h1>TensorFlow.js Objecsdfast Detection</h1>
        <select id='base_model'>
            <option value="lite_mobilenet_v2">SSD Lite Mobilenet V2</option>
            <option value="mobilenet_v1">SSD Mobilenet v1</option>
            <option value="mobilenet_v2">SSD Mobilenet v2</option>
        </select>
        <button type="button" id="run">Run</button>
        <button type="button" id="toggle">Toggle Image</button>
        <div>
            <img id="image" />
            <canvas id="canvas" width="600" height="399"></canvas>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import * as tf from '@tensorflow/tfjs';
    import imageURL from '../assets/djs2.jpg';
    // import imageURL from '../assets/ces.png';
    import { createCanvas, Image } from "canvas";
    // import imageURL from '../assets/holo3.jpg';
    // import imageURL from '../assets/logo.png';
    // import TinyYoloV3 from 'tfjs-tiny-yolov3';
    // import SkinCancerPrediction from 'mobilenetv2skincancer';
    import * as cocoSsd from '@tensorflow-models/coco-ssd';
    import objectDetector from '@cloud-annotations/object-detection'


export default{
        name:'home',
        methods:{

        },
        async mounted() {

            // const MODEL_URL = `http://localhost:8080/ssdlite/model.json`;
            // const model = await tf.loadGraphModel(MODEL_URL);
            // const model =await tf.loadGraphModel('http://localhost:8080/ssdlite/model.json');
            // console.log(model.summary());
            // const model = new TinyYoloV3();
            // await model.load('http://localhost:8080/yolov3/model.json');
            // const model = await cocoSsd.load({base:'lite_mobilenet_v2',modelUrl:'http://localhost:8080/ssdlite/model.json'});
            // const model = await cocoSsd.load({base:'lite_mobilenet_v2',modelUrl:'http://localhost:8080/ssdlite/model.json'});
           // const model = await objectDetector.load('http://localhost:8080/ssdlite')
           const model = await objectDetector.load('http://localhost:8080/ssdlitesmallest')
           this.$nextTick(() => {
                const image = document.getElementById('image');
                image.src = imageURL;
                image.onload = () => {
                    const predictions = model.detect(image);
                    console.log(predictions)
                    var canvas = document.getElementById("canvas");
                    var context = canvas.getContext('2d');
                    canvas.setAttribute("width",image.width);
                    canvas.setAttribute("height",image.height);
                    //  绘制图片
                    context.drawImage(image,0,0,image.width,image.height);
                    context.strokeStyle = "red";
                    context.lineWidth = 3;
                    
                    predictions.then(data=>{
                        for (let i = 0; i < data.length; i++){
                            context.strokeRect(data[i]['bbox'][0], data[i]['bbox'][1], data[i]['bbox'][2], data[i]['bbox'][3])
                        }
                    });
                    
                    // const canvas = createCanvas(image.width, image.height);
                    // const ctx = canvas.getContext("2d");
                    // ctx.drawImage(image, 0, 0);
                    // const image_tensor = tf.expandDims(tf.browser.fromPixels(canvas));
                    // const predict = model.executeAsync({ image_tensor });
                    // console.log(predict.then(predictions => {
                    //     console.log('Predictions: ', predictions);
                    // }));
/*                    const canvas = document.createElement('canvas')
                    canvas.width = 300
                    canvas.height = 300
                    const ctx = canvas.getContext('2d')
                    ctx.drawImage(image, 0, 0, 300, 300)

                    let imageTensor = tf.browser.fromPixels(canvas, 3)
                    imageTensor = imageTensor.expandDims(0).toFloat().div(tf.scalar(255))
                    imageTensor = imageTensor.reverse(2)*/
                    //  console.log(eTensor);
                    //  const prediction = model.predict(eTensor);
                    // const prediction = model.predict(example);
                    // console.log(prediction);
                    // const result = model.executeAsync(imageTensor)
                    // const boxes = model.detectAndBox(image);
                }
                image.onerror = (e) => {
                    console.log(e)
                }
            })

        }
}

</script>
