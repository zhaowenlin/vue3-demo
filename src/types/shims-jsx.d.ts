export {}
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elem: string]: any
    }
    interface IntrinsicAttributes {
      [elem: string]: any
    }
    interface ElementAttributesProperty {
      $props: {}
    }
  }
}
