import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  image: any;
  discount?: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Modern Sofa',
    price: '$299.99',
    originalPrice: '$399.99',
    discount: '25%',
    image: require('../../assets/images/sofa.png'),
  },
  {
    id: '2',
    name: 'Comfortable Chair',
    price: '$149.99',
    image: require('../../assets/images/chair.avif'),
  },
  {
    id: '3',
    name: 'Wooden Table',
    price: '$199.99',
    originalPrice: '$249.99',
    discount: '20%',
    image: require('../../assets/images/table.jpg'),
  },
  {
    id: '4',
    name: 'Luxury Armchair',
    price: '$349.99',
    image: require('../../assets/images/armchair.jpg'),
  },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const colors = Colors[colorScheme ?? 'light'];

  const handleView3D = (productId: string) => {
    // Navigate to explore screen for 3D view
    router.push('/(tabs)/explore');
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor:'white'}]}>
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.headerTitle}>
            IBSU thesis Demo
          </ThemedText>
          <ThemedText style={styles.headerSubtitle}>
            Discover our premium furniture pieces
          </ThemedText>
        </View>

        <View style={styles.productsGrid}>
          {products.map((product) => (
            <View key={product.id} style={[styles.productCard, { backgroundColor: colors.background }]}>
              <View style={styles.imageContainer}>
                <Image
                  source={product.image}
                  style={styles.productImage}
                  contentFit="cover"
                />
                {product.discount && (
                  <View style={styles.discountBadge}>
                    <ThemedText style={styles.discountText}>{product.discount}</ThemedText>
                  </View>
                )}
              </View>

              <View style={styles.productInfo}>
                <ThemedText type="defaultSemiBold" style={styles.productName} numberOfLines={2}>
                  {product.name}
                </ThemedText>

                <View style={styles.priceContainer}>
                  <ThemedText type="defaultSemiBold" style={styles.price}>
                    {product.price}
                  </ThemedText>
                  {product.originalPrice && (
                    <ThemedText style={styles.originalPrice}>{product.originalPrice}</ThemedText>
                  )}
                </View>

                <TouchableOpacity
                  style={[styles.view3DButton, { backgroundColor: colors.tint }]}
                  onPress={() => handleView3D(product.id)}
                  activeOpacity={0.8}>
                  <ThemedText style={styles.view3DButtonText}>View in 3D</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  productCard: {
    width: '47%',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    width: '100%',
    height: 180,
    position: 'relative',
    backgroundColor: '#f5f5f5',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    marginBottom: 8,
    minHeight: 40,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  price: {
    fontSize: 18,
    color: '#0a7ea4',
  },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  view3DButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  view3DButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
