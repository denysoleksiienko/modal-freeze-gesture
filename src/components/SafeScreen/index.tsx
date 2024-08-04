import React, {useMemo, type PropsWithChildren} from 'react';
import {ViewStyle} from 'react-native';
import {type Edge, SafeAreaView} from 'react-native-safe-area-context';

interface ISafeScreen {
  safeBottom?: boolean;
  safeTop?: boolean;
  backgroundColor?: ViewStyle['backgroundColor'];
}

export function SafeScreen({
  children,
  safeBottom = true,
  safeTop = true,
  backgroundColor = 'white',
}: PropsWithChildren<ISafeScreen>) {
  const edges = useMemo<Edge[]>(() => {
    const edgesArray: Edge[] = [];

    if (safeBottom) {
      edgesArray.push('bottom');
    }
    if (safeTop) {
      edgesArray.push('top');
    }

    return edgesArray;
  }, [safeBottom, safeTop]);

  return (
    <SafeAreaView edges={edges} style={{flex: 1, backgroundColor}}>
      {children}
    </SafeAreaView>
  );
}
