interface CSSModuleClasses {
  readonly [key: string]: string;
}

declare module '*.module.css' {
  const classes: CSSModuleClasses;
  export default classes;
}

declare module '*.module.less' {
  const classes: CSSModuleClasses;
  export default classes;
}

declare module '*.css' {
  const css: string;
  export default css;
}

declare module '*.less' {
  const css: string;
  export default css;
}

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

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

// declare module '*.svg' {
//   const content: React.FC<React.SVGProps<SVGElement>>
//   export default content
// }

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.mp4' {
  const src: string;
  export default src;
}

declare module '*.mp3' {
  const src: string;
  export default src;
}

declare module '*.ogg' {
  const src: string;
  export default src;
}

declare module '*.webm' {
  const src: string;
  export default src;
}
