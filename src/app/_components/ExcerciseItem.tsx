import { FC } from 'react';
import { View, Image, Text, StyleSheet, ImageSourcePropType } from 'react-native';
import { RutinePropsWithChildren } from '../util/types';

const ExcerciseItem: FC<RutinePropsWithChildren> = ({ excercises }) => {
    const { src, repeticiones } = excercises;
    return (
        <View style={styles.item}>
            <Image source={src} style={styles.image} />
            <Text style={styles.reps}>{repeticiones}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    item: {
        width: '18%',
        alignItems: 'center',
        marginBottom: 12,
    },
    image: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    reps: {
        marginTop: 4,
        fontWeight: 'bold',
    },
});

export default ExcerciseItem;
