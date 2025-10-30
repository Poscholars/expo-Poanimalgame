import * as React from 'react';

import { DecryptionmoduleViewProps } from './Decryptionmodule.types';

export default function DecryptionmoduleView(props: DecryptionmoduleViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
