declare module '*.scss' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module 'gatsby-plugin-arengu-forms';

interface PageProps {
  location: Location
}

declare var __PREFIX_PATHS__: any
declare var __PATH_PREFIX__: any