import React, { useEffect, useState } from 'react';
import {View,Text,ActivityIndicator,FlatList,StyleSheet,TouchableOpacity,TextInput,RefreshControl} from 'react-native';
import { useDispatch } from 'react-redux';
import { fetchCryptoMarketData, CryptoCoin } from '../services/coinGeckoService';
import { setCoinsRedux } from '../store/cryptoSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [coins, setCoins] = useState<CryptoCoin[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState('');

  const loadInitialData = async () => {
    setLoading(true);
    const data = await fetchCryptoMarketData(1);
    setCoins(data);
    dispatch(setCoinsRedux(data)); // Satisfies local data storage requirement
    setLoading(false);
  };

  const loadMoreData = async () => {
    if (loadingMore || search.length > 0) return; 
    setLoadingMore(true);
    const nextPage = page + 1;
    const newData = await fetchCryptoMarketData(nextPage);
    const combined = [...coins, ...newData];
    setCoins(combined);
    dispatch(setCoinsRedux(combined));
    setPage(nextPage);
    setLoadingMore(false);
  };

  useEffect(() => { loadInitialData(); }, []);

  const filteredData = coins.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.searchBar}
        placeholder="Search assets..."
        placeholderTextColor="#7C7C8A"
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => `${item.coin_id}-${index}`}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => loadingMore ? <ActivityIndicator color="#00B37E" /> : null}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.coinRow}
            onPress={() => navigation.navigate('Details', { 
              item: {
                id: item.coin_id as any,
                title: item.name,
                body: `Price: $${item.current_price.toLocaleString()}\nMCap: $${item.market_cap.toLocaleString()}`
              } 
            })}
          >
            <View>
              <Text style={styles.coinName}>{item.name}</Text>
              <Text style={styles.coinSymbol}>{item.symbol}</Text>
            </View>
            <Text style={styles.coinPrice}>${item.current_price.toLocaleString()}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#121214' },
  searchBar: { backgroundColor: '#202024', color: '#FFF', padding: 12, borderRadius: 8, marginBottom: 15 },
  coinRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#202024', borderRadius: 8, marginBottom: 10 },
  coinName: { color: '#FFF', fontWeight: 'bold' },
  coinSymbol: { color: '#7C7C8A', fontSize: 12 },
  coinPrice: { color: '#00B37E', fontWeight: 'bold' }
});

export default HomeScreen;