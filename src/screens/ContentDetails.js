import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const ContentDetails = ({route}) => {
  const {image, title} = route?.params;

  return (
    <View style={styles.wrapper}>
      <Image
        source={{uri: image}}
        style={styles.imageStyle}
        resizeMode="stretch"
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  imageStyle: {
    width: '100%',
    height: 500,
  },
  title: {
    marginTop: 5,
  },
});

export default ContentDetails;
