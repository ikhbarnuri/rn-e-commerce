import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './productDetails.style';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants';

const ProductDetails = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
          <Ionicons name={'chevron-back-circle'} size={30} />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.6} onPress={() => {
        }}>
          <Ionicons name={'heart'} size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetails;