import 'styled-components';
import { YDSTheme } from '@yourssu/design-system-react';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends YDSTheme {}
}
