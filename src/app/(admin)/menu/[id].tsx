import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { defaultPizzaImage } from '@/src/components/ProductListItem'
import Colors from '@/src/constants/Colors'
import { useState } from 'react';
import { useCart } from '@/src/providers/CartProvider'
import { PizzaSize } from '@/src/types'
import { FontAwesome } from '@expo/vector-icons'
import { useProduct } from '@/src/api/products'

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailScreen = () => {
  const {id: idString}: any = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);
  const {data: product, error, isLoading} = useProduct(id);

  const {addItem} = useCart();

  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');

  const addToCard = () => {
    if(!product) {
      return;
    }
    addItem(product, selectedSize);
    router.push('/cart')
  }

  if(isLoading) {
    return <ActivityIndicator />
  }

  if(error) {
    return <Text>Failed to fetch products!</Text>
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Menu',
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({pressed}) => (
                  <FontAwesome
                      name="pencil"
                      size={25}
                      color={Colors.light.text}
                      style={{marginRight: 15, opacity: pressed ? 0.5 : 1}}
                  />
                )}
              </Pressable>
            </Link>
          )
          }}
      />

      <Stack.Screen options={{title: product.name}} />
      <Image source={{uri: product.image || defaultPizzaImage}} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    flex: 1,
    padding: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default ProductDetailScreen;