import React, {Button, StyleSheet, View} from 'react-native';
import {SafeScreen} from '../../components/SafeScreen';
import {useSharedValue} from 'react-native-reanimated';
import {AccordionItem} from '../../components/Accordion';

function Item() {
  return <View style={styles.box} />;
}

function Parent({open}) {
  return (
    <View style={styles.parent}>
      <AccordionItem isExpanded={open} viewKey="Accordion">
        <Item />
      </AccordionItem>
    </View>
  );
}

export function Profile() {
  const open = useSharedValue(false);
  const onPress = () => {
    open.value = !open.value;
  };

  return (
    <SafeScreen>
      <View style={styles.buttonContainer}>
        <Button onPress={onPress} title="Click me" />
      </View>

      <View style={styles.content}>
        <Parent open={open} />
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    paddingBottom: '1rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  parent: {
    width: 200,
  },
  box: {
    height: 120,
    width: 120,
    color: '#f8f9ff',
    backgroundColor: '#b58df1',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
