import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './productDetails.style';
import { Fontisto, Ionicons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants';
import { useState } from 'react';
import { useRoute } from '@react-navigation/native';

const ProductDetails = ({ navigation }) => {
  const rpute = useRoute();
  const { item } = rpute.params;
  console.log(item);
  const [count, setCount] = useState(1);

  const countIncrementHandler = () => {
    setCount(prevState => prevState + 1);
  };

  const countDecrementHandler = () => {
    if (count > 1) {
      setCount(prevState => prevState - 1);
    }
  };

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

      <Image
        source={{ uri: 'https://d326fntlu7tb1e.cloudfront.net/uploads/5d445b91-c01a-4564-8ff8-c27c2b88ea5b-fn7.png' }}
        style={styles.image}
      />

      <View style={styles.details}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.priceWrapper}>
              <Text style={styles.price}>${item.price}</Text>
            </View>
          </View>

          <View style={styles.ratingRow}>
            <View style={styles.rating}>
              {[1, 2, 3, 4, 5].map((index) => (
                <Ionicons
                  key={index}
                  name={'star'}
                  size={24}
                  color={'gold'}
                />))}
              <Text style={styles.ratingText}>(4.9)</Text>
            </View>

            <View style={styles.rating}>
              <TouchableOpacity activeOpacity={0.6} onPress={countDecrementHandler}>
                <SimpleLineIcons name={'minus'} size={20} />
              </TouchableOpacity>
              <Text style={styles.ratingText}>{count}</Text>
              <TouchableOpacity activeOpacity={0.6} onPress={countIncrementHandler}>
                <SimpleLineIcons name={'plus'} size={20} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.descriptionWrapper}>
            <Text style={styles.description}>Description</Text>
            <Text style={styles.descriptionText}>
              {item.description}
            </Text>
          </View>

          <View style={{ marginBottom: SIZES.small }}>
            <View style={styles.location}>
              <View style={{ flexDirection: 'row' }}>
                <Ionicons name={'locate-outline'} size={20} />
                <Text> {item.location}</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons name={'truck-delivery-outline'} size={20} />
                <Text> Free Delivery</Text>
              </View>
            </View>
          </View>

          <View style={styles.cartRow}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
              }}
              style={styles.cartBtn}>
              <Text style={styles.cartTitle}>BUY NOW</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
              }}
              style={styles.addBtn}>
              <Fontisto name={'shopping-bag'} size={22} color={COLORS.lightWhite} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetails;