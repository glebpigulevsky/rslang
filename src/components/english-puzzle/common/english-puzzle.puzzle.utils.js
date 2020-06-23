const createCanvasElements = (
  {
    img,
    wordsList,
    colorBorder = 'rgb(0,255,250)',
    fillColor = null,
    borderPuzzle = 5,
    hasText = true,
    windowSize = 1024,
  },
) => {
  const imageToRender = img;
  const extraWidthValue = 10;
  const fontFamily = 'Segoe';
  let fontRatio;
  if (windowSize >= 1024) {
    fontRatio = 1;
    imageToRender.width = 1200;
  } else if (windowSize >= 768) {
    fontRatio = 0.8;
    imageToRender.width = 1000;
  } else {
    fontRatio = 0.6;
    imageToRender.width = 768;
  }
  const fontType = 'bold';
  const shadowPuzzle = 2;
  const borderText = 1;
  const shadowText = 10;
  const colorShadowBorder = 'rgb(255,255,250)';
  const colorText = 'white';
  const colorShadowText = 'black';
  const solidTextColor = 'white';
  const fontStyle = 'fillText';

  if (!wordsList || !Array.isArray(wordsList) || !wordsList.length || !wordsList.every((el) => typeof el === 'string')) {
    throw new TypeError('"wordsList" argument must be an array containing strings. Example: ["string"]');
  }

  // if (!src || typeof src !== 'string') {
  //   throw new TypeError('"src" argument must be a "string"');
  // }

  if (isNaN(parseInt(extraWidthValue, 10))) {
    throw new TypeError('"extraWidthValue" argument must be a "number"');
  }

  const imgWidth = img.width;
  const imgHeight = img.height;
  const groupsWords = wordsList.map((word) => word.split(' '));
  const groupsRow = groupsWords.length;
  const EXTRA_WIDTH_VALUE = parseInt(extraWidthValue, 10);
  const result = [];

  let startYPointCropImage = 0;

  groupsWords.forEach((words, i) => {
    // const row = document.createElement('div');
    const row = [];
    const wordCount = words.length;
    const letterCounts = words.reduce((acc, val) => acc + val.replace(/<[^>]*>/g, '').length, 0);
    const reduceLength = letterCounts * EXTRA_WIDTH_VALUE;
    const extraWidth = Math.round(reduceLength / wordCount);
    const onePart = Math.round((imgWidth - reduceLength) / letterCounts);
    const canvasHeight = Math.round(imgHeight / groupsRow);

    let widthCount = 0;

    // row.classList.add('group-words');
    // row.classList.add(`row-${i + 1}`);

    words.forEach((w, j) => {
      const word = w.replace(/<[^>]*>/g, '');
      const canvas = document.createElement('canvas');

      canvas.classList.add('canvas-item');
      canvas.classList.add(`canvas-row-${i + 1}`);
      canvas.classList.add(`canvas-item-${j + 1}`);
      canvas.setAttribute('data-item', `${i + 1}-${j + 1}`);
      canvas.setAttribute('data-word', word);

      const ctx = canvas.getContext('2d');
      let canvasWidth = (word.length * onePart) + extraWidth;

      if (j === wordCount - 1) {
        canvasWidth = imgWidth - widthCount;
        widthCount += canvasWidth;
      } else {
        widthCount += canvasWidth;
      }

      const x1 = 0;
      const y1 = Math.round(canvasHeight / 3);
      const y2 = Math.round((canvasHeight / 3) * 2);
      const centerY = canvasHeight / 2;
      const radius = Math.round((canvasHeight / 3) / 2);
      const startXPointCropImage = widthCount - canvasWidth;
      const fontSize = Math.round(canvasHeight / 4);

      ctx.canvas.width = canvasWidth + radius;
      ctx.canvas.height = canvasHeight;

      ctx.beginPath();

      if (j) {
        ctx.arc(x1, centerY, radius, Math.PI / 2, Math.PI * 1.5, true);
      }

      ctx.lineTo(0, y1);
      ctx.lineTo(0, 0);
      ctx.lineTo(canvasWidth, 0);
      ctx.lineTo(canvasWidth, y1);

      if (j !== wordCount - 1) {
        ctx.arc(canvasWidth, centerY, radius, Math.PI * 1.5, Math.PI / 2, false);
      }

      ctx.lineTo(canvasWidth, y2);
      ctx.lineTo(canvasWidth, canvasHeight);
      ctx.lineTo(0, canvasHeight);
      ctx.lineTo(0, y2);

      if (!j) {
        ctx.lineTo(0, y1);
      }

      ctx.clip();

      if (fillColor || windowSize < 768) {
        ctx.fillStyle = fillColor || 'lightgreen'; // todo
        ctx.fill();
      } else {
        // ctx.globalAlpha = 0.6;
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
        // ctx.globalAlpha = 1;
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
        ctx.textAlign = 'center';
        ctx.fillStyle = solidTextColor;
        ctx[fontStyle](word, canvasWidth / 2 + radius / 2, canvasHeight / 2 + fontSize / 3);
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
      colorBorder: 'gray',
      windowSize,
    }),
    correct: createCanvasElements({
      img: preloadedPicture,
      wordsList: sentences,
      colorBorder: 'green',
      windowSize,
    }),
    error: createCanvasElements({
      img: preloadedPicture,
      wordsList: sentences,
      colorBorder: 'red',
      windowSize,
    }),
  },
  withOutImage: {
    regular: createCanvasElements({
      img: preloadedPicture,
      wordsList: sentences,
      colorBorder: 'gray',
      fillColor: 'brown',
      windowSize,
    }),
    correct: createCanvasElements({
      img: preloadedPicture,
      wordsList: sentences,
      colorBorder: 'green',
      fillColor: 'brown',
      windowSize,
    }),
    error: createCanvasElements({
      img: preloadedPicture,
      wordsList: sentences,
      colorBorder: 'red',
      fillColor: 'brown',
      windowSize,
    }),
  },
  finalImage: createCanvasElements({
    img: preloadedPicture,
    wordsList: sentences,
    colorBorder: 'transparent',
    hasText: false,
    windowSize,
  }),
});

export default getCanvasElementsCollection;
