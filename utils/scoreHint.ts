const scoreHint: { [key: number]: string } = {
  1: "The decompiled code is misleading",
  2: "The decompiled code is not related to source code",
  3: "The functionality is almost the same as source code, but hard to read",
  4: "The functionality is almost the same as source code, but has some differences",
  5: "The decompiled code is nearly the same as the source code",
};
export default scoreHint;
