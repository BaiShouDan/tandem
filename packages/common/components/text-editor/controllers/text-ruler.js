import BaseObject from 'common/object/base';
import encode from './encode';
import {
  calculateLengthInPixels
} from 'common/utils/html/css';

/**
 * Simple text width
 */

class TextRuler extends BaseObject {

  constructor({ style }) {
    super({
      style
    });
  }

  setProperties(properties) {
    super.setProperties(properties);

    // reset the sizes - assuming that style has changed. Visual
    // will need to be recalculated
    // TODO - actually test to see whether style props have changed -
    // unecessary at the moment.
    this._sizes = {};
  }

  /**
   * converts a pixel point to a caret position in text
   */

  convertPointToCharacterPosition(text, point) {
    var position = 0;
    var w = 0;
    for (var i = 0, n = text.length; i < n; i++) {

      var charWidth = this.calculateCharacterSize(text.charAt(i))[0];
      var halfWidth = charWidth / 2;

      // basic rounding calculation bast on character
      // width
      if (w + halfWidth > point) {
        break;
      }

      w += charWidth;

      position++;
    }

    return position;
  }

  /**
   * calculates the width & height of text
   */

  calculateSize(text) {

    var width  = 0;
    var height = 0;

    for (var i = 0, n = text.length; i < n; i++) {
      var [w, h] = this.calculateCharacterSize(text.charAt(i));
      width  += w;

      // TODO - line heigth is likely fixed - this chunk
      // of code is probably unnecessary.
      height = Math.max(height, h);
    }

    return [width, height];
  }

  /**
   * calculates the size of one character
   */

  calculateCharacterSize(char) {
    if (this._sizes[char]) return this._sizes[char];

    var span = this._getTemporarySpan();

    // copy over the styles defined for the text ruler so that
    // we can make an accurate measurement
    var ts = this.style;

    Object.assign(span.style, {
      letterSpacing: ts.letterSpacing,
      lineHeight   : ts.lineHeight,
      fontSize     : ts.fontSize,
      fontFamily   : ts.fontFamily
    });

    // set the encoded
    span.innerHTML = encode(char);

    var w = span.offsetWidth + this._getLetterSpacing();
    var h = span.offsetHeight;

    return this._sizes[char] = [w, h];
  }

  /**
   */

  _getLetterSpacing() {
    if (this._sizes.letterSpacing) return this._sizes.letterSpacing;
    if (!this.style) return 0;
    var ls = calculateLengthInPixels(this.style.letterSpacing);
    return this._sizes.letterSpacing = typeof ls === 'number' ? ls : 0;
  }

  /**
   * returns a temporary span which gets removed after
   * calculations
   */

  _getTemporarySpan() {
    if (this._span) return this._span;
    var span = this._span = document.createElement('span');

    // move off screen
    Object.assign(span.style, {
      left     : '0px',
      top      : '-1024px',
      position : 'absolute'
    });

    document.body.appendChild(span);

    setTimeout(() => {
      this._span = void 0;
      document.body.removeChild(span);
    }, 0);

    return this._getTemporarySpan();
  }

}

export default TextRuler;
