import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../styles/colors';
import LocalShippingModal from '../components/LocalShippingModal';

const { width } = Dimensions.get('window');

const ShipScreen = () => {
  const { isDarkMode } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleLocalPress = () => {
    setModalVisible(true);
  };

  const handleOverseasPress = () => {
    // Will be implemented in future
    alert('Overseas shipping coming soon!');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? colors.dark.background : colors.light.background,
    },
    header: {
      padding: 20,
      backgroundColor: isDarkMode ? colors.dark.card : colors.light.card,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? colors.dark.border : colors.light.border,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDarkMode ? colors.dark.text : colors.light.text,
      marginBottom: 5,
    },
    headerSubtitle: {
      fontSize: 14,
      color: isDarkMode ? colors.dark.textSecondary : colors.light.textSecondary,
    },
    optionsContainer: {
      flex: 1,
      padding: 20,
    },
    optionCard: {
      backgroundColor: isDarkMode ? colors.dark.card : colors.light.card,
      borderRadius: 16,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
      overflow: 'hidden',
    },
    optionImage: {
      width: '100%',
      height: 150,
      backgroundColor: colors.gray[200],
    },
    optionContent: {
      padding: 20,
    },
    optionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    optionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? colors.dark.text : colors.light.text,
    },
    optionBadge: {
      backgroundColor: colors.primary,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 12,
    },
    optionBadgeText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: 'bold',
    },
    comingSoonBadge: {
      backgroundColor: colors.gray[500],
    },
    optionDescription: {
      fontSize: 14,
      color: isDarkMode ? colors.dark.textSecondary : colors.light.textSecondary,
      marginBottom: 15,
      lineHeight: 20,
    },
    optionFeatures: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 15,
    },
    featureTag: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDarkMode ? colors.dark.inputBackground : colors.light.inputBackground,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 15,
      marginRight: 10,
      marginBottom: 10,
    },
    featureIcon: {
      marginRight: 5,
    },
    featureText: {
      fontSize: 12,
      color: isDarkMode ? colors.dark.text : colors.light.text,
    },
    selectButton: {
      backgroundColor: colors.primary,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    selectButtonDisabled: {
      backgroundColor: colors.gray[400],
    },
    selectButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 10,
    },
    localIcon: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: 'rgba(242, 12, 0, 0.9)',
      width: 50,
      height: 50,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
    },
    overseasIcon: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: 'rgba(128, 128, 128, 0.9)',
      width: 50,
      height: 50,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
    },
    gradientOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 60,
      backgroundColor: 'rgba(0,0,0,0.3)',
      justifyContent: 'center',
      paddingHorizontal: 15,
    },
    overlayText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ship Your Package</Text>
        <Text style={styles.headerSubtitle}>Choose your shipping destination</Text>
      </View>

      <ScrollView style={styles.optionsContainer}>
        {/* Local Shipping Option */}
        <TouchableOpacity
          style={styles.optionCard}
          activeOpacity={0.8}
          onPress={handleLocalPress}
        >
          <View style={styles.optionImage}>
            <View style={styles.localIcon}>
              <Icon name="location-city" size={24} color="#fff" />
            </View>
            <View style={styles.gradientOverlay}>
              <Text style={styles.overlayText}>Hong Kong Local Delivery</Text>
            </View>
          </View>

          <View style={styles.optionContent}>
            <View style={styles.optionHeader}>
              <Text style={styles.optionTitle}>Local Shipping</Text>
              <View style={styles.optionBadge}>
                <Text style={styles.optionBadgeText}>AVAILABLE</Text>
              </View>
            </View>

            <Text style={styles.optionDescription}>
              Fast and reliable shipping within Hong Kong. Multiple service options to suit your needs.
            </Text>

            <View style={styles.optionFeatures}>
              <View style={styles.featureTag}>
                <Icon name="check-circle" size={14} color={colors.success} style={styles.featureIcon} />
                <Text style={styles.featureText}>Same Day Available</Text>
              </View>
              <View style={styles.featureTag}>
                <Icon name="check-circle" size={14} color={colors.success} style={styles.featureIcon} />
                <Text style={styles.featureText}>Real-time Tracking</Text>
              </View>
              <View style={styles.featureTag}>
                <Icon name="check-circle" size={14} color={colors.success} style={styles.featureIcon} />
                <Text style={styles.featureText}>Insurance Included</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.selectButton}
              onPress={handleLocalPress}
            >
              <Icon name="local-shipping" size={20} color="#fff" />
              <Text style={styles.selectButtonText}>Select Local Shipping</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        {/* Overseas Shipping Option */}
        <TouchableOpacity
          style={[styles.optionCard, { opacity: 0.7 }]}
          activeOpacity={0.8}
          onPress={handleOverseasPress}
        >
          <View style={styles.optionImage}>
            <View style={styles.overseasIcon}>
              <Icon name="flight" size={24} color="#fff" />
            </View>
            <View style={styles.gradientOverlay}>
              <Text style={styles.overlayText}>International Delivery</Text>
            </View>
          </View>

          <View style={styles.optionContent}>
            <View style={styles.optionHeader}>
              <Text style={styles.optionTitle}>Overseas Shipping</Text>
              <View style={[styles.optionBadge, styles.comingSoonBadge]}>
                <Text style={styles.optionBadgeText}>COMING SOON</Text>
              </View>
            </View>

            <Text style={styles.optionDescription}>
              Ship your packages worldwide with competitive rates and reliable partners.
            </Text>

            <View style={styles.optionFeatures}>
              <View style={styles.featureTag}>
                <Icon name="public" size={14} color={colors.gray[500]} style={styles.featureIcon} />
                <Text style={styles.featureText}>200+ Countries</Text>
              </View>
              <View style={styles.featureTag}>
                <Icon name="security" size={14} color={colors.gray[500]} style={styles.featureIcon} />
                <Text style={styles.featureText}>Customs Support</Text>
              </View>
              <View style={styles.featureTag}>
                <Icon name="attach-money" size={14} color={colors.gray[500]} style={styles.featureIcon} />
                <Text style={styles.featureText}>Best Rates</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.selectButton, styles.selectButtonDisabled]}
              onPress={handleOverseasPress}
              disabled={true}
            >
              <Icon name="notifications" size={20} color="#fff" />
              <Text style={styles.selectButtonText}>Notify Me</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <LocalShippingModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        isDarkMode={isDarkMode}
      />
    </View>
  );
};

export default ShipScreen;