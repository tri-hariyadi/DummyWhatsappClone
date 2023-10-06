import React from 'react';
import {View, ViewStyle} from 'react-native';

import {dimens} from 'utils/mixins';

type Props = {
    width?: number;
    height?: number;
    style?: ViewStyle;
};

const Gap: React.FC<Props> = ({width = 0, height = 0, style}) => {
    return <View style={[style, {...dimens(width, height)}]} />;
};

export default Gap;
