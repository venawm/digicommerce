const colorPicker = (color) => {
  const colorMap = {
    black: "#000000",
    white: "#FFFFFF",
    red: "#FF0000",
    green: "#008000",
    blue: "#0000FF",
    yellow: "#FFFF00",
    orange: "#FFA500",
    purple: "#800080",
    pink: "#FFC0CB",
    cyan: "#00FFFF",
    magenta: "#FF00FF",
    brown: "#A52A2A",
    gray: "#808080",
    silver: "#C0C0C0",
    gold: "#FFD700",
    teal: "#008080",
    olive: "#808000",
    navy: "#000080",
    maroon: "#800000",
  };
  if (colorMap[color]) {
    return colorMap[color];
  } else {
    return "#808080";
  }
};

export default colorPicker;
