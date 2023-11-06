import React from 'react'
import { Camera } from 'expo-camera'
import { cameraWithTensors } from '@tensorflow/tfjs-react-native'
import {
  AppRegistry,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Block,
  Image
} from 'react-native'

import * as tf from '@tensorflow/tfjs'
import * as jpeg from 'jpeg-js';

// import * as faceDetection from '@tensorflow-models/face-detection'
import * as ScreenOrientation from 'expo-screen-orientation'
import Svg, { Circle, Rect } from 'react-native-svg'
import axios from 'axios';

const TensorCamera = cameraWithTensors(Camera)

const IS_ANDROID = Platform.OS === 'android'
const IS_IOS = Platform.OS === 'ios'

// const model = faceDetection.SupportedModels.MediaPipeFaceMesh;
// const detectorConfig = {
//   runtime: 'mediapipe', // or 'tfjs'
// }
// const detector = await faceDetection.createDetector(model, detectorConfig);

// Camera preview size.
//
// From experiments, to render camera feed without distortion, 16:9 ratio
// should be used fo iOS devices and 4:3 ratio should be used for android
// devices.
//
// This might not cover all cases.
const CAM_PREVIEW_WIDTH = Dimensions.get('window').width
const CAM_PREVIEW_HEIGHT = CAM_PREVIEW_WIDTH / (IS_IOS ? 9 / 16 : 3 / 4)

// The score threshold for pose detection results.
const MIN_KEYPOINT_SCORE = 0.3

// The size of the resized output from TensorCamera.
//
// For movenet, the size here doesn't matter too much because the model will
// preprocess the input (crop, resize, etc). For best result, use the size that
// doesn't distort the image.
const OUTPUT_TENSOR_WIDTH = 480
const OUTPUT_TENSOR_HEIGHT = OUTPUT_TENSOR_WIDTH / (IS_IOS ? 9 / 16 : 3 / 4)
// OUTPUT_TENSOR_WIDTH = 360
// OUTPUT_TENSOR_HEIGHT = 360

// Whether to auto-render TensorCamera preview.
const AUTO_RENDER = true

// Whether to load model from app bundle (true) or through network (false).
const LOAD_MODEL_FROM_BUNDLE = false


export default class Camera2 extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      Image: [],
      orientation: null,
      outputTensorWidth: null,
      outputTensorHeight: null,
      Loading: false
    }
  }

  handleCameraStream =  async (images, updatePreview, gl) => {
    const loop = async () => {
      const nextImageTensor = images.next().value
      const height = nextImageTensor.shape[0]
      const width = nextImageTensor.shape[1]
      const data = new Buffer(
          // concat with an extra alpha channel and slice up to 4 channels to handle 3 and 4 channels tensors
          tf.concat([nextImageTensor, tf.ones([height, width, 1]).mul(255)], [-1])
          .slice([0], [height, width, 4])
          .dataSync(),
      )

      const rawImageData = {data, width, height};
      const jpegImageData = jpeg.encode(rawImageData);

      const imgBase64 = tf.util.decodeString(jpegImageData.data, "base64")
      this.setState({
        // Loading: true
      },async () => {
          // console.log(imgBase64)
          const formdata = new FormData();

          formdata.append('files', {
            uri: 'data:image/png;base64,' + imgBase64, // base64
            name: 'coffee-mobile.png',
            type: 'image/png',
          });

          await axios.post('http://ai.ailab.vn:5003/upload2', formdata, {headers: {'Content-Type': 'multipart/form-data'}})
          .then(res => {
            // console.log(res.data[0].file_process)
            this.setState({
              Image: res.data,
              // Loading: false
            })
          })
          nextImageTensor.dispose();          
      })
      
      

      //
      // do something with tensor here
      //

      // if autorender is false you need the following two lines.
      // updatePreview();
      // gl.endFrameEXP();
      await this.sleep(200)
      requestAnimationFrame(loop)
    }
    loop()
  }


  isPortrait = () => {
    const {
        orientation
    } = this.state
    return (
      orientation === ScreenOrientation.Orientation.PORTRAIT_UP 
      // || orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN
    )
  }

  getOutputTensorWidth = () => {
    return OUTPUT_TENSOR_WIDTH
    // return this.isPortrait() || IS_ANDROID
    //   ? OUTPUT_TENSOR_WIDTH
    //   : OUTPUT_TENSOR_HEIGHT
  }

  getOutputTensorHeight = () => {
    return OUTPUT_TENSOR_HEIGHT
    // return this.isPortrait() || IS_ANDROID
    //   ? OUTPUT_TENSOR_HEIGHT
    //   : OUTPUT_TENSOR_WIDTH
  }

  getTextureRotationAngleInDegrees = async () => {
    // On Android, the camera texture will rotate behind the scene as the phone
    // changes orientation, so we don't need to rotate it in TensorCamera.
    console.log('Vô đây rồi ==============')
    if (IS_ANDROID) {
      return 0
    }

    // For iOS, the camera texture won't rotate automatically. Calculate the
    // rotation angles here which will be passed to TensorCamera to rotate it
    // internally.
    // console.log(this.state.orientation)
    switch (this.state.orientation) {
      // Not supported on iOS as of 11/2021, but add it here just in case.
      case ScreenOrientation.Orientation.PORTRAIT_DOWN:
        return 180
      case ScreenOrientation.Orientation.LANDSCAPE_LEFT:
        return CameraType.front ? 270 : 90
      case ScreenOrientation.Orientation.LANDSCAPE_RIGHT:
        return CameraType.front ? 90 : 270
      default:
        return 0
    }
  }

  sleep = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  render () {
    const { isLoading, outputTensorHeight, outputTensorWidth } = this.state
    // console.log(this.getOutputTensorWidth())
    // console.log(this.getOutputTensorHeight())
    if (isLoading) {
      return <View></View>
    } else {
      return (
        <>
        <View flex >
          {!this.state.Loading && (
            <Image source={{uri: this.state.Image[0]?.file_process}} style={{ width: '100%', height: '100%', resizeMode: 'contain'}} />
          )}        
        </View>
        <View>
          <TensorCamera
            // Standard Camera props
            // ratio='1:1'            
            // cameraTextureWidth={this.getTextureRotationAngleInDegrees()}            
            style={styles.camera}
            type={Camera.Constants.Type.back}
            resizeWidth={this.getOutputTensorWidth()}
            resizeHeight={this.getOutputTensorHeight()}
            resizeDepth={3}
            onReady={this.handleCameraStream}
            autorender={false}
          >
            </TensorCamera>
            
        </View>
        
        </>
      )
    }
  }

  async componentDidMount () {
    await tf.ready()

    this.setState({
      isLoading: false
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  camera: {
    // flex: 1,
    // height: '85%',
    // width: '100%',
    // flex: 0,
    // height: '100%',
    // borderColor: 'green',
    // borderWidth: 10,
    // width: 400,
    // borderRadius: 360,
    // backgroundColor: 'transparent',
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    // alignSelf: 'center',
    // height: 400,
    // overflow: 'hidden'
  },
  svg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 30
  },
})
