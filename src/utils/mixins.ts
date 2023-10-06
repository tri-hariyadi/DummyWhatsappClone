import {PixelRatio, ViewStyle} from 'react-native';
import normalizeDimens from './normalizeDimens';

export const scaleFont = (size: number) => size * PixelRatio.getFontScale();

const dimensions = (top: number, right = top, bottom = top, left = right, property: 'margin' | 'padding') => {
    let styles: ViewStyle = {};

    styles[`${property}Top`] = normalizeDimens(top);
    styles[`${property}Right`] = normalizeDimens(right);
    styles[`${property}Bottom`] = normalizeDimens(bottom);
    styles[`${property}Left`] = normalizeDimens(left);

    return styles;
};

export const margin = (top: number, right?: number, bottom?: number, left?: number) => {
    return dimensions(top, right, bottom, left, 'margin');
};

export const padding = (top: number, right?: number, bottom?: number, left?: number) => {
    return dimensions(top, right, bottom, left, 'padding');
};

export const dimens = <T extends ViewStyle>(width: number, height = width): T => {
    let styles = {} as T;
    styles.width = normalizeDimens(width);
    styles.height = normalizeDimens(height);

    return styles;
};

export const rounded = <T extends ViewStyle>(
    borderTopLeftRadius: number,
    borderTopRightRadius = borderTopLeftRadius,
    borderBottomLeftRadius = borderTopLeftRadius,
    borderBottomRightRadius = borderTopLeftRadius,
): T => {
    let styles = {} as T;

    if (
        borderTopLeftRadius === borderTopRightRadius &&
        borderTopLeftRadius === borderBottomLeftRadius &&
        borderTopLeftRadius === borderBottomRightRadius
    ) {
        styles.borderRadius = normalizeDimens(borderTopLeftRadius);
        return styles;
    }

    styles.borderTopLeftRadius = normalizeDimens(borderTopLeftRadius);
    styles.borderTopRightRadius = normalizeDimens(borderTopRightRadius);
    styles.borderBottomLeftRadius = normalizeDimens(borderBottomLeftRadius);
    styles.borderBottomRightRadius = normalizeDimens(borderBottomRightRadius);

    return styles;
};
