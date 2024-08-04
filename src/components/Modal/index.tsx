import React, {PropsWithChildren, useRef} from 'react';
import {
  Modal as RNModal,
  Dimensions,
  ModalProps,
  View,
  ViewStyle,
  Platform,
  Text,
} from 'react-native';
import {
  ScrollView,
  GestureDetector,
  Gesture,
  GestureType,
} from 'react-native-gesture-handler';
import {useSharedValue, withSpring, runOnJS} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import HeaderBackButton from '@react-navigation/elements/src/Header/HeaderBackButton';

interface IModal extends ModalProps {
  onClose: () => void;
  headerTitle?: string;
  scrollEnabled?: boolean;
}

const {height: windowHeight} = Dimensions.get('window');
const CONTENT_BOTTOM_PADDING = windowHeight < 830 ? 86 : 70;

export function Modal({
  children,
  onClose,
  headerTitle,
  scrollEnabled,
  ...props
}: PropsWithChildren<IModal>) {
  const translateY = useSharedValue(0);
  const insets = useSafeAreaInsets();

  const simultaneousRef = useRef<GestureType | undefined>(undefined);
  const scrollViewRef = useRef<ScrollView | null>(null);

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      translateY.value = event.translationY;
    })
    .onEnd(event => {
      if (event.translationY > windowHeight / 4) {
        runOnJS(onClose)();
      } else {
        translateY.value = withSpring(0);
      }
    })
    .simultaneousWithExternalGesture(scrollViewRef)
    .withRef(simultaneousRef);

  const contentContainerStyle: ViewStyle = {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: Platform.select({
      ios: insets.bottom ?? CONTENT_BOTTOM_PADDING,
      android: CONTENT_BOTTOM_PADDING,
    }),
  };

  return (
    <RNModal
      animationType="slide"
      onRequestClose={onClose}
      presentationStyle="pageSheet"
      transparent={false}
      {...props}>
      <GestureDetector gesture={panGesture}>
        <View>
          <View>
            <View style={{marginRight: 4, flex: 0.5}}>
              <HeaderBackButton canGoBack onPress={onClose} />
            </View>
            <View style={{flex: 1}}>
              <Text numberOfLines={1}>{headerTitle}</Text>
            </View>
            <View style={{marginLeft: 4, flex: 0.5}} />
          </View>
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={contentContainerStyle}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled
            scrollEnabled={scrollEnabled}
            simultaneousHandlers={simultaneousRef}>
            {children}
          </ScrollView>
        </View>
      </GestureDetector>
    </RNModal>
  );
}
