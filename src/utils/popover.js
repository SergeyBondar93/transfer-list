export const convertStyles = (styles) => {
  console.log(styles);
  return {
    ...styles,
    zIndex: 999,
  };
};
