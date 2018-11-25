'use strict';

window.renderStatistics = function (ctx, names, times) {

  // считаем максимальное время
  var maxTime = calculateMaxTime(times);

  // рисуем белое облако с тенью
  createShadow(ctx, 10, 10, 'rgba(0, 0, 0, 0.7)');
  createRect(ctx, 'white', 100, 10, 420, 270);

  // рисуем заголовочный текст облака
  createShadow(ctx, 0, 0);
  createText(ctx, '16px PT Mono', '#000', 'Ура вы победили!', 120, 30);
  createText(ctx, '16px PT Mono', '#000', 'Список результатов:', 120, 50);

  // перебираем всех игроков и для каждого вызываем функцию рисующую его колонку с его именем и значением времени
  for (var i = 0; i < names.length; i++) {
    createPlayerColumn(ctx, names[i], times[i], i, maxTime);
  }
};

var createPlayerColumn = function (ctx, playerName, playerTime, playerNumber, maxTime) {

  var columnMaxHeiht = 150;
  var columnWidth = 40;
  var columnMargin = 40;
  var columnHeight = calculateColumnHeight(columnMaxHeiht, maxTime, playerTime);
  var columnOffsetX = calculateOffsetX(playerNumber, columnWidth, columnMargin);
  var columnOpacity = createColumnOpacity(playerNumber);
  var columnColor = createColumnColor(playerName, columnOpacity);

  // рисуем колонку игрока в определенной позиции с определенным цветом
  createRect(ctx, columnColor, columnOffsetX, 250, columnWidth, columnHeight);

  // рисуем текст определенным цветом, сверху и снизу клонки текущего игрока
  createText(ctx, '16px PT Mono', '#000', Math.round(playerTime), columnOffsetX, 90);
  createText(ctx, '16px PT Mono', '#000', playerName, columnOffsetX, 270);
};

var createText = function (ctx, font, color, text, offsetX, offsetY) {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.fillText(text, offsetX, offsetY);
};

var createShadow = function (ctx, offsetX, offsetY, color) {

  if (!color) {
    ctx.shadowColor = '#fff';
  } else {
    ctx.shadowColor = color;
  }
  ctx.shadowOffsetX = offsetX;
  ctx.shadowOffsetY = offsetY;
};

var createRect = function (ctx, color, offsetX, offsetY, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(offsetX, offsetY, width, height);
};

var createColumnColor = function (playerName, columnOpacity) {
  var currentColor = '';
  if (playerName === 'Вы') {
    currentColor = 'rgba(255, 0, 0, 1)';
  } else {
    currentColor = 'rgba(0, 34, 255,' + columnOpacity + ' )';
  }

  return currentColor;
};

var calculateMaxTime = function (times) {
  var currentTime = 0;
  for (var i = 0; i < times.length; i++) {

    if (currentTime < times[i]) {

      currentTime = times[i];
    }
  }
  return currentTime;
};

var calculateColumnHeight = function (columnMaxHeiht, maxPlayersTime, playerTime) {
  var columnHeightPlayer = 0;
  var changeDirection = -1;
  columnHeightPlayer = playerTime * columnMaxHeiht / maxPlayersTime;

  return Math.round(columnHeightPlayer) * changeDirection;
};

var createColumnOpacity = function (playerNumber) {
  var minOpacity = 0.5;
  var playerColorOpacity = playerNumber / 10 + minOpacity;
  return playerColorOpacity;
};

var calculateOffsetX = function (columnNumber, columnWidth, columnMargin) {
  var defaultOffsetX = 120;

  if (columnNumber === 0) {
    return defaultOffsetX;
  }

  return defaultOffsetX + (columnWidth + columnMargin) * columnNumber;
};


