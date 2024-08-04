import React, { Button, Text } from 'react-native';
import { SafeScreen } from '../../components/SafeScreen';
import { useState } from 'react';
import { Modal } from '../../components/Modal';

export function Home() {
  const [visible, setVisible] = useState(false);
  return (
    <SafeScreen>
      <Button title={'open modal'} onPress={() => setVisible(true)} />
      {visible && (
        <Modal visible={visible} onClose={() => setVisible(false)}>
          <Text>Modal</Text>
        </Modal>
      )}
    </SafeScreen>
  );
}
