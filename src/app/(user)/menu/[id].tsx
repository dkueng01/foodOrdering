import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { defaultPizzaImage } from '@/src/components/ProductListItem'
import Colors from '@/src/constants/Colors'
import { useState } from 'react';
import Button from '@/src/components/Button'
import { useCart } from '@/src/providers/CartProvider'
import { PizzaSize } from '@/src/types'
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
      <Stack.Screen options={{title: product.name}} />
      <Image source={{uri: product.image || defaultPizzaImage}} style={styles.image} />
      <Text>Select size</Text>
      <View style={styles.sizes}>
        {
          sizes.map((size, index) => {
            return <Pressable 
                key={size + index}
                style={[styles.size, {backgroundColor: selectedSize === size ? 'gainsboro' : Colors.light.background}]}
                onPress={() => {setSelectedSize(size)}}
              >
                <Text style={[styles.sizeText, {color: selectedSize === size ? 'black' : 'gray'}]}>{size}</Text>
              </Pressable>
          })
        }
      </View>
      <Text style={styles.price}>${product.price}</Text>
      <Button text='Add to cart' onPress={addToCard} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    flex: 1,
    padding: 10
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 'auto',
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  size: {
    backgroundColor: 'gainsboro',
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500'
  }
})

export default ProductDetailScreen;