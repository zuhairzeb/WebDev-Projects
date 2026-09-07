import { createContext } from "react";
import type { ZoneId } from "../../world/zones";
export const ZoneContext = createContext<ZoneId | null>(null);
