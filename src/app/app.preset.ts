import { definePreset, palette } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const AppPreset = definePreset(Aura, {
    semantic: {
        colorScheme: {
            light: {
                primary: palette('#2878AD'),
            },
            dark: {
                primary: palette('#000000')
            }
        }
    }
});