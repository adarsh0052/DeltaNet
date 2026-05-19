import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
interface Props { route: DetailsScreenRouteProp; }

export default function DetailsScreen({ route }: Props) {
  const item = route.params?.item;

  if (!item) return <View style={styles.container}><Text style={styles.mainTitle}>No Data</Text></View>;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.metaLabel}>ASSET NODE IDENTITY</Text>
      <Text style={styles.idDisplay}># {String(item.id).toUpperCase()}</Text>
      <View style={styles.dataBox}>
        <Text style={styles.titleLabel}>Metric Name</Text>
        <Text style={styles.mainTitle}>{item.title}</Text>
        <View style={styles.divider} />
        <Text style={styles.mainBody}>{item.body}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121214' },
  content: { padding: 24 },
  metaLabel: { color: '#7C7C8A', fontSize: 12, fontWeight: 'bold' },
  idDisplay: { color: '#00B37E', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  dataBox: { backgroundColor: '#202024', padding: 20, borderRadius: 12 },
  titleLabel: { color: '#7C7C8A', fontSize: 11 },
  mainTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: '#323238', marginVertical: 15 },
  mainBody: { color: '#C4C4CC', fontSize: 16, lineHeight: 24 }
});