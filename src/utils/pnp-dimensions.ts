export const PNP_DIMENSIONS = {
  card: {
    width: 63,
    height: 88,
    bleed: 2,
  },
  slot: {
    width: 67, // 63 + 2 + 2
    height: 92, // 88 + 2 + 2
  }
};

export const getCardStyle = () => ({
  width: `${PNP_DIMENSIONS.card.width}mm`,
  height: `${PNP_DIMENSIONS.card.height}mm`,
  boxSizing: 'border-box' as const,
  overflow: 'hidden' as const,
});

export const getSlotStyle = () => ({
  width: `${PNP_DIMENSIONS.slot.width}mm`,
  height: `${PNP_DIMENSIONS.slot.height}mm`,
  boxSizing: 'border-box' as const,
  overflow: 'hidden' as const,
});
