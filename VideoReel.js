import { StyleSheet, Text, View, Dimensions, StatusBar, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Video from 'react-native-video';
const { width, height } = Dimensions.get('window');

export default function VideoReel({ item, index, currentIndex }) {
    const videoRef = useRef(null)
    const [Mute, setMute] = useState(false)
    const [icon, seticon] = useState(false)
    useEffect(() => {
        icon && setTimeout(() => {
            seticon(false)
        }, 2000);

        if (!!videoRef.current) {
            videoRef.current.seek(0)
        }
    }, [icon, currentIndex])
    // console.log("item===========", item)
    return (
        <View style={styles?.container}>
            <StatusBar backgroundColor={"black"} />
            <View style={styles?.reels}>
                <Text style={styles?.text}>Reels</Text>
                <Image source={require("./assets/camera.png")} resizeMode='contain' style={styles?.img} />
            </View >
            <TouchableOpacity style={{ backgroundColor: "red" }}
                onPress={() => {
                    setMute(!Mute);
                    seticon(true)
                }}
                activeOpacity={4}
            >
                <Video
                    ref={videoRef}
                    source={item?.reel}
                    style={styles.backgroundVideo}
                    resizeMode="contain"
                    repeat={true}
                    muted={Mute}
                    paused={currentIndex !== index}
                // playWhenInactive={false}
                // playInBackground={false}
                />
                {icon &&
                    <View style={styles?.muteConatiner}>
                        <Image source={Mute ? require("./assets/mute.png") : require("./assets/volume.png")} style={styles?.mute} resizeMode='contain' />
                    </View>
                }

            </TouchableOpacity>
            <View style={styles?.comment}>

                <Image source={require("./assets/heart.png")} style={styles.insta} resizeMode='contain' />
                <Text style={styles?.commentText}>23K</Text>

                <Image source={require("./assets/chat.png")} style={styles.insta} resizeMode='contain' />
                <Text style={styles?.commentText}>1,165</Text>

                <Image source={require("./assets/send.png")} style={styles.insta} resizeMode='contain' />
                <Text style={styles?.commentText}>398K</Text>

            </View>

            <View style={styles?.profileContainer}>
                <Image source={require("./assets/profile.jpg")} style={styles.profile} resizeMode='contain' />
                <Text style={styles?.profileText}>explorish_</Text>
                <View style={styles.followConatiner}>
                    <Text style={styles?.followText}>Follow</Text>
                </View>
            </View>
            <View style={styles.captionContainer}>
                <Text style={styles?.captionText}>Motivation 😌
                    😍!!!</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        height: height

    },
    backgroundVideo: {
        backgroundColor: "black",
        width: width,
        height: height,
        marginTop: -45


    },
    reels: {
        flexDirection: "row",
        justifyContent: "space-between",
        // marginTop: StatusBar.currentHeight,
        zIndex: 100000,
        backgroundColor: "black",
        alignItems: "center",
        // marginTop: -15

    },
    text: {
        color: "white",
        fontSize: 23,
        fontWeight: "bold",
        alignItems: "center",
        marginLeft: 12

    },
    img: {
        tintColor: "white",
        width: width * 0.08,
        height: height * 0.05,
        alignItems: "center",
        marginRight: 12

    },
    insta: {
        tintColor: "white",
        width: width * 0.08,
        height: height * 0.05,

    },
    comment: {
        position: "absolute",
        bottom: 80,
        right: 12,
    },
    commentText: {
        color: "white",
        alignSelf: "center",
        fontSize: 16,
        marginBottom: 15,
        marginTop: 6
    },
    profileContainer: {
        position: "absolute",
        bottom: 55,
        flexDirection: "row",
        left: 23

    },
    profile: {
        width: width * 0.15,
        height: height * 0.1,
        borderRadius: 100,
        aspectRatio: 1 / 1,
        borderColor: "red",
        borderWidth: 3
    },
    profileText: {
        color: "white",
        alignSelf: "center",
        fontSize: 18,
        marginBottom: 15,
        marginTop: 6,
        marginLeft: 12,
        fontWeight: "600"
    },
    followConatiner: {
        borderWidth: 1.5,
        borderRadius: 15,
        borderColor: "white",
        paddingHorizontal: 23,
        // width: 120,
        height: 45,
        alignItems: "center",
        // backgroundColor: "pink",
        marginLeft: 23,
        justifyContent: "center"
    },
    followText: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
    },
    mute: {
        width: 25,
        height: 25,
        tintColor: "white",
        aspectRatio: 1 / 1,

        // right: 45
    },
    muteConatiner: {
        position: "absolute",
        top: 260,
        left: 150,
        backgroundColor: "black",
        opacity: 0.8,
        borderRadius: 100,
        aspectRatio: 1 / 1,
        padding: 25

    },
    captionContainer: {
        position: "absolute",
        bottom: 15,
        left: 30
    },
    captionText: {
        color: "white",
        fontSize: 18
    }
})