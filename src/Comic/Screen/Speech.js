import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
//import { NativeModules, NativeEventEmitter, Platform } from 'react-native';
//const TextToSpeech = NativeModules.TextToSpeech;
import Tts from 'react-native-tts';
//import Speech from 'react-native-speech';

export default class SpeechTX extends React.Component {

    startHandler = () => {
        //TextToSpeech.setDefaultVoice('com.apple.ttsbundle.Moira-compact');
        Tts.speak('Anh ơi. Anh đang ở đâu đấy anh. Có hay về em này. Anh chắc đang bận với nơi có tiếng yêu mới.')
    }
    pause = () => {
        Tts.addEventListener('tts-finish', (event) => alert("finish", event));
    }
    resume = () => {
        Tts.addEventListener('tts-cancel', (event) => alert("cancel", event));
    }
    stop = () => {
        Tts.stop();
    }
    start = () => {
        Tts.addEventListener('tts-start', (event) => alert("start", event));
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => this.startHandler()} style={{ padding: 20, backgroundColor: 'green', justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 25 }}>Play</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.pause()} style={{ padding: 20, backgroundColor: 'green', justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 25 }}>finish</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.resume()} style={{ padding: 20, backgroundColor: 'green', justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 25 }}>cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.start()} style={{ padding: 20, backgroundColor: 'green', justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 25 }}>start</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.stop()} style={{ padding: 20, backgroundColor: 'green', justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 25 }}>stop</Text>
                </TouchableOpacity>
            </View>
        )
    }
}