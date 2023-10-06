import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import Row from './Row';

import categories from 'assets/content/emojiCategories';
import Text from './Text';
import {colors} from 'utils';
import {dimens, rounded, padding} from 'utils/mixins';
import Button from './Button';
import {emojisByCategory} from 'assets/content/emojis';
import shortnameToUnicode from 'utils/shortNameToUnicode';
import normalizeDimens from 'utils/normalizeDimens';

const Emoji = () => {
    const [emojis, setEmojis] = useState(emojisByCategory.people);

    return (
        <View>
            {/* <Row justifyCenter itemsCenter style={styles.tabWrapper}>
                <FlatList
                    data={categories.tabs}
                    keyExtractor={(item, idx) => `${item}-${idx}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => (
                        <Button
                            onPress={() => setEmojis(emojisByCategory[item.category])}
                            background={'transparent'}
                            containerStyle={styles.tabBtn}>
                            <Text size={20}>{item.tabLabel}</Text>
                        </Button>
                    )}
                />
            </Row> */}
            <FlatList
                data={emojis}
                keyExtractor={(item, idx) => `item-${item}-${idx}`}
                numColumns={8}
                columnWrapperStyle={{
                    flex: 1,
                    flexDirection: 'row',
                    // gap: normalizeDimens(10),
                }}
                renderItem={({item}) => (
                    <Button background={'transparent'} containerStyle={styles.tabBtn}>
                        <Text size={20}>{shortnameToUnicode[`:${item}:`]}</Text>
                    </Button>
                )}
            />
        </View>
    );
};

export default Emoji;

const styles = StyleSheet.create({
    tabWrapper: {
        backgroundColor: colors.bgDetail,
        ...padding(10, 0, 10, 16),
    },
    tabBtn: {
        paddingHorizontal: 0,
        paddingVertical: 0,
        justifyContent: 'center',
        alignItems: 'center',
        ...dimens(45),
        ...rounded(45 / 2),
    },
});
