import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../styles/colors';

const { width } = Dimensions.get('window');

const LocalShippingModal = ({ visible, onClose, isDarkMode }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [senderInfo, setSenderInfo] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [receiverInfo, setReceiverInfo] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [packageInfo, setPackageInfo] = useState({
    weight: '',
    description: '',
  });

  const shippingOptions = [
    {
      id: 'pinship',
      name: 'Pin-ship',
      duration: '3-7 days',
      price: 'HK$38',
      icon: 'local-shipping',
      color: colors.primary,
      features: [
        'Economic option',
        'Tracking available',
        'Insurance up to HK$500',
        'Signature required',
      ],
    },
    {
      id: 'speedpost',
      name: 'Speed Post',
      duration: '1-3 days',
      price: 'HK$68',
      icon: 'flash-on',
      color: colors.warning,
      features: [
        'Express delivery',
        'Priority handling',
        'Insurance up to HK$1000',
        'Real-time tracking',
      ],
    },
  ];

  const handleSubmit = () => {
    if (!selectedService) {
      Alert.alert('Error', 'Please select a shipping service');
      return;
    }
    if (!senderInfo.name || !senderInfo.phone || !senderInfo.address) {
      Alert.alert('Error', 'Please fill in all sender information');
      return;
    }
    if (!receiverInfo.name || !receiverInfo.phone || !receiverInfo.address) {
      Alert.alert('Error', 'Please fill in all receiver information');
      return;
    }
    if (!packageInfo.weight || !packageInfo.description) {
      Alert.alert('Error', 'Please fill in package details');
      return;
    }

    Alert.alert(
      'Shipment Created',
      `Your ${selectedService === 'pinship' ? 'Pin-ship' : 'Speed Post'} order has been created successfully!`,
      [
        {
          text: 'OK',
          onPress: () => {
            onClose();
            // Reset form
            setSelectedService(null);
            setSenderInfo({ name: '', phone: '', address: '' });
            setReceiverInfo({ name: '', phone: '', address: '' });
            setPackageInfo({ weight: '', description: '' });
          },
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
      color: isDarkMode ? colors.dark.text : colors.light.text,
    },
    closeButton: {
      padding: 5,
    },
    scrollContent: {
      padding: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? colors.dark.text : colors.light.text,
      marginBottom: 15,
      marginTop: 10,
    },
    serviceOptionsContainer: {
      marginBottom: 20,
    },
    serviceOption: {
      backgroundColor: isDarkMode ? colors.dark.card : colors.light.card,
      borderRadius: 12,
      padding: 15,
      marginBottom: 15,
      borderWidth: 2,
      borderColor: 'transparent',
    },
    selectedService: {
      borderColor: colors.primary,
    },
    serviceHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    serviceInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    serviceIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    serviceDetails: {
      flex: 1,
    },
    serviceName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? colors.dark.text : colors.light.text,
    },
    serviceDuration: {
      fontSize: 14,
      color: isDarkMode ? colors.dark.textSecondary : colors.light.textSecondary,
    },
    servicePrice: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.primary,
    },
    serviceFeatures: {
      marginTop: 10,
    },
    featureItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 3,
    },
    featureText: {
      fontSize: 12,
      color: isDarkMode ? colors.dark.textSecondary : colors.light.textSecondary,
      marginLeft: 8,
    },
    formSection: {
      marginBottom: 20,
    },
    inputContainer: {
      marginBottom: 15,
    },
    inputLabel: {
      fontSize: 14,
      color: isDarkMode ? colors.dark.textSecondary : colors.light.textSecondary,
      marginBottom: 5,
    },
    input: {
      backgroundColor: isDarkMode ? colors.dark.inputBackground : colors.light.inputBackground,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      color: isDarkMode ? colors.dark.text : colors.light.text,
      borderWidth: 1,
      borderColor: isDarkMode ? colors.dark.border : colors.light.border,
    },
    inputMultiline: {
      height: 80,
      textAlignVertical: 'top',
    },
    bottomContainer: {
      padding: 20,
      backgroundColor: isDarkMode ? colors.dark.card : colors.light.card,
      borderTopWidth: 1,
      borderTopColor: isDarkMode ? colors.dark.border : colors.light.border,
    },
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
    },
    totalLabel: {
      fontSize: 16,
      color: isDarkMode ? colors.dark.text : colors.light.text,
    },
    totalPrice: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.primary,
    },
    submitButton: {
      backgroundColor: colors.primary,
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    submitButtonDisabled: {
      backgroundColor: colors.gray[400],
    },
    submitButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
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
            <Text style={styles.headerTitle}>Local Shipping</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Icon
                name="close"
                size={24}
                color={isDarkMode ? colors.dark.text : colors.light.text}
              />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionTitle}>Select Service</Text>
            <View style={styles.serviceOptionsContainer}>
              {shippingOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.serviceOption,
                    selectedService === option.id && styles.selectedService,
                  ]}
                  onPress={() => setSelectedService(option.id)}
                >
                  <View style={styles.serviceHeader}>
                    <View style={styles.serviceInfo}>
                      <View style={[styles.serviceIcon, { backgroundColor: option.color }]}>
                        <Icon name={option.icon} size={20} color="#fff" />
                      </View>
                      <View style={styles.serviceDetails}>
                        <Text style={styles.serviceName}>{option.name}</Text>
                        <Text style={styles.serviceDuration}>{option.duration}</Text>
                      </View>
                    </View>
                    <Text style={styles.servicePrice}>{option.price}</Text>
                  </View>
                  <View style={styles.serviceFeatures}>
                    {option.features.map((feature, index) => (
                      <View key={index} style={styles.featureItem}>
                        <Icon
                          name="check-circle"
                          size={14}
                          color={colors.success}
                        />
                        <Text style={styles.featureText}>{feature}</Text>
                      </View>
                    ))}
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Sender Information</Text>
            <View style={styles.formSection}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter sender name"
                  placeholderTextColor={isDarkMode ? colors.dark.textSecondary : colors.light.textSecondary}
                  value={senderInfo.name}
                  onChangeText={(text) => setSenderInfo({ ...senderInfo, name: text })}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter phone number"
                  placeholderTextColor={isDarkMode ? colors.dark.textSecondary : colors.light.textSecondary}
                  keyboardType="phone-pad"
                  value={senderInfo.phone}
                  onChangeText={(text) => setSenderInfo({ ...senderInfo, phone: text })}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Pickup Address</Text>
                <TextInput
                  style={[styles.input, styles.inputMultiline]}
                  placeholder="Enter complete address"
                  placeholderTextColor={isDarkMode ? colors.dark.textSecondary : colors.light.textSecondary}
                  multiline
                  value={senderInfo.address}
                  onChangeText={(text) => setSenderInfo({ ...senderInfo, address: text })}
                />
              </View>
            </View>

            <Text style={styles.sectionTitle}>Receiver Information</Text>
            <View style={styles.formSection}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter receiver name"
                  placeholderTextColor={isDarkMode ? colors.dark.textSecondary : colors.light.textSecondary}
                  value={receiverInfo.name}
                  onChangeText={(text) => setReceiverInfo({ ...receiverInfo, name: text })}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter phone number"
                  placeholderTextColor={isDarkMode ? colors.dark.textSecondary : colors.light.textSecondary}
                  keyboardType="phone-pad"
                  value={receiverInfo.phone}
                  onChangeText={(text) => setReceiverInfo({ ...receiverInfo, phone: text })}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Delivery Address</Text>
                <TextInput
                  style={[styles.input, styles.inputMultiline]}
                  placeholder="Enter complete address"
                  placeholderTextColor={isDarkMode ? colors.dark.textSecondary : colors.light.textSecondary}
                  multiline
                  value={receiverInfo.address}
                  onChangeText={(text) => setReceiverInfo({ ...receiverInfo, address: text })}
                />
              </View>
            </View>

            <Text style={styles.sectionTitle}>Package Details</Text>
            <View style={styles.formSection}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Weight (kg)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter package weight"
                  placeholderTextColor={isDarkMode ? colors.dark.textSecondary : colors.light.textSecondary}
                  keyboardType="numeric"
                  value={packageInfo.weight}
                  onChangeText={(text) => setPackageInfo({ ...packageInfo, weight: text })}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Package Description</Text>
                <TextInput
                  style={[styles.input, styles.inputMultiline]}
                  placeholder="Describe package contents"
                  placeholderTextColor={isDarkMode ? colors.dark.textSecondary : colors.light.textSecondary}
                  multiline
                  value={packageInfo.description}
                  onChangeText={(text) => setPackageInfo({ ...packageInfo, description: text })}
                />
              </View>
            </View>
          </ScrollView>

          <View style={styles.bottomContainer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Amount:</Text>
              <Text style={styles.totalPrice}>
                {selectedService === 'pinship' ? 'HK$38' : selectedService === 'speedpost' ? 'HK$68' : 'HK$0'}
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.submitButton,
                !selectedService && styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Create Shipment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LocalShippingModal;