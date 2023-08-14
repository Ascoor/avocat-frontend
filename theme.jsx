// في ملف designTokens.js
export const getDesignTokens = (mode) => {
  const designTokens = {
    palette: {
      mode,
    },
  };

  if (mode === "light") {
    designTokens.palette.bodyBackgroundColor = "rgb(238, 244, 255)";
  } else {
    designTokens.palette.primary = {
      main: "#ffffff", // اللون الأبيض في وضع الليل
    };
    // يمكنك هنا إضافة باقي القيم للوضع الليل
  }

  return designTokens;
};
