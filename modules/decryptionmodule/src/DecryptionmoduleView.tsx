import { requireNativeView } from 'expo';
import * as React from 'react';

import { DecryptionmoduleViewProps } from './Decryptionmodule.types';

const NativeView: React.ComponentType<DecryptionmoduleViewProps> =
  requireNativeView('Decryptionmodule');

export default function DecryptionmoduleView(props: DecryptionmoduleViewProps) {
  return <NativeView {...props} />;
}
