import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './searchTile.style';
import { useNavigation } from '@react-navigation/native';

const SearchTile = ({ item }) => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.6}
        onPress={() => navigation.navigate('ProductDetails', { item })}
      >
        <View style={styles.image}>
          <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.productSupplier}>{item.supplier}</Text>
          <Text style={styles.productSupplier}>${item.price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchTile;