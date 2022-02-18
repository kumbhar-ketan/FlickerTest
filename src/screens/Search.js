import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Alert} from 'react-native';
import SearchContent from 'components/SearchContent';
import {flickerApi} from 'services';

let timeout;
const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [apiCalled, setApiCalled] = useState(false);

  const getSearchData = (value, nextPage = 1) => {
    if (!apiCalled) {
      setApiCalled(true);
      flickerApi(value, nextPage)
        .then(response => {
          setApiCalled(false);
          if (response?.data?.status !== 'fail') {
            const data = response?.data?.photos;
            if (results?.length) {
              setResults([...results, ...data?.photo]);
            } else {
              setResults(data?.photo);
            }
            setPage(data.page);
            setLastPage(data.pages);
          } else {
            Alert.alert('Error!', response?.data?.message);
          }
        })
        .catch(error => {
          setApiCalled(false);
          Alert.alert('Error!', error);
        });
    }
  };

  const onSearchChange = value => {
    setSearchText(value);
    clearTimeout(timeout);
    if (value) {
      timeout = setTimeout(() => {
        getSearchData(value);
      }, 300);
    } else {
      setResults([]);
    }
  };

  const lazyLoad = () => {
    if (page < lastPage) {
      getSearchData(searchText, page + 1);
    }
  };

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.inputStyle}
        value={searchText}
        placeholder="Search"
        onChangeText={value => onSearchChange(value)}
        keyboardType="web-search"
      />
      <SearchContent results={results} callApi={lazyLoad} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  inputStyle: {
    padding: 10,
    borderRadius: 4,
    backgroundColor: 'white',
    margin: 10,
  },
});

export default Search;
