/**
 * Composition Registry
 *
 * This is the ONLY file you need to edit when adding a new composition.
 * Import its `compositionConfig` and add it to the array below.
 *
 * Root.tsx reads this array and auto-renders all <Composition> entries —
 * no manual changes to Root.tsx are needed.
 *
 * @example
 * // 1. Create src/compositions/MyVideo/index.tsx with a compositionConfig export
 * // 2. Import and add it here:
 * import { compositionConfig as MyVideo } from "./MyVideo";
 * export const compositionRegistry = [VietnamWar, MyVideo];
 */

import { CompositionConfig } from "./types";
import { compositionConfig as VietnamWar } from "./VietnamWar";
import { compositionConfig as IQTest } from "./IQTest";

export const compositionRegistry: CompositionConfig[] = [
    VietnamWar,
    IQTest,
];
