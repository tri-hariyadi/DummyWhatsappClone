import React from 'react';
import {View, ViewStyle} from 'react-native';

type Props = {
    testID?: string;
    children?: React.ReactNode;
    style?: ViewStyle | Array<ViewStyle | undefined> | undefined;
    justifyStart?: boolean;
    justifyEnd?: boolean;
    justifyCenter?: boolean;
    justifyBetween?: boolean;
    justifyAround?: boolean;
    justifyEvently?: boolean;
    itemsStart?: boolean;
    itemsEnd?: boolean;
    itemsCenter?: boolean;
    itemsBaseline?: boolean;
    itemsStretch?: boolean;
    flex?: number;
};

const Row: React.FC<Props> = props => {
    const {
        testID,
        children,
        style,
        justifyStart,
        justifyEnd,
        justifyCenter,
        justifyBetween,
        justifyAround,
        justifyEvently,
        itemsStart,
        itemsEnd,
        itemsCenter,
        itemsBaseline,
        itemsStretch,
        flex,
    } = props;

    const rowStyle = React.useMemo(() => {
        const rStyle: ViewStyle = {
            flexDirection: 'row',
        };
        if (justifyStart) rStyle.justifyContent = 'flex-start';
        if (justifyEnd) rStyle.justifyContent = 'flex-end';
        if (justifyCenter) rStyle.justifyContent = 'center';
        if (justifyBetween) rStyle.justifyContent = 'space-between';
        if (justifyAround) rStyle.justifyContent = 'space-around';
        if (justifyEvently) rStyle.justifyContent = 'space-evenly';

        if (itemsStart) rStyle.alignItems = 'flex-start';
        if (itemsEnd) rStyle.alignItems = 'flex-end';
        if (itemsCenter) rStyle.alignItems = 'center';
        if (itemsBaseline) rStyle.alignItems = 'baseline';
        if (itemsStretch) rStyle.alignItems = 'stretch';
        if (flex) rStyle.flex = flex;
        return rStyle;
    }, [props]);

    return (
        <View testID={testID} style={[rowStyle, style]}>
            {children}
        </View>
    );
};

export default React.memo(Row);
