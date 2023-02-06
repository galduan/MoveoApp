import React, {useState, useEffect} from 'react';
import {
  Image,
  Text,
  Dimensions,
  View,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  Animated,
  Platform,
  StyleSheet,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {AuthStackParams} from '../../navigation/AuthStack';
import MapView, {Marker} from 'react-native-maps';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';
import NoteCard from '../../components/NoteCard';
import {HomeStackParams} from '../../navigation/HomeStack';
import {Note} from '../../types';

const latitudeDelta = 0.025;
const longitudeDelta = 0.025;
const CARD_HEIGHT = 140;
const {width} = Dimensions.get('screen');
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
const Map = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  const [notes, setNote] = useState<{note: Note; key: string}[]>([]);

  const _map = React.useRef<any>(null);
  const _scrollView = React.useRef<any>(null);
  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  const reference = firebase
    .app()
    .database(
      'https://note-app-cf00a-default-rtdb.europe-west1.firebasedatabase.app/',
    );
  const [region, setRegion] = useState({
    longitude: 0,
    latitude: 0,
    longitudeDelta: 0.004,
    latitudeDelta: 0.009,
  });

  useEffect(() => {
    reference
      .ref(`/users/${auth().currentUser?.uid}/notes`)
      .orderByChild('date')
      .on('value', snapshot => {
        const sortedNotes: {note: Note; key: string}[] = [];
        snapshot.val() &&
          Object.keys(snapshot.val()).forEach(key => {
            sortedNotes.push({note: snapshot.val()[key], key: key});
          });
        sortedNotes.sort((a, b) => (a.note.date < b.note.date ? 1 : -1));
        setNote(sortedNotes);
      });
    Geolocation.getCurrentPosition(
      location => {
        const geolocationRegion = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta,
          longitudeDelta,
        };
        setRegion(geolocationRegion);
        _map.current.animateToRegion(geolocationRegion);
      },
      err => {
        _map.current.animateToRegion(region);
      },
      {enableHighAccuracy: true, timeout: 30000, maximumAge: 10000},
    );
  }, []);
  useEffect(() => {
    mapAnimation.addListener(({value}) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= notes.length) {
        index = notes.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }
      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;

          _map.current.animateToRegion(
            {
              latitude: notes[index].note.location.lat,

              longitude: notes[index].note.location.long,
              latitudeDelta,
              longitudeDelta,
            },
            350,
          );
        }
      }, 10);
      return () => {
        if (regionTimeout) {
          clearTimeout(regionTimeout);
        }
      };
    });
  });

  const onMarkerPress = (mapEventData: any) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current
      ? _scrollView.current.scrollTo({x: x, y: 0, animated: true})
      : null;
  };


  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        showsMyLocationButton={true}
        showsUserLocation={true}
        style={styles.map}
        mapPadding={{top: 0, right: 0, bottom: CARD_HEIGHT + 20, left: 0}}
        region={region}>
        {notes.map((item, index) => {
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: parseFloat(item.note.location.lat.toString()),
                longitude: parseFloat(item.note.location.long.toString()),
              }}
              onPress={(mapEventData: any) => onMarkerPress(mapEventData)}>
            </Marker>
          );
        })}
      </MapView>
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          {useNativeDriver: true},
        )}>
        {notes.map((item, index) => {
          return (
            <View key={index}>
              <NoteCard
                style={styles.card}
                note={item.note}
                onPress={() => {
                  navigation.navigate('NoteScreen', {
                    note: item.note,
                    key: item.key,
                  });
                }}
              />
            </View>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  card: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    marginRight: 20,
  },
});

export default Map;
