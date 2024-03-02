import { CardKey } from 'src/app/shared/variables/enum';
import { CardAdapterUtils } from '../card-adapter/card-adapter.utils';
import { cardsFixture } from './card-adapter.fixture';

describe('CardAdapterUtils', () => {
  const cards = cardsFixture;
  describe('toFirstCharString Function', () => {
    it('should capitalize the first character of a string', () => {
      const result = CardAdapterUtils.toFirstCharString('example');
      expect(result).toBe('Example');
    });

    it('should handle single-character strings', () => {
      const result = CardAdapterUtils.toFirstCharString('e');
      expect(result).toBe('E');
    });

    it('should not change the case of other characters', () => {
      const result = CardAdapterUtils.toFirstCharString('eXAMPLE');
      expect(result).toBe('EXAMPLE');
    });

    it('should return an empty string when given an empty string', () => {
      const result = CardAdapterUtils.toFirstCharString('');
      expect(result).toBe('');
    });

    it('should handle strings with leading spaces', () => {
      const result = CardAdapterUtils.toFirstCharString(' example');
      expect(result).toBe(' example');
    });

    it('should handle non-alphabetic characters', () => {
      const result = CardAdapterUtils.toFirstCharString('1example');
      expect(result).toBe('1example');
    });
  });

  describe('getDistinctValuesFromCardArray', () => {
    it('should extract unique values from an array of cards based on the provided key', () => {
      const distinctTags = CardAdapterUtils.getDistinctValuesFromCardArray(cards, CardKey.Tag);

      expect(distinctTags).toEqual(['easy', 'medium']);
    });

    it('should extract unique values from an array of cards based on the category key', () => {
      const distinctTags = CardAdapterUtils.getDistinctValuesFromCardArray(cards, CardKey.Category);

      expect(distinctTags).toEqual(['first', 'second', 'third']);
    });
  });

  describe('getCardsByTagsMap Function', () => {
    it('should group cards by tags, case-insensitively, and capitalize the tag in the map', () => {
      const tags = ['easy', 'medium'];
      const map = CardAdapterUtils.getCardsByTagsMap(tags, cards);

      expect(map.size).toBe(2);
      expect(map.get('Easy')).toContain(cards[0]);
      expect(map.get('Easy')).toContain(cards[2]);
      expect(map.get('Medium')).toContain(cards[1]);
    });

    it('should not create map entries for tags that have no corresponding cards', () => {
      const tags = ['hard'];
      const map = CardAdapterUtils.getCardsByTagsMap(tags, cards);

      expect(map.size).toBe(0);
    });
  });
});
