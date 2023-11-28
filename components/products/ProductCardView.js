import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './productCardView.style';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import { useNavigation } from '@react-navigation/native';

const ProductCardView = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('ProductDetails')}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://d326fntlu7tb1e.cloudfront.net/uploads/5d445b91-c01a-4564-8ff8-c27c2b88ea5b-fn7.png' }}
            style={styles.image}
          />
        </View>

        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>Product Lorem Ipsum</Text>
          <Text style={styles.supplier} numberOfLines={1}>Supplier</Text>
          <Text style={styles.price}>Price</Text>
        </View>

        <TouchableOpacity activeOpacity={0.6} style={styles.addBtn}>
          <Ionicons name={'add-circle'} size={35} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardView;