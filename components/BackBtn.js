import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants';

const BackBtn = ({ onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress} style={styles.backBtn}>
      <Ionicons name={'chevron-back-circle'} size={30} color={COLORS.primary} />
    </TouchableOpacity>
  );
};

export default BackBtn;

const styles = StyleSheet.create({
  backBtn: {
    alignItems: 'center',
    position: 'absolute',
    zIndex: 999,
    top: SIZES.large - 10,
  },
});