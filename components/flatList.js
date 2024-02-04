import React from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {colors, shadow, sizes, spacing} from '../constants/theme';
import FavoriteButton from './FavoriteButton';

const CARD_WIDTH = 250;
const CARD_HEIGHT = 150;
// const CARD_WIDTH_SPACING = CARD_WIDTH + spacing.l;

const TopPlacesCarousel = ({list}) => {
  return (
    <FlatList
      data={list}
      horizontal
      snapToInterval={CARD_WIDTH + 20}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.id.toString()} // Assurez-vous de convertir l'ID en chaîne de caractères
      contentContainerStyle={{ backgroundColor: 'black' }} // Changement du fond de la liste
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            style={{
                    marginLeft: index === 0 ? 20 : 0, // Ajout d'une marge à gauche pour la première carte
                    marginRight: 20, // Marge à droite fixe pour chaque carte
                  }}>
            <View style={[styles.card, shadow.dark]}>
              <FavoriteButton style={styles.favorite} />
              <View style={styles.imageBox}>
                <Image source={item.image} style={styles.image} />
              </View>
              <View style={styles.titleBox}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.location}>{item.location}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginVertical: 10,
  },
  favorite: {
    position: 'absolute',
    top: spacing.m,
    right: spacing.m,
    zIndex: 1,
  },
  imageBox: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: sizes.radius,
    overflow: 'hidden',
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    resizeMode: 'cover',
  },
  titleBox: {
    position: 'absolute',
    top: CARD_HEIGHT - 80,
    left: 16,
  },
  title: {
    fontSize: sizes.h2,
    fontWeight: 'bold',
    color: colors.white,
  },
  location: {
    fontSize: sizes.h3,
    color: colors.white,
  },
});

export default TopPlacesCarousel;