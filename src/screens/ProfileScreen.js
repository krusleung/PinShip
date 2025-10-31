import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-picker';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../styles/colors';

const ProfileScreen = () => {
  const { isDarkMode, setIsDarkMode } = useTheme();
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+852 9123 4567',
    avatar: null,
    billingId: 'HK-2024-001234',
  });
  const [language, setLanguage] = useState('en');
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const [editingBilling, setEditingBilling] = useState(false);
  const [tempBillingId, setTempBillingId] = useState(userProfile.billingId);

  const languages = [
    { code: 'zh', name: '繁體中文' },
    { code: 'cn', name: '簡體中文' },
    { code: 'en', name: 'English' },
  ];

  const handleThemeToggle = async (value) => {
    setIsDarkMode(value);
    await AsyncStorage.setItem('theme', value ? 'dark' : 'light');
  };

  const handleAvatarChange = () => {
    Alert.alert(
      'Change Avatar',
      'Choose an option',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Choose from Gallery',
          onPress: () => {
            const options = {
              mediaType: 'photo',
              includeBase64: false,
              maxHeight: 200,
              maxWidth: 200,
            };

            ImagePicker.launchImageLibrary(options, (response) => {
              if (response.assets && response.assets[0]) {
                setUserProfile({ ...userProfile, avatar: response.assets[0].uri });
              }
            });
          }
        },
        {
          text: 'Take Photo',
          onPress: () => {
            const options = {
              mediaType: 'photo',
              includeBase64: false,
              maxHeight: 200,
              maxWidth: 200,
            };

            ImagePicker.launchCamera(options, (response) => {
              if (response.assets && response.assets[0]) {
                setUserProfile({ ...userProfile, avatar: response.assets[0].uri });
              }
            });
          }
        },
      ]
    );
  };

  const handleLanguageChange = async (langCode) => {
    setLanguage(langCode);
    setShowLanguageOptions(false);
    await AsyncStorage.setItem('language', langCode);
    Alert.alert('Language Changed', `Language set to ${languages.find(l => l.code === langCode).name}`);
  };

  const handleBillingIdSave = () => {
    setUserProfile({ ...userProfile, billingId: tempBillingId });
    setEditingBilling(false);
    Alert.alert('Success', 'Billing ID updated successfully');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.clear();
            Alert.alert('Logged Out', 'You have been logged out successfully');
          }
        }
      ]
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? colors.dark.background : colors.light.background,
    },
    profileHeader: {
      backgroundColor: colors.primary,
      paddingTop: 40,
      paddingBottom: 30,
      alignItems: 'center',
    },
    avatarContainer: {
      position: 'relative',
      marginBottom: 15,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    avatarEditButton: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: colors.primaryDark,
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      borderColor: '#fff',
    },
    userName: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 5,
    },
    userEmail: {
      fontSize: 14,
      color: '#ffcccc',
    },
    settingsSection: {
      backgroundColor: isDarkMode ? colors.dark.card : colors.light.card,
      marginVertical: 10,
      marginHorizontal: 15,
      borderRadius: 12,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.05,
      shadowRadius: 3.84,
      elevation: 2,
    },
    sectionHeader: {
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? colors.dark.border : colors.light.border,
    },
    sectionTitle: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.primary,
      textTransform: 'uppercase',
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? colors.dark.border : colors.light.border,
    },
    settingItemNoBorder: {
      borderBottomWidth: 0,
    },
    settingLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    settingIcon: {
      width: 36,
      height: 36,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
    },
    settingInfo: {
      flex: 1,
    },
    settingLabel: {
      fontSize: 16,
      color: isDarkMode ? colors.dark.text : colors.light.text,
      marginBottom: 2,
    },
    settingValue: {
      fontSize: 13,
      color: isDarkMode ? colors.dark.textSecondary : colors.light.textSecondary,
    },
    languageModal: {
      position: 'absolute',
      top: 0,
      right: 20,
      backgroundColor: isDarkMode ? colors.dark.card : colors.light.card,
      borderRadius: 8,
      paddingVertical: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      zIndex: 1000,
    },
    languageOption: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 10,
    },
    languageFlag: {
      fontSize: 20,
      marginRight: 10,
    },
    languageName: {
      fontSize: 14,
      color: isDarkMode ? colors.dark.text : colors.light.text,
    },
    selectedLanguage: {
      backgroundColor: isDarkMode ? colors.dark.inputBackground : colors.light.inputBackground,
    },
    billingInput: {
      backgroundColor: isDarkMode ? colors.dark.inputBackground : colors.light.inputBackground,
      borderRadius: 8,
      padding: 8,
      fontSize: 14,
      color: isDarkMode ? colors.dark.text : colors.light.text,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    saveButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: 6,
    },
    saveButtonText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: 'bold',
    },
    logoutButton: {
      backgroundColor: colors.error,
      marginHorizontal: 15,
      marginVertical: 20,
      paddingVertical: 15,
      borderRadius: 12,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    logoutButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 10,
    },
    versionText: {
      textAlign: 'center',
      fontSize: 12,
      color: isDarkMode ? colors.dark.textSecondary : colors.light.textSecondary,
      marginBottom: 20,
    },
  });

  const currentLanguage = languages.find(l => l.code === language);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <TouchableOpacity style={styles.avatarContainer} onPress={handleAvatarChange}>
            <View style={styles.avatar}>
              {userProfile.avatar ? (
                <Image source={{ uri: userProfile.avatar }} style={styles.avatarImage} />
              ) : (
                <Icon name="person" size={50} color={colors.gray[400]} />
              )}
            </View>
            <View style={styles.avatarEditButton}>
              <Icon name="camera-alt" size={18} color="#fff" />
            </View>
          </TouchableOpacity>
          <Text style={styles.userName}>{userProfile.name}</Text>
          <Text style={styles.userEmail}>{userProfile.email}</Text>
        </View>

        {/* Account Settings */}
        <View style={styles.settingsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Account Settings</Text>
          </View>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: colors.secondary }]}>
                <Icon name="person" size={20} color="#fff" />
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Personal Information</Text>
                <Text style={styles.settingValue}>Update your details</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={24} color={colors.gray[400]} />
          </TouchableOpacity>

          <View style={[styles.settingItem, styles.settingItemNoBorder]}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: colors.warning }]}>
                <Icon name="credit-card" size={20} color="#fff" />
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Billing ID</Text>
                {editingBilling ? (
                  <TextInput
                    style={styles.billingInput}
                    value={tempBillingId}
                    onChangeText={setTempBillingId}
                    autoFocus
                  />
                ) : (
                  <Text style={styles.settingValue}>{userProfile.billingId}</Text>
                )}
              </View>
            </View>
            {editingBilling ? (
              <TouchableOpacity style={styles.saveButton} onPress={handleBillingIdSave}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => {
                setEditingBilling(true);
                setTempBillingId(userProfile.billingId);
              }}>
                <Icon name="edit" size={20} color={colors.gray[400]} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Preferences */}
        <View style={styles.settingsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Preferences</Text>
          </View>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => setShowLanguageOptions(!showLanguageOptions)}
          >
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: colors.success }]}>
                <Icon name="language" size={20} color="#fff" />
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Language</Text>
                <Text style={styles.settingValue}>
                  {currentLanguage?.name}
                </Text>
              </View>
            </View>
            <Icon name="chevron-right" size={24} color={colors.gray[400]} />
          </TouchableOpacity>

          {showLanguageOptions && (
            <View style={styles.languageModal}>
              {languages.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  style={[
                    styles.languageOption,
                    language === lang.code && styles.selectedLanguage,
                  ]}
                  onPress={() => handleLanguageChange(lang.code)}
                >
                  <Text style={styles.languageName}>{lang.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View style={[styles.settingItem, styles.settingItemNoBorder]}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: colors.primary }]}>
                <Icon name={isDarkMode ? 'dark-mode' : 'light-mode'} size={20} color="#fff" />
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Dark Mode</Text>
                <Text style={styles.settingValue}>
                  {isDarkMode ? 'Enabled' : 'Disabled'}
                </Text>
              </View>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={handleThemeToggle}
              trackColor={{ false: colors.gray[300], true: colors.primary }}
              thumbColor={isDarkMode ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Support */}
        <View style={styles.settingsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Support</Text>
          </View>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: colors.secondary }]}>
                <Icon name="help" size={20} color="#fff" />
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>Help Center</Text>
                <Text style={styles.settingValue}>Get support and FAQs</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={24} color={colors.gray[400]} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingItem, styles.settingItemNoBorder]}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: colors.success }]}>
                <Icon name="info" size={20} color="#fff" />
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>About</Text>
                <Text style={styles.settingValue}>Terms & Privacy Policy</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={24} color={colors.gray[400]} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="logout" size={20} color="#fff" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>PinShip v1.0.0</Text>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;