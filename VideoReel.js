import { StyleSheet, Text, View, Dimensions, StatusBar, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Video from 'react-native-video';
import BottomSheet from './Components/BottomSheet';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

export default function VideoReel({ item, index, currentIndex, }) {
    const videoRef = useRef(null)
    const [Mute, setMute] = useState(false)
    const [icon, seticon] = useState(false)
    const [like, setlike] = useState(false)
    const [follow, setfollow] = useState(false)
    const bottomSheetModalRef = useRef(null);
    const startDragY = useRef(0);
    const handleGestureStart = (event) => {
        startDragY.current = event.nativeEvent.pageY;
    };

    const handleGestureEnd = (event) => {
        const endDragY = event.nativeEvent.pageY;
        const dragDistance = startDragY.current - endDragY;
        console.log("dragDistance", dragDistance)
        if (dragDistance > 100) {
            bottomSheetModalRef.current?.dismiss();
        }
    };

    const openBottomSheet = () => {
        bottomSheetModalRef.current?.present();
    };
    const handleClose = () => {
        bottomSheetModalRef.current?.dismiss();
    };
    useEffect(() => {
        icon && setTimeout(() => {
            seticon(false)
        }, 2000);

    }, [icon, currentIndex])
    // console.log("item===========", item)
    return (
        <GestureHandlerRootView style={styles?.container}>
            <BottomSheetModalProvider>
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

                    <TouchableOpacity onPress={() => setlike(!like)}>
                        <Image source={like ? require("./assets/fill.png") : require("./assets/heart.png")} style={[styles.insta, { tintColor: like ? "red" : "white" }]} resizeMode='contain' />
                        <Text style={styles?.commentText}>23K</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Image source={require("./assets/chat.png")} style={styles.insta} resizeMode='contain' />
                        <Text style={styles?.commentText}>1,165</Text>
                    </TouchableOpacity>


                    <Image source={require("./assets/send.png")} style={styles.insta} resizeMode='contain' />
                    <Text style={styles?.commentText}>398K</Text>

                </View>

                <View style={styles?.profileContainer}>

                    <Image source={item?.profile} style={styles.profile} resizeMode='contain' />
                    <Text style={styles?.profileText}>{item?.username}</Text>

                    <TouchableOpacity onPress={() => setfollow(!follow)} style={styles.followConatiner}>
                        <Text style={styles?.followText}>{follow ? "Following" : "Follow"}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.captionContainer}>
                    <Text style={styles?.captionText}>{item?.caption}</Text>
                </View>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={['50%']}
                    onChange={(index, gestureState) => {
                        if (index === -1 && gestureState === 'end') {
                            bottomSheetModalRef.current?.dismiss();
                        }
                    }}
                >
                    <BottomSheetScrollView
                        onTouchStart={handleGestureStart}
                        onTouchEnd={handleGestureEnd}>
                        <View style={styles.content}>
                            <Text>Content of the bottom sheet goes here</Text>
                        </View>
                    </BottomSheetScrollView>
                </BottomSheetModal>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>

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
        bottom: 135,
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
        bottom: 100,
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
        borderRadius: 8,
        borderColor: "white",
        paddingHorizontal: 23,
        // width: 120,
        height: 35,
        alignItems: "center",
        // backgroundColor: "pink",
        marginLeft: 23,
        justifyContent: "center"
    },
    followText: {
        color: "white",
        fontSize: 16,
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
        bottom: 68,
        left: 30
    },
    captionText: {
        color: "white",
        fontSize: 18
    },
    handleIndicator: {
        height: 4,
        width: 40,
        borderRadius: 2,
        backgroundColor: 'gray',
    },
    handleIndicatorEnd: {
        marginBottom: -4,
    },
    handleContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    handle: {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: 'gray',
    },
})