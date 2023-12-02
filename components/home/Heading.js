import { Text, TouchableOpacity, View } from 'react-native';
import styles from './heading.style';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import { useNavigation } from '@react-navigation/native';

const Heading = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>New Rivals</Text>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('ProductList')}>
          <Ionicons name={'ios-grid'} size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Heading;