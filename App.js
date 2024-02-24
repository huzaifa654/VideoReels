import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import VideoReel from './VideoReel'
import SwiperFlatList from 'react-native-swiper-flatlist'

export default function App() {
  const [currentIndex, setIndex] = useState(0)
  const onChangeIndex = (index) => {
    console.log("currentIndex====", index)
    setIndex(index?.index)
  }
  useEffect(() => {
    console.log("currentIndex", currentIndex)
  }, [currentIndex])

  const Data = [
    {
      reel: require("./assets/Reel.mp4"),
      id: 1
    },
    {
      reel: require("./assets/Rool.mp4"),
      id: 2
    },
    {
      reel: require("./assets/rm.mp4"),
      id: 3
    },
    {
      reel: require("./assets/bugs.mp4"),
      id: 4
    },
  ]
  return (
    <View style={{ flex: 1 }}>

      <SwiperFlatList
        data={Data}
        vertical
        renderItem={item => <VideoReel item={item?.item} index={item?.index} currentIndex={currentIndex} />}
        keyExtractor={(item) => item?.id}
        onChangeIndex={onChangeIndex}

      />
    </View>
  )
}

const styles = StyleSheet.create({})