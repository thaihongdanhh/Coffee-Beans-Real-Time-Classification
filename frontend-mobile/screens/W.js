import React, { useState, useEffect } from 'react';
import { Button, Image, View, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { Block, theme, Text as GText } from 'galio-framework'
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import ImageView from "react-native-image-viewing";

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [viewimages, setViewImages] = useState([]);
  const [modalVisible, setVisible] = useState(false)

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImages([])
      setImage(result.assets);
    }
  };

  const processImage = async () => {

    const data = new FormData();
    if (image.length) {
      image.forEach((file, i) => {
        console.log(file)
        data.append(`files`, { uri: file.uri, name: file.fileName, type: "image/jpeg" })
      })
    }

    await axios({
      method: "POST",
      url: "http://ai.ailab.vn:5003/upload",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(res => {
      // resolve(res)
      // console.log(res)
      setImages(res.data)
    })
  }

  return (
    <ScrollView
      style={{
        flex: 1
      }}
      contentContainerStyle={
        {
          // width: width * 1.5,
          // height: 500,
          // paddingHorizontal: 10
        }
      }
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button  title="Pick an image from camera roll" onPress={pickImage} />        
        {(image && images.length === 0) && image.map((data, index) => {
          return <Image source={{ uri: data?.uri }} style={{ width: 200, height: 200 }} />
        })}                
        {images && images.map((data, index) => {
          return <Block flex row>
            <Block>
              <Button color="purple" title='Original'>Original</Button>
              <TouchableOpacity onPress={() => {
                setVisible(true);
                setViewImages([
                  {uri: 'http://ai.ailab.vn:5003/image?file_path=' + data.file_raw},                  
                  ])
                }}>
              <Image src={'http://ai.ailab.vn:5003/image?file_path=' + data.file_raw} style={{ width: 200, height: 200 }} />
              </TouchableOpacity>
              </Block>
              <Block>
              <Button color="green" title='Processed'>Processed</Button>
              <TouchableOpacity onPress={() => {
                setVisible(true);
                setViewImages([                  
                  {uri: 'http://ai.ailab.vn:5003/image?file_path=' + data.file_process}
                  ])
                }}>
              <Image src={'http://ai.ailab.vn:5003/image?file_path=' + data.file_process} style={{ width: 200, height: 200 }} />
              </TouchableOpacity>
              </Block>
            </Block>
        })}        
        <Button color='red' title="Process Images" onPress={processImage} />
      </View>      
          <ImageView images={viewimages} visible={modalVisible} onRequestClose={() => setVisible(false)} />        
    </ScrollView>
  );
}