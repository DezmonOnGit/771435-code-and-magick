"use strict";

var createColumnColor = function(playerName, playerColumnOpacity){
  var currentColor = '';
  if(playerName === "Вы"){
    currentColor = 'rgba(255, 0, 0, 1)';
  }

  else{
    currentColor = 'rgba(0, 34, 255,' + playerColumnOpacity + ' )';
  }

  return currentColor;
}

var calculateMaxTime = function(times){
  var currentTime = 0;
  for (var i = 0; i < times.length; i++){

    if(currentTime < times[i]){

      currentTime = times[i];
    }
  }
  return  currentTime;
};

var calculateColumnHeight = function(columnMaxHeiht, maxPlayersTime, playerTime){
  var columnHeightPlayer = 0;

  columnHeightPlayer = playerTime * columnMaxHeiht / maxPlayersTime;

  return  -Math.round(columnHeightPlayer);
};

var createPlayerColumnOpacity = function(playerNumber){
  var minOpacity = 0.5;
  var playerColorOpacity = playerNumber / 10 + minOpacity;
  return playerColorOpacity;
};

var calculateHorizontalPosition = function(columnNumber, columnWidth, columnMargin){
  var defaultHorizontalPosition = 120;
  var currentHorizontalPosition = 0;

  if(columnNumber === 0){
    return defaultHorizontalPosition;
  }

  else{
    currentHorizontalPosition = defaultHorizontalPosition + (columnWidth  + columnMargin) * columnNumber;
    return currentHorizontalPosition;
  }
};

var createPlayerHistogramColumn = function(ctx, playerName, playerTime, playerNumber, maxTime){

  var columnMaxHeiht = 150;
  var columnWidth = 40;
  var columnMargin = 40;
  var columnHeight = calculateColumnHeight(columnMaxHeiht, maxTime, playerTime);
  var horizontalPosition = calculateHorizontalPosition(playerNumber, columnWidth, columnMargin);
  var playerColumnOpacity = createPlayerColumnOpacity(playerNumber);
  var columnColor = createColumnColor(playerName, playerColumnOpacity);

  //убираем значение теней заданные у облака
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // рисуем колонку игрока в определенной позиции с определенным цветом
  ctx.fillStyle = columnColor;
  ctx.fillRect(horizontalPosition, 250, columnWidth, columnHeight);

  // рисуем текст определенным цветом, сверху и снизу клонки текущего игрока
  ctx.fillStyle = '#000';
  ctx.fillText(Math.round(playerTime), horizontalPosition, 90);
  ctx.fillText(playerName, horizontalPosition, 270);
};

window.renderStatistics = function(ctx, names, times){
  //считаем максимальное время
  var maxTime = calculateMaxTime(times);

  // рисуем белое облако с тенью
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 10;
  ctx.fillStyle = 'white';
  ctx.fillRect(100, 10, 420, 270);

  // рисуем заголовочный текст облака
  ctx.shadowColor = '#fff';
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', 120, 30);
  ctx.fillText('Список результатов:', 120, 50);

  // перебираем всех игроков и для каждого вызываем функцию рисующую его колонку с его именем и значением времени
  for (var i = 0; i < names.length; i++){
    createPlayerHistogramColumn(ctx, names[i], times[i], i, maxTime);
  }
};
