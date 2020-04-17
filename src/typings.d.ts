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
