import { ThemeInterface } from "@kim-doan/wdyj-design-system-web";

import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme extends ThemeInterface {}
}
