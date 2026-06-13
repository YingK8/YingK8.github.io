// Ambient module declarations so Vite asset imports type-check.
// Each import resolves to a URL string at build time.
declare module '*.png' {
  const src: string;
  export default src;
}
declare module '*.jpg' {
  const src: string;
  export default src;
}
declare module '*.jpeg' {
  const src: string;
  export default src;
}
declare module '*.mp4' {
  const src: string;
  export default src;
}
declare module '*.glb' {
  const src: string;
  export default src;
}
