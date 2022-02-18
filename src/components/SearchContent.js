import React, {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';

const SearchContent = ({results, callApi}) => {
  const navigation = useNavigation();

  const onItemPress = useCallback(params => {
    navigation.push('ContentDetails', params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getImageUrl = item =>
    `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`;

  const renderContent = ({item}) => {
    const imageUrl = getImageUrl(item);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          onItemPress({
            image: imageUrl,
            title: item?.title,
          })
        }>
        <Image
          source={{uri: imageUrl}}
          style={styles.imageStyle}
          resizeMode="stretch"
        />
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  const emptyComponent = () => {
    return (
      <View style={styles.noDataFoundWrapper}>
        <Text>No data found!</Text>
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={[...results]}
        renderItem={renderContent}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={emptyComponent}
        onEndReachedThreshold={1}
        onEndReached={() => callApi()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  noDataFoundWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
    backgroundColor: 'transparent',
  },
  wrapper: {
    paddingHorizontal: 10,
    paddingBottom: 70,
  },
  card: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: '100%',
    height: 100,
  },
  title: {
    marginTop: 5,
  },
});

export default SearchContent;
