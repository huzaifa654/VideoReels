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
      caption: "Tag your freind..",
      username: "Tezen_",
      profile: require("./assets/Profile1.jpg"),
      id: 1
    },
    {
      reel: require("./assets/Rool.mp4"),
      caption: "Motvivation!!",
      username: "__zainu",
      profile: require("./assets/Profile2.jpg"),
      id: 2
    },
    {
      reel: require("./assets/rm.mp4"),
      caption: "Travel....",
      username: "__.n.d._",
      profile: require("./assets/Profile3.jpg"),
      id: 3
    },
    {
      reel: require("./assets/bugs.mp4"),
      caption: "Life of programmers !!",
      username: "__coader",
      profile: require("./assets/profile.jpg"),
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