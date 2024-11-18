import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';
import { UserSettings } from './types';

export const saveSettings = async (settings: UserSettings): Promise<void> => {
  try {
    console.log('Saving settings', settings);
    await AsyncStorage.setItem('userSettings', JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
};

export const loadSettings = async (): Promise<UserSettings | null> => {
  try {
    const settings = await AsyncStorage.getItem('userSettings');
    if (settings) {
      return JSON.parse(settings);
    }
    const deviceLanguage = RNLocalize.getLocales()[0].languageCode;
    const supportedLanguage = ['en', 'vi'].includes(deviceLanguage) ? deviceLanguage : 'en';
    return {
      theme: 'light',
      language: supportedLanguage as 'en' | 'vi',
    };
  } catch (error) {
    console.error('Error loading settings:', error);
    return {
      theme: 'light',
      language: 'en',
    };
  }
};

export const removeSettings = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('userSettings');
  } catch (error) {
    console.error('Error removing settings:', error);
  }
};

export const updateSettings = async (newSettings: Partial<UserSettings>): Promise<void> => {
  const currentSettings = await loadSettings();
  const updatedSettings: UserSettings = {
    theme: newSettings.theme ?? currentSettings?.theme ?? 'light',
    language: newSettings.language ?? currentSettings?.language ?? 'en',
  };
  await saveSettings(updatedSettings);
}