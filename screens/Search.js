import { TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './search.style';
import { Feather, Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants';

const Search = () => {
  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <TouchableOpacity activeOpacity={0.6}>
          <Feather name={'search'} size={24} style={styles.searchIcon} />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={''}
            onPressIn={() => {
            }}
            placeholder={'What are you looking for'}
          />
        </View>
        <View>
          <TouchableOpacity activeOpacity={0.6} style={styles.searchBtn}>
            <Feather name={'search'} size={SIZES.xLarge} color={COLORS.offwhite} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Search;