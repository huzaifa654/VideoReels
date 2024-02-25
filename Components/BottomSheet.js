import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'


export default function BottomSheet() {
    const bottomSheetRef = useRef(null)
    const snapPoints = ["50%"]
    const PesentModal = () => {
        bottomSheetRef?.current?.present();
    }
    return (
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: "gray" }}>
            <BottomSheetModalProvider>
                <BottomSheetModal
                    ref={bottomSheetRef}
                    index={0}
                    snapPoints={snapPoints}
                >
                    <View>
                        <Text>Hello</Text>
                    </View>
                </BottomSheetModal>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "gray",
        alignItems: "center"
    }
})