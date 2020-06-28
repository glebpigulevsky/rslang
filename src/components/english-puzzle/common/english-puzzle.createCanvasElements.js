import { PUZZLE } from './english-puzzle.constants';

const createCanvasElements = ({
  img,
  wordsList,
  colorBorder,
  fillColor = null,
  borderPuzzle = PUZZLE.SIZES.BORDER,
  hasText = true,
  windowSize = PUZZLE.SIZES.WINDOW.DESKTOP,
}) => {
  const imageToRender = img;
  const extraWidthValue = PUZZLE.EXTRA_WIDTH_VALUE;
  const fontFamily = PUZZLE.FONT.NAME;
  let fontRatio;
  if (windowSize >= PUZZLE.SIZES.WINDOW.DESKTOP) {
    fontRatio = PUZZLE.FONT.RATIO.DESKTOP;
  } else if (windowSize >= PUZZLE.SIZES.WINDOW.TABLET) {
    fontRatio = PUZZLE.FONT.RATIO.TABLET;
    if (imageToRender.width > PUZZLE.SIZES.PICTURE.TABLET) {
      imageToRender.width = PUZZLE.SIZES.PICTURE.TABLET;
    }
  } else {
    fontRatio = PUZZLE.FONT.RATIO.MOBILE;
    imageToRender.width = PUZZLE.SIZES.PICTURE.MOBILE;
  }
  const fontType = PUZZLE.FONT.TYPE;
  const shadowPuzzle = PUZZLE.SIZES.SHADOW.BORDER;
  const borderText = PUZZLE.SIZES.BORDER_TEXT;
  const shadowText = PUZZLE.SIZES.SHADOW.TEXT;
  const colorShadowBorder = PUZZLE.COLORS.BORDER.SHADOW;
  const colorText = PUZZLE.COLORS.LIGHT;
  const colorShadowText = PUZZLE.COLORS.DARK;
  const solidTextColor = PUZZLE.COLORS.LIGHT;
  const fontStyle = PUZZLE.FONT.STYLE;

  const imgWidth = img.width;
  const imgHeight = img.height;
  const groupsWords = wordsList.map((word) => word.split(' '));
  const groupsRow = groupsWords.length;
  const EXTRA_WIDTH_VALUE = parseInt(extraWidthValue, 10);
  const result = [];

  let startYPointCropImage = 0;

  groupsWords.forEach((words, i) => {
    const row = [];
    const wordCount = words.length;
    const letterCounts = words.reduce((acc, val) => acc + val.replace(/<[^>]*>/g, '').length, 0);
    const reduceLength = letterCounts * EXTRA_WIDTH_VALUE;
    const extraWidth = Math.round(reduceLength / wordCount);
    const onePart = Math.round((imgWidth - reduceLength) / letterCounts);
    const canvasHeight = Math.round(imgHeight / groupsRow);

    let widthCount = 0;

    words.forEach((wordJ, j) => {
      const word = wordJ.replace(/<[^>]*>/g, '');
      const canvas = document.createElement('canvas');

      canvas.classList.add('canvas-item');
      canvas.classList.add(`canvas-row-${i + 1}`);
      canvas.classList.add(`canvas-item-${j + 1}`);
      canvas.setAttribute('data-item', `${i + 1}-${j + 1}`);
      canvas.setAttribute('data-word', word);

      const ctx = canvas.getContext('2d');
      let canvasWidth = word.length * onePart + extraWidth;

      if (j === wordCount - 1) {
        canvasWidth = imgWidth - widthCount;
        widthCount += canvasWidth;
      } else {
        widthCount += canvasWidth;
      }

      const x1 = 0;
      const y1 = Math.round(canvasHeight / PUZZLE.PARTS.CANVAS_VERTICAL);
      const y2 = Math.round((canvasHeight / PUZZLE.PARTS.CANVAS_VERTICAL) * PUZZLE.PARTS.HALF);
      const centerY = canvasHeight / PUZZLE.PARTS.HALF;
      const radius = Math.round(canvasHeight / PUZZLE.PARTS.CANVAS_VERTICAL / PUZZLE.PARTS.HALF);
      const startXPointCropImage = widthCount - canvasWidth;
      const fontSize = Math.round(canvasHeight / PUZZLE.PARTS.CANVAS_FONT);

      ctx.canvas.width = canvasWidth + radius;
      ctx.canvas.height = canvasHeight;

      ctx.beginPath();

      if (j) {
        ctx.arc(x1, centerY, radius, Math.PI / PUZZLE.PARTS.HALF, Math.PI * PUZZLE.MATH_PI_RATIO, true);
      }

      ctx.lineTo(0, y1);
      ctx.lineTo(0, 0);
      ctx.lineTo(canvasWidth, 0);
      ctx.lineTo(canvasWidth, y1);

      if (j !== wordCount - 1) {
        ctx.arc(canvasWidth, centerY, radius, Math.PI * PUZZLE.MATH_PI_RATIO, Math.PI / PUZZLE.PARTS.HALF, false);
      }

      ctx.lineTo(canvasWidth, y2);
      ctx.lineTo(canvasWidth, canvasHeight);
      ctx.lineTo(0, canvasHeight);
      ctx.lineTo(0, y2);

      if (!j) {
        ctx.lineTo(0, y1);
      }

      ctx.clip();

      if (fillColor || windowSize < PUZZLE.SIZES.WINDOW.TABLET) {
        ctx.fillStyle = fillColor || PUZZLE.COLORS.FILL.DEFAULT;
        ctx.fill();
      } else {
        ctx.drawImage(
          img,
          startXPointCropImage,
          startYPointCropImage,
          canvasWidth + radius,
          canvasHeight,
          0,
          0,
          canvasWidth + radius,
          canvasHeight,
        );
      }

      if (hasText) {
        ctx.shadowColor = colorShadowBorder;
        ctx.strokeStyle = colorBorder;
        ctx.shadowBlur = shadowPuzzle;
        ctx.lineWidth = borderPuzzle;
        ctx.stroke();
        ctx.globalCompositeOperation = 'destination-in';
        ctx.fill();

        ctx.globalCompositeOperation = 'source-over';
        ctx.beginPath();
        ctx.shadowColor = colorShadowText;
        ctx.shadowBlur = shadowText;
        ctx.lineWidth = borderText;
        ctx.strokeStyle = colorText;
        ctx.font = `${fontType} ${fontSize * fontRatio}pt ${fontFamily}`;
        ctx.textAlign = PUZZLE.TEXT_ALIGN;
        ctx.fillStyle = solidTextColor;
        ctx[fontStyle](
          word,
          canvasWidth / PUZZLE.PARTS.HALF + radius / PUZZLE.PARTS.HALF,
          canvasHeight / PUZZLE.PARTS.HALF + fontSize / PUZZLE.PARTS.CANVAS_VERTICAL,
        );
      }

      row.push(canvas);
    });

    startYPointCropImage += canvasHeight;
    result.push(row);
  });

  return result;
};

const getCanvasElementsCollection = (preloadedPicture, sentences, windowSize) => ({
  withImage: {
    regular: createCanvasElements({
      img: preloadedPicture,
      wordsList: sentences,
      colorBorder: PUZZLE.COLORS.LIGHT,
      windowSize,
    }),
    correct: createCanvasElements({
      img: preloadedPicture,
      wordsList: sentences,
      colorBorder: PUZZLE.COLORS.CORRECT,
      windowSize,
    }),
    error: createCanvasElements({
      img: preloadedPicture,
      wordsList: sentences,
      colorBorder: PUZZLE.COLORS.WRONG,
      windowSize,
    }),
  },
  withOutImage: {
    regular: createCanvasElements({
      img: preloadedPicture,
      wordsList: sentences,
      colorBorder: PUZZLE.COLORS.LIGHT,
      fillColor: PUZZLE.COLORS.FILL.WITHOUT_IMAGE,
      windowSize,
    }),
    correct: createCanvasElements({
      img: preloadedPicture,
      wordsList: sentences,
      colorBorder: PUZZLE.COLORS.CORRECT,
      fillColor: PUZZLE.COLORS.FILL.WITHOUT_IMAGE,
      windowSize,
    }),
    error: createCanvasElements({
      img: preloadedPicture,
      wordsList: sentences,
      colorBorder: PUZZLE.COLORS.WRONG,
      fillColor: PUZZLE.COLORS.FILL.WITHOUT_IMAGE,
      windowSize,
    }),
  },
  finalImage: createCanvasElements({
    img: preloadedPicture,
    wordsList: sentences,
    colorBorder: PUZZLE.COLORS.TRANSPARENT,
    hasText: false,
    windowSize,
  }),
});

export default getCanvasElementsCollection;
