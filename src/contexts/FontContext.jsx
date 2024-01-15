import React, { createContext, useContext, useState } from "react";
import { Font } from "expo";


const FontContext = createContext();

export const FontProvider = ({ children }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  const loadFontAsync = async () => {
    await Font.loadAsync({
      "inter-black": require("../../assets/fonts/Inter-Black.ttf"),
    });
    setFontLoaded(true);
  };

  return (
    <FontContext.Provider value={{ fontLoaded, loadFontAsync }}>
      {children}
    </FontContext.Provider>
  );
};

export const useFontContext = () => useContext(FontContext);
