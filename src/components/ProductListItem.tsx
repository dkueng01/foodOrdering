import { StyleSheet, Text, View, Image } from 'react-native';
import Colors from '@/src/constants/Colors';
import { Product } from '../types';

export const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

type ProductListItemProps = {
    product: Product
}

const ProductListItem = (props: ProductListItemProps) => {
  return(
    <View style={styles.container}>
      <Image source={{uri: props.product.image || defaultPizzaImage}} style={styles.image} />
      <Text style={styles.title}>{props.product.name}</Text>
      <Text style={styles.price}>${props.product.price}</Text>
    </View>
  )
}

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    padding: 10,
    borderRadius: 20
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold'
  }
});
