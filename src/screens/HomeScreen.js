import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../styles/colors';
import ShipmentDetailModal from '../components/ShipmentDetailModal';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Mock shipment data
  const [shipments, setShipments] = useState([
    {
      id: 'PS001234',
      status: 'In Transit',
      icon: 'local-shipping',
      destination: 'Central, Hong Kong',
      estimatedDelivery: '2024-01-15',
      currentLocation: 'Kowloon Sorting Center',
      progress: 65,
      manager: 'John Lee',
      type: 'Pin-ship',
    },
    {
      id: 'SP005678',
      status: 'Delivered',
      icon: 'check-circle',
      destination: 'Causeway Bay, HK',
      estimatedDelivery: '2024-01-12',
      currentLocation: 'Delivered',
      progress: 100,
      manager: 'Amy Chan',
      type: 'Speed Post',
    },
    {
      id: 'PS009012',
      status: 'Processing',
      icon: 'inventory',
      destination: 'Tsim Sha Tsui, HK',
      estimatedDelivery: '2024-01-18',
      currentLocation: 'Warehouse',
      progress: 20,
      manager: 'David Wong',
      type: 'Pin-ship',
    },
    {
      id: 'SP003456',
      status: 'Out for Delivery',
      icon: 'directions-bike',
      destination: 'Wan Chai, HK',
      estimatedDelivery: '2024-01-13',
      currentLocation: 'With Courier',
      progress: 85,
      manager: 'Sarah Liu',
      type: 'Speed Post',
    },
  ]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate API call to fetch updated shipments
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return colors.success;
      case 'In Transit':
        return colors.secondary;
      case 'Out for Delivery':
        return colors.warning;
      case 'Processing':
        return colors.primary;
      default:
        return colors.gray[500];
    }
  };

  const filteredShipments = shipments.filter(
    shipment =>
      shipment.id.toLowerCase().includes(searchText.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchText.toLowerCase()) ||
      shipment.status.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleShipmentPress = (shipment) => {
    setSelectedShipment(shipment);
    setModalVisible(true);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? colors.dark.background : colors.light.background,
    },
    searchContainer: {
      padding: 15,
      backgroundColor: isDarkMode ? colors.dark.card : colors.light.card,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? colors.dark.border : colors.light.border,
    },
    searchInput: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDarkMode ? colors.dark.inputBackground : colors.light.inputBackground,
      borderRadius: 10,
      paddingHorizontal: 15,
      height: 45,
    },
    searchTextInput: {
      flex: 1,
      marginLeft: 10,
      fontSize: 16,
      color: isDarkMode ? colors.dark.text : colors.light.text,
    },
    headerText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? colors.dark.text : colors.light.text,
      padding: 15,
      paddingBottom: 5,
    },
    shipmentGrid: {
      padding: 10,
    },
    shipmentCard: {
      backgroundColor: isDarkMode ? colors.dark.card : colors.light.card,
      borderRadius: 12,
      padding: 15,
      marginHorizontal: 5,
      marginVertical: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    shipmentId: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.primary,
    },
    statusBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 15,
    },
    statusText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: '600',
      marginLeft: 5,
    },
    cardBody: {
      marginVertical: 10,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
    },
    infoText: {
      marginLeft: 10,
      fontSize: 14,
      color: isDarkMode ? colors.dark.textSecondary : colors.light.textSecondary,
      flex: 1,
    },
    progressBar: {
      height: 6,
      backgroundColor: isDarkMode ? colors.gray[800] : colors.gray[200],
      borderRadius: 3,
      marginTop: 10,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      borderRadius: 3,
    },
    shipmentType: {
      backgroundColor: colors.primary,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 10,
    },
    shipmentTypeText: {
      color: '#fff',
      fontSize: 10,
      fontWeight: 'bold',
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 50,
    },
    emptyStateText: {
      fontSize: 16,
      color: isDarkMode ? colors.dark.textSecondary : colors.light.textSecondary,
      marginTop: 10,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInput}>
          <Icon
            name="search"
            size={24}
            color={isDarkMode ? colors.dark.textSecondary : colors.light.textSecondary}
          />
          <TextInput
            style={styles.searchTextInput}
            placeholder="Search shipment ID or destination..."
            placeholderTextColor={isDarkMode ? colors.dark.textSecondary : colors.light.textSecondary}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
          />
        }
      >
        <Text style={styles.headerText}>Your Shipments</Text>

        <View style={styles.shipmentGrid}>
          {filteredShipments.length > 0 ? (
            filteredShipments.map(shipment => (
              <TouchableOpacity
                key={shipment.id}
                style={styles.shipmentCard}
                onPress={() => handleShipmentPress(shipment)}
                activeOpacity={0.7}
              >
                <View style={styles.cardHeader}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text style={styles.shipmentId}>{shipment.id}</Text>
                    <View style={styles.shipmentType}>
                      <Text style={styles.shipmentTypeText}>{shipment.type}</Text>
                    </View>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(shipment.status) }]}>
                    <Icon name={shipment.icon} size={14} color="#fff" />
                    <Text style={styles.statusText}>{shipment.status}</Text>
                  </View>
                </View>

                <View style={styles.cardBody}>
                  <View style={styles.infoRow}>
                    <Icon
                      name="place"
                      size={20}
                      color={isDarkMode ? colors.dark.textSecondary : colors.light.textSecondary}
                    />
                    <Text style={styles.infoText}>{shipment.destination}</Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Icon
                      name="schedule"
                      size={20}
                      color={isDarkMode ? colors.dark.textSecondary : colors.light.textSecondary}
                    />
                    <Text style={styles.infoText}>Est. Delivery: {shipment.estimatedDelivery}</Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Icon
                      name="location-on"
                      size={20}
                      color={isDarkMode ? colors.dark.textSecondary : colors.light.textSecondary}
                    />
                    <Text style={styles.infoText}>{shipment.currentLocation}</Text>
                  </View>
                </View>

                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${shipment.progress}%`,
                        backgroundColor: getStatusColor(shipment.status)
                      }
                    ]}
                  />
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Icon
                name="inbox"
                size={64}
                color={isDarkMode ? colors.dark.textSecondary : colors.light.textSecondary}
              />
              <Text style={styles.emptyStateText}>No shipments found</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <ShipmentDetailModal
        visible={modalVisible}
        shipment={selectedShipment}
        onClose={() => setModalVisible(false)}
        isDarkMode={isDarkMode}
      />
    </View>
  );
};

export default HomeScreen;