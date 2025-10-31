import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

const colors = {
  primary: '#f20c00',
  white: '#ffffff',
  black: '#000000',
  gray: '#666666',
  lightGray: '#f5f5f5',
  darkGray: '#333333',
};

const App = () => {
  const [activeTab, setActiveTab] = React.useState('home');

  const renderHomeContent = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.sectionTitle}>Your Shipments</Text>

      <View style={styles.shipmentCard}>
        <View style={styles.shipmentHeader}>
          <Text style={styles.shipmentId}>PS001234</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>In Transit</Text>
          </View>
        </View>
        <Text style={styles.shipmentInfo}>📍 Central, Hong Kong</Text>
        <Text style={styles.shipmentInfo}>📅 Est. Delivery: 2024-01-15</Text>
        <Text style={styles.shipmentInfo}>📦 Pin-ship (3-7 days)</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '65%' }]} />
        </View>
      </View>

      <View style={styles.shipmentCard}>
        <View style={styles.shipmentHeader}>
          <Text style={styles.shipmentId}>SP005678</Text>
          <View style={[styles.statusBadge, { backgroundColor: '#4CAF50' }]}>
            <Text style={styles.statusText}>Delivered</Text>
          </View>
        </View>
        <Text style={styles.shipmentInfo}>📍 Causeway Bay, HK</Text>
        <Text style={styles.shipmentInfo}>📅 Delivered: 2024-01-12</Text>
        <Text style={styles.shipmentInfo}>📦 Speed Post (1-3 days)</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '100%', backgroundColor: '#4CAF50' }]} />
        </View>
      </View>
    </View>
  );

  const renderShipContent = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.sectionTitle}>Ship Your Package</Text>

      <TouchableOpacity style={styles.optionCard}>
        <Text style={styles.optionTitle}>🏙️ Local Shipping</Text>
        <Text style={styles.optionSubtitle}>Hong Kong Local Delivery</Text>
        <View style={styles.optionFeatures}>
          <Text style={styles.featureText}>✓ Pin-ship (3-7 days)</Text>
          <Text style={styles.featureText}>✓ Speed Post (1-3 days)</Text>
          <Text style={styles.featureText}>✓ Real-time Tracking</Text>
        </View>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Select Local Shipping</Text>
        </View>
      </TouchableOpacity>

      <View style={[styles.optionCard, { opacity: 0.6 }]}>
        <Text style={styles.optionTitle}>✈️ Overseas Shipping</Text>
        <Text style={styles.optionSubtitle}>International Delivery</Text>
        <View style={styles.optionFeatures}>
          <Text style={[styles.featureText, { color: colors.gray }]}>• 200+ Countries</Text>
          <Text style={[styles.featureText, { color: colors.gray }]}>• Customs Support</Text>
          <Text style={[styles.featureText, { color: colors.gray }]}>• Best Rates</Text>
        </View>
        <View style={[styles.button, { backgroundColor: colors.gray }]}>
          <Text style={styles.buttonText}>Coming Soon</Text>
        </View>
      </View>
    </View>
  );

  const renderProfileContent = () => (
    <View style={styles.contentContainer}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>JD</Text>
        </View>
        <Text style={styles.profileName}>John Doe</Text>
        <Text style={styles.profileEmail}>john.doe@example.com</Text>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.settingsTitle}>Account Settings</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>👤 Personal Information</Text>
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>💳 Billing ID: HK-2024-001234</Text>
        </View>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.settingsTitle}>Preferences</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>🌐 Language: English</Text>
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>🌙 Theme: Light Mode</Text>
        </View>
      </View>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#F44336', marginTop: 20 }]}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>PinShip</Text>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'home' && renderHomeContent()}
        {activeTab === 'ship' && renderShipContent()}
        {activeTab === 'profile' && renderProfileContent()}
      </ScrollView>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('home')}
        >
          <Text style={[styles.tabText, activeTab === 'home' && styles.activeTabText]}>
            🏠 Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('ship')}
        >
          <Text style={[styles.tabText, activeTab === 'ship' && styles.activeTabText]}>
            📦 Ship
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setActiveTab('profile')}
        >
          <Text style={[styles.tabText, activeTab === 'profile' && styles.activeTabText]}>
            👤 Profile
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    backgroundColor: colors.primary,
    padding: 16,
    alignItems: 'center',
  },
  headerTitle: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 16,
  },
  shipmentCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  shipmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  shipmentId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  statusBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  shipmentInfo: {
    fontSize: 14,
    color: colors.gray,
    marginVertical: 2,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  optionCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 12,
  },
  optionFeatures: {
    marginBottom: 16,
  },
  featureText: {
    fontSize: 13,
    color: colors.black,
    marginVertical: 2,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: colors.white,
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: colors.gray,
  },
  settingsSection: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  settingsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  settingItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  settingLabel: {
    fontSize: 16,
    color: colors.black,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingVertical: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabText: {
    fontSize: 14,
    color: colors.gray,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default App;