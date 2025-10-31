import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { colors } from '../styles/colors';

const { width, height } = Dimensions.get('window');

const ShipmentDetailModal = ({ visible, shipment, onClose, isDarkMode }) => {
  const [activeTab, setActiveTab] = useState('tracking');

  if (!shipment) return null;

  // Mock timeline data
  const timeline = [
    {
      status: 'Order Placed',
      time: '2024-01-10 10:00 AM',
      location: 'Online',
      completed: true,
    },
    {
      status: 'Package Picked Up',
      time: '2024-01-10 2:00 PM',
      location: 'Sender Address',
      completed: true,
    },
    {
      status: 'At Sorting Center',
      time: '2024-01-11 9:00 AM',
      location: 'Kowloon Sorting Center',
      completed: true,
    },
    {
      status: 'Out for Delivery',
      time: '2024-01-12 8:00 AM',
      location: 'Local Delivery Hub',
      completed: shipment.progress >= 85,
    },
    {
      status: 'Delivered',
      time: 'Pending',
      location: 'Recipient Address',
      completed: shipment.progress === 100,
    },
  ];

  // Mock coordinates for map (Hong Kong area)
  const mapRegion = {
    latitude: 22.3193,
    longitude: 114.1694,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const routeCoordinates = [
    { latitude: 22.2855, longitude: 114.1577 }, // Starting point
    { latitude: 22.3000, longitude: 114.1700 },
    { latitude: 22.3193, longitude: 114.1694 }, // Current location
    { latitude: 22.3300, longitude: 114.1800 }, // Destination
  ];

  const handleLiveChat = () => {
    Alert.alert(
      'Live Chat',
      'Connecting to customer service...',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Connect',
          onPress: () => Alert.alert('Connected', 'Agent will respond shortly'),
        },
      ]
    );
  };

  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      flex: 1,
      backgroundColor: isDarkMode ? colors.dark.background : colors.light.background,
      marginTop: 50,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? colors.dark.border : colors.light.border,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.primary,
    },
    closeButton: {
      padding: 5,
    },
    tabContainer: {
      flexDirection: 'row',
      backgroundColor: isDarkMode ? colors.dark.card : colors.light.card,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? colors.dark.border : colors.light.border,
    },
    tab: {
      flex: 1,
      paddingVertical: 15,
      alignItems: 'center',
    },
    activeTab: {
      borderBottomWidth: 3,
      borderBottomColor: colors.primary,
    },
    tabText: {
      fontSize: 14,
      fontWeight: '600',
      color: isDarkMode ? colors.dark.textSecondary : colors.light.textSecondary,
    },
    activeTabText: {
      color: colors.primary,
    },
    content: {
      flex: 1,
    },
    mapContainer: {
      height: height * 0.4,
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    infoSection: {
      padding: 20,
      backgroundColor: isDarkMode ? colors.dark.card : colors.light.card,
      marginVertical: 10,
      marginHorizontal: 15,
      borderRadius: 10,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? colors.dark.text : colors.light.text,
      marginBottom: 10,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 5,
    },
    infoLabel: {
      fontSize: 14,
      color: isDarkMode ? colors.dark.textSecondary : colors.light.textSecondary,
    },
    infoValue: {
      fontSize: 14,
      fontWeight: '600',
      color: isDarkMode ? colors.dark.text : colors.light.text,
    },
    timeline: {
      padding: 20,
    },
    timelineItem: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    timelineDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginTop: 5,
    },
    timelineLine: {
      width: 2,
      backgroundColor: isDarkMode ? colors.dark.border : colors.light.border,
      position: 'absolute',
      left: 5,
      top: 17,
      bottom: -20,
    },
    timelineContent: {
      flex: 1,
      marginLeft: 20,
    },
    timelineStatus: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? colors.dark.text : colors.light.text,
    },
    timelineTime: {
      fontSize: 12,
      color: isDarkMode ? colors.dark.textSecondary : colors.light.textSecondary,
      marginTop: 2,
    },
    timelineLocation: {
      fontSize: 13,
      color: isDarkMode ? colors.dark.textSecondary : colors.light.textSecondary,
      marginTop: 2,
    },
    chatButton: {
      backgroundColor: colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 20,
      padding: 15,
      borderRadius: 10,
    },
    chatButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 10,
    },
    managerInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      backgroundColor: isDarkMode ? colors.dark.card : colors.light.card,
      marginHorizontal: 15,
      marginTop: 10,
      borderRadius: 10,
    },
    managerAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    managerDetails: {
      flex: 1,
      marginLeft: 15,
    },
    managerName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? colors.dark.text : colors.light.text,
    },
    managerRole: {
      fontSize: 13,
      color: isDarkMode ? colors.dark.textSecondary : colors.light.textSecondary,
    },
  });

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Shipment {shipment.id}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Icon
                name="close"
                size={24}
                color={isDarkMode ? colors.dark.text : colors.light.text}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'tracking' && styles.activeTab]}
              onPress={() => setActiveTab('tracking')}
            >
              <Text style={[styles.tabText, activeTab === 'tracking' && styles.activeTabText]}>
                Tracking
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'details' && styles.activeTab]}
              onPress={() => setActiveTab('details')}
            >
              <Text style={[styles.tabText, activeTab === 'details' && styles.activeTabText]}>
                Details
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            {activeTab === 'tracking' ? (
              <>
                <View style={styles.mapContainer}>
                  <MapView
                    style={styles.map}
                    initialRegion={mapRegion}
                    customMapStyle={isDarkMode ? darkMapStyle : []}
                  >
                    <Marker
                      coordinate={routeCoordinates[0]}
                      title="Pickup Location"
                      pinColor={colors.success}
                    />
                    <Marker
                      coordinate={routeCoordinates[routeCoordinates.length - 1]}
                      title="Delivery Location"
                      pinColor={colors.primary}
                    />
                    <Marker
                      coordinate={routeCoordinates[2]}
                      title="Current Location"
                      pinColor={colors.warning}
                    />
                    <Polyline
                      coordinates={routeCoordinates}
                      strokeColor={colors.primary}
                      strokeWidth={3}
                    />
                  </MapView>
                </View>

                <View style={styles.timeline}>
                  <Text style={styles.sectionTitle}>Shipment Timeline</Text>
                  {timeline.map((item, index) => (
                    <View key={index} style={styles.timelineItem}>
                      {index < timeline.length - 1 && <View style={styles.timelineLine} />}
                      <View
                        style={[
                          styles.timelineDot,
                          {
                            backgroundColor: item.completed ? colors.success : colors.gray[400]
                          }
                        ]}
                      />
                      <View style={styles.timelineContent}>
                        <Text style={styles.timelineStatus}>{item.status}</Text>
                        <Text style={styles.timelineTime}>{item.time}</Text>
                        <Text style={styles.timelineLocation}>{item.location}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </>
            ) : (
              <>
                <View style={styles.infoSection}>
                  <Text style={styles.sectionTitle}>Shipment Information</Text>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Tracking ID:</Text>
                    <Text style={styles.infoValue}>{shipment.id}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Service Type:</Text>
                    <Text style={styles.infoValue}>{shipment.type}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Status:</Text>
                    <Text style={styles.infoValue}>{shipment.status}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Destination:</Text>
                    <Text style={styles.infoValue}>{shipment.destination}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Est. Delivery:</Text>
                    <Text style={styles.infoValue}>{shipment.estimatedDelivery}</Text>
                  </View>
                </View>

                <View style={styles.managerInfo}>
                  <View style={styles.managerAvatar}>
                    <Icon name="person" size={24} color="#fff" />
                  </View>
                  <View style={styles.managerDetails}>
                    <Text style={styles.managerName}>{shipment.manager}</Text>
                    <Text style={styles.managerRole}>Delivery Manager</Text>
                  </View>
                </View>
              </>
            )}
          </ScrollView>

          <TouchableOpacity style={styles.chatButton} onPress={handleLiveChat}>
            <Icon name="chat" size={24} color="#fff" />
            <Text style={styles.chatButtonText}>Live Chat with Support</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Dark map style for better visibility in dark mode
const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
];

export default ShipmentDetailModal;