import React, {useMemo, useState} from 'react';
import {ActivityIndicator, ImageURISource, StyleSheet, ViewStyle, View} from 'react-native';
import FastImage, {ImageStyle, OnLoadEvent, ResizeMode} from 'react-native-fast-image';

import {NoImage} from 'assets/images';
import {colors} from 'utils';
import {dimens, rounded} from 'utils/mixins';

type Props = {
    testID?: string;
    style?: ViewStyle;
    source?: ImageURISource;
    resizeMode?: ResizeMode;
    onLoad?: (_event: OnLoadEvent) => void;
};

const ProgressiveImage: React.FC<Props> = ({testID, style, onLoad, source, resizeMode = 'cover'}) => {
    const [imageState, setImageState] = useState({loading: true, error: false});

    const sourceImage = useMemo(() => {
        if (imageState.error || !source || !source.uri) {
            if (source && Object.keys(source)[0] === 'uri') return NoImage;
            return source;
        }

        return {
            ...source,
            priority: FastImage.priority.low,
            cache: FastImage.cacheControl.immutable,
        };
    }, [imageState.error, source]);

    const customRounded = useMemo(() => {
        if (style) {
            if (StyleSheet.flatten(style).width && StyleSheet.flatten(style).height) {
                return {...rounded<ImageStyle>((StyleSheet.flatten(style).width as number) / 2)};
            }
        }
        return {};
    }, [style]);

    return (
        <View style={[styles.container, style]}>
            {!imageState.error ? (
                <FastImage
                    testID={testID}
                    accessible={true}
                    accessibilityLabel={testID}
                    source={sourceImage}
                    style={[styles.imageBackground, customRounded]}
                    onLoad={event => {
                        if (onLoad) onLoad(event);
                    }}
                    onLoadEnd={() => setImageState(prev => ({...prev, loading: false}))}
                    onError={() => {
                        setImageState({error: true, loading: false});
                    }}
                    resizeMode={resizeMode}
                />
            ) : (
                <FastImage resizeMode="cover" style={[styles.imageBackground, customRounded]} source={NoImage} />
            )}
            {imageState.loading && (
                <View style={styles.loaderStyle}>
                    <ActivityIndicator color={colors.teal} size="small" />
                </View>
            )}
        </View>
    );
};

export default React.memo(ProgressiveImage, (prevProps, nextProps) => {
    if (prevProps.source === nextProps.source && Object.keys(prevProps).length === Object.keys(nextProps).length) {
        return true;
    }
    return false;
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.progressiveImageBg,
        ...dimens(60),
        ...rounded(60 / 2),
    },
    imageBackground: {
        ...rounded<ImageStyle>(60 / 2),
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.progressiveImageBg,
    },
    loaderStyle: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
});
