import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './productCardView.style';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import { useNavigation } from '@react-navigation/native';

const ProductCardView = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('ProductDetails')}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.image}
          />
        </View>

        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.supplier} numberOfLines={1}>{item.supplier}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>

        <TouchableOpacity activeOpacity={0.6} style={styles.addBtn}>
          <Ionicons name={'add-circle'} size={35} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardView;