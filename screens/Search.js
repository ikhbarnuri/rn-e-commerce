import { FlatList, Image, TextInput, TouchableOpacity, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './search.style';
import { Feather, Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants';
import { useState } from 'react';
import axios from 'axios';
import SearchTile from '../components/products/SearchTile';

const Search = () => {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('https://rn-e-commerce.vercel.app/api/products/search/' + search);
      setSearchResult(response.data);
    } catch (e) {
      console.log('Failed to get products ' + e);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <TouchableOpacity activeOpacity={0.6}>
          <Feather name={'search'} size={24} style={styles.searchIcon} />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            placeholder={'What are you looking for'}
          />
        </View>
        <View>
          <TouchableOpacity activeOpacity={0.6} style={styles.searchBtn} onPress={handleSearch}>
            <Feather name={'search'} size={SIZES.xLarge} color={COLORS.offwhite} />
          </TouchableOpacity>
        </View>
      </View>
      {searchResult.length === 0 ? (
        <View style={{ flex: 1 }}>
          <Image source={require('../assets/images/Pose23.png')} style={styles.searchImage} />
        </View>
      ) : (
        <FlatList
          data={searchResult}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <SearchTile item={item} />}
          style={{ marginHorizontal: 12 }}
        />
      )}
    </SafeAreaView>
  );
};

export default Search;