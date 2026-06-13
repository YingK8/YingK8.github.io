declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': {
      src?: string;
      'camera-controls'?: boolean;
      'auto-rotate'?: boolean;
      'shadow-intensity'?: string;
      style?: React.CSSProperties;
    };
  }
}
