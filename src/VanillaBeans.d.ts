
interface Factory {
    with: (context?: any) => FactoryInitiated | undefined
}

interface CJSModule {
    script?: string, 
    src: string, 
    evaluated?: any, 
    imports?:{}
}

interface CSSModule {
    style:string, 
    src:string, 
    evaluated?: CSSStyleSheet,
    imports?:{}
}

interface FactoryInitiated {
    create: (
        tag: string, 
        attributes?:{
            [attributeName:string]: String
        },
        children?: [
            BeanDescriptor | string
        ]) => Node,
}

interface BeanDescriptor {
    t: string,
    a?: {
        [attributeName: string]: string
    },
    c?: [BeanDescriptor | string],
    script?: string,
    init?: (
        $context: any,
        $factory: Factory,
        $ref: {
            [refId: string]: Node
        },
        document: Document,
        require: (moduleKey: string) => any) => void
}

interface BeansModule {
    beans: {
        [beanAs: string]: BeanDescriptor,
    },
    imports?: {
        [moduleKey: string]: {
            type: 'html' | 'cjs' | 'css',
            src: string
        }
    },
    src: string
}
