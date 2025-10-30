// Reexport the native module. On web, it will be resolved to DecryptionmoduleModule.web.ts
// and on native platforms to DecryptionmoduleModule.ts
import {  EventSubscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to DecryptionModule.web.ts
// and on native platforms to DecryptionModule.ts
import DecryptionModule from './src/DecryptionmoduleModule';
import DecryptionModuleView from './src/DecryptionmoduleView';
import { ChangeEventPayload, DecryptionmoduleViewProps } from './src/Decryptionmodule.types';

export function adId(): string {
  return DecryptionModule.adId();
}
