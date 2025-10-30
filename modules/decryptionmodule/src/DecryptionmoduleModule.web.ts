import { registerWebModule, NativeModule } from 'expo';

import { ChangeEventPayload } from './Decryptionmodule.types';

type DecryptionmoduleModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
}

class DecryptionmoduleModule extends NativeModule<DecryptionmoduleModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
};

export default registerWebModule(DecryptionmoduleModule, 'DecryptionmoduleModule');
