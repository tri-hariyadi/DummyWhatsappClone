import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParamList} from 'routes';

import {Button, Gap, ProgressiveImage, Row, Text} from 'components';
import {colors, helpers} from 'utils';
import {padding} from 'utils/mixins';
import normalizeDimens from 'utils/normalizeDimens';
import {IGroupListMessage} from 'store/reducers/groupChatSlice';
import {ChatGroupBg} from 'assets/images';
import useUpdateEffect from 'utils/hooks/useUpdateEffect';

export type DataList = {
    chatId?: string;
    idPartner?: string;
    patnerName?: string;
    lastMessage?: string;
    image_url?: string;
    timestamp?: string;
} & IGroupListMessage;

type Props = {
    data?: Array<DataList>;
    navigateToGroupRoom: boolean;
    onPressItem?: () => void;
};

const ListMessage = ({data, navigateToGroupRoom, onPressItem}: Props) => {
    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

    const [offset, setOffset] = useState(1);
    const [dataSource, setDataSource] = useState<Array<DataList> | undefined>([]);
    const num = useRef(100);
    const initialLoadNumber = useRef(40);
    const dataUpdated = useRef(0);

    const windowSize = React.useMemo(() => ((data?.length as number) > 50 ? (data?.length as number) / 4 : 21), [data]);

    useUpdateEffect(() => {
        if ((data?.length as number) !== dataUpdated.current) {
            dataUpdated.current = data?.length as number;
            if (dataSource?.length) {
                setDataSource(data);
            }
        }
    }, [data]);

    useEffect(() => {
        if ((dataSource?.length as number) < (data?.length as number)) {
            if (offset === 1) {
                setDataSource(data?.slice(0, offset * initialLoadNumber.current));
                dataUpdated.current = data?.length as number;
            }
        }
    }, [data]);

    const getData = () => {
        if ((dataSource?.length as number) < (data?.length as number) && data?.length !== 0) {
            setOffset(prev => prev + 1);
            setDataSource(data?.slice(0, offset * num.current));
        }
    };

    const getTimeChat = useCallback((isoString: string) => {
        const dateObject = new Date(isoString);
        const toDay = new Date();

        if (dateObject.getDay() === toDay.getDay()) {
            return helpers.getTime(isoString);
        }

        if (helpers.isDateInCurrentWeek(isoString)) {
            return helpers.getDay(isoString);
        }

        return helpers.getDate(isoString);
    }, []);

    const renderSeparator = useCallback(() => <View style={styles.separator} />, []);

    const onItemPress = useCallback(
        (item: DataList) => {
            if (onPressItem) onPressItem();
            if (navigateToGroupRoom) {
                return navigation.navigate('ChatGroupRoom', {
                    chatId: item.chatId,
                    id: item.id,
                    isGroup: true,
                });
            }
            navigation.navigate('ChatRoom', {
                chatID: item.chatId,
                image_url: item.image_url,
                patnerName: item.patnerName,
                idPartner: item.idPartner,
                isGroup: false,
            });
        },
        [navigateToGroupRoom],
    );

    const renderItem = useCallback(
        ({item}: {item: DataList}) => {
            return (
                <Button
                    isBlock
                    background={colors.white}
                    onPress={() => onItemPress(item)}
                    containerStyle={styles.buttonList}>
                    <Row itemsCenter>
                        <ProgressiveImage
                            source={!item.image_url && navigateToGroupRoom ? ChatGroupBg : {uri: item.image_url}}
                            style={styles.progessiveImage}
                        />
                        <Gap width={16} />
                        <View style={{flex: 1}}>
                            <Row flex={1}>
                                <View style={{flex: 1}}>
                                    <Text font="semi-bold" size={16} color={'black'}>
                                        {navigateToGroupRoom ? item.group_name : item.patnerName}
                                    </Text>
                                    <Text size={12} color={'black'} style={{flex: 1, flexWrap: 'wrap'}}>
                                        {item.lastMessage}
                                    </Text>
                                </View>
                                <Gap width={10} />
                                <Text size={12}>{getTimeChat(item.timestamp)}</Text>
                                <Gap width={10} />
                            </Row>
                            <Gap height={25} />
                            {renderSeparator()}
                        </View>
                    </Row>
                </Button>
            );
        },
        [getTimeChat, renderSeparator],
    );

    if (!data) return null;

    return (
        <FlatList
            data={dataSource}
            keyExtractor={(_item, idx) => `list-items-${idx}`}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            initialNumToRender={initialLoadNumber.current}
            windowSize={windowSize}
            maxToRenderPerBatch={num.current}
            updateCellsBatchingPeriod={num.current / 2}
            onEndReachedThreshold={offset < 10 ? offset * (offset === 1 ? 2 : 2) : 20}
            onEndReached={getData}
            removeClippedSubviews={true}
        />
    );
};

export default React.memo(ListMessage);

const styles = StyleSheet.create({
    separator: {
        height: 1,
        width: '100%',
        backgroundColor: colors.N40,
    },
    buttonList: {
        ...padding(10, 0, 0, 16),
    },
    progessiveImage: {
        position: 'relative',
        bottom: normalizeDimens(7),
    },
    list: {
        ...padding(12, 0, 50),
    },
});
