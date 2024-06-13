// Utilities
import { defineStore } from "pinia";
import MobileDetect from 'mobile-detect';
import { computed, ComputedRef, Ref, ref } from "vue";

export type DeviceStore = {
  deviceInfo: Ref<string>;

  isIpad: ComputedRef<boolean>;
  isIphone: ComputedRef<boolean>;
  isMobile: ComputedRef<boolean>;
  isTablet: ComputedRef<boolean>;
  isDesktop: ComputedRef<boolean>;

  setDeviceInfo(): void;
}

export const useDeviceStore = defineStore<'device', DeviceStore>('device',
  () => {
  const deviceInfo = ref<string>('');
  const userAgentAllowSettingRequestDesktopWebsite = deviceInfo.value.toLowerCase();

  const deviceDetectInfo = computed<MobileDetect>(() => new MobileDetect(deviceInfo.value))

  const isIphone = computed(() => {
    return (
      userAgentAllowSettingRequestDesktopWebsite.indexOf('ipad') > -1 ||
      userAgentAllowSettingRequestDesktopWebsite.indexOf('iphone') > -1 ||
      (
        'ontouchend' in document &&
        userAgentAllowSettingRequestDesktopWebsite.indexOf('macintosh') > -1
      )
    )}
  );

  const isIpad = computed(() => {
    return (
      userAgentAllowSettingRequestDesktopWebsite.indexOf('ipad') > -1 ||
      (
        'ontouchend' in document &&
        userAgentAllowSettingRequestDesktopWebsite.indexOf('macintosh') > -1
      )
    )}
  );

  const isTablet = computed(() => !!deviceDetectInfo.value.tablet() || isIpad.value);
  const isMobile = computed(() => !isTablet.value && (!!deviceDetectInfo.value.phone() || isIphone.value));
  const isDesktop = computed(() => !isTablet.value && !isMobile.value);

  const setDeviceInfo = (): void => {
    deviceInfo.value = window.navigator.userAgent;
  };

  return {
    deviceInfo,

    isIpad,
    isIphone,
    isMobile,
    isTablet,
    isDesktop,

    setDeviceInfo,
  }
})

export const deviceStorePlugin = () => {
  const deviceStore = useDeviceStore();

  deviceStore.setDeviceInfo();
}