import { FlatList, Text, View } from 'react-native';
import { SIZES } from '../../constants';
import ProductCardView from './ProductCardView';
import styles from './productList.style';

const ProductList = () => {
  const products = [1, 2, 3, 4];

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ product }) => <ProductCardView />}
        horizontal
        contentContainerStyle={{
          columnGap: SIZES.medium,
        }}
      />
    </View>
  );
};

export default ProductList;