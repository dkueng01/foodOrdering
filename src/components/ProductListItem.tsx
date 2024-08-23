import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import Colors from '@/src/constants/Colors';
import { Product } from '../types';
import { Link, useSegments } from 'expo-router';
import { Tables } from '../database.types';

export const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

type ProductListItemProps = {
    product: Tables<'products'>
}

const ProductListItem = (props: ProductListItemProps) => {
  const segments = useSegments();

  return(
    <Link href={`${segments[0]}/menu/${props.product.id}`} asChild>
      <Pressable style={styles.container}>
        <Image
          source={{uri: props.product.image || defaultPizzaImage}}
          style={styles.image}
          resizeMode='contain'
        />
        <Text style={styles.title}>{props.product.name}</Text>
        <Text style={styles.price}>${props.product.price}</Text>
      </Pressable>
    </Link>
  )
}

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: '50%'
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
