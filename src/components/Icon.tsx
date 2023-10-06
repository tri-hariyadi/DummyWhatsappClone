import React from 'react';
import {ColorValue, TextStyle} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Foundation from 'react-native-vector-icons/Foundation';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import normalizeDimens from 'utils/normalizeDimens';

interface IProps {
    type: string | undefined;
    name: string | undefined;
    style?: TextStyle | Array<TextStyle>;
    color?: ColorValue;
    size?: number;
}

export interface IIconType {
    mci: 'MaterialCommunityIcons';
    mi: 'MaterialIcons';
    io: 'Ionicons';
    fi: 'Feather';
    fa: 'FontAwesome';
    fa5: 'FontAwesome5';
    ai: 'AntDesign';
    ei: 'Entypo';
    si: 'SimpleLineIcons';
    oi: 'Octicons';
    fo: 'Foundation';
    evi: 'EvilIcons';
}

const Icons = {
    MaterialCommunityIcons,
    MaterialIcons,
    Ionicons,
    Feather,
    FontAwesome,
    FontAwesome5,
    AntDesign,
    Entypo,
    SimpleLineIcons,
    Octicons,
    Foundation,
    EvilIcons,
};

export const IcType: IIconType = {
    mci: 'MaterialCommunityIcons',
    mi: 'MaterialIcons',
    io: 'Ionicons',
    fi: 'Feather',
    fa: 'FontAwesome',
    fa5: 'FontAwesome5',
    ai: 'AntDesign',
    ei: 'Entypo',
    si: 'SimpleLineIcons',
    oi: 'Octicons',
    fo: 'Foundation',
    evi: 'EvilIcons',
};

const Icon = ({type, name, color, size, style}: IProps) => {
    const icSize = size ? normalizeDimens(size) : undefined;
    switch (type) {
        case IcType.mci:
            return <Icons.MaterialCommunityIcons name={name as string} color={color} size={icSize} style={style} />;
        case IcType.mi:
            return <Icons.MaterialIcons name={name as string} color={color} size={icSize} style={style} />;
        case IcType.io:
            return <Icons.Ionicons name={name as string} color={color} size={icSize} style={style} />;
        case IcType.fi:
            return <Icons.Feather name={name as string} color={color} size={icSize} style={style} />;
        case IcType.fa:
            return <Icons.FontAwesome name={name as string} color={color} size={icSize} style={style} />;
        case IcType.fa5:
            return <Icons.FontAwesome5 name={name as string} color={color} size={icSize} style={style} />;
        case IcType.ai:
            return <Icons.AntDesign name={name as string} color={color} size={icSize} style={style} />;
        case IcType.ei:
            return <Icons.Entypo name={name as string} color={color} size={icSize} style={style} />;
        case IcType.si:
            return <Icons.SimpleLineIcons name={name as string} color={color} size={icSize} style={style} />;
        case IcType.oi:
            return <Icons.Octicons name={name as string} color={color} size={icSize} style={style} />;
        case IcType.fo:
            return <Icons.Foundation name={name as string} color={color} size={icSize} style={style} />;
        case IcType.evi:
            return <Icons.EvilIcons name={name as string} color={color} size={icSize} style={style} />;

        default:
            return <Icons.FontAwesome name={name as string} color={color} size={icSize} style={style} />;
    }
};

Icon.type = IcType;

Icon.defaultProps = {
    color: 'black',
    style: undefined,
    size: undefined,
};

export default Icon;
