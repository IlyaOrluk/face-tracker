import * as ml5 from 'ml5'
import p5 from 'p5'

// // Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
// let classifier

// A variable to hold the image we want to classify
let video
let poseNet
let pose

const init = (p) => {

  const modelReady = () => {
    console.log('Model Ready')
  }
  // A function to run when we get any errors and the results
  const gotResults = (error, results) => {
    // Display error in the console
    if (error) {
      console.error(error)
    } else {
      // The results are in an array ordered by confidence.
      console.log(results)
    }
  }

  p.preload = function() {
    console.log('preload')

  }

  p.setup = function(VIDEO) {
    console.log('setup')
    p.createCanvas(640, 600)
    video = p.createCapture(VIDEO)
    video.hide()
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', getPoses)
  }

  function getPoses(poses) {
    pose = poses[0] && poses[0].pose
    console.log(pose)
  }

  function modelLoaded() {
    console.log('poseNet ready!')
  }

  p.draw = function() {
    console.log('draw')
    p.image(video,0,0)
    if(pose) {
      p.fill(255,0,0)
      p.circle(pose.nose.x, pose.nose.y, 30)
      p.fill(155,100,90)
      p.circle(pose.leftEye.x, pose.leftEye.y, 15)
      p.fill(155,100,90)
      p.circle(pose.rightEye.x, pose.rightEye.y, 15)
      p.fill(155,100,255)
      p.circle(pose.leftEar.x, pose.leftEar.y, 15)
      p.fill(155,100,255)
      p.circle(pose.rightEar.x, pose.rightEar.y, 15)
      p.fill(55,100,190)
      p.circle(pose.leftShoulder.x, pose.leftShoulder.y, 25)
      p.fill(55,100,190)
      p.circle(pose.rightShoulder.x, pose.rightShoulder.y, 25)
    } 
  }
}
// p5 init
const myp5 = new p5(init)






