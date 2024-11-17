
interface Factory {
    with: (context?: any) => FactoryInitiated
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
            [name:string]: string
        }) => Element
}

interface BeanDescriptor {
    t: string,
    a?: {
        [name: string]: string
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
        require: (moduleKey: string) => any
    ) => void
}

interface BeansModule {
    beans: {
        [name: string]: BeanDescriptor,
    },
    imports?: {
        [moduleKey: string]: {
            type: 'html' | 'cjs' | 'css',
            src: string
        }
    },
    src: string
}

interface BeanInstance extends Element {

    beanMount: (target: Node, before: Node | number) => void,
    beanUnmount: () => void,

    beanStart: () => void,
    beanStop: () => void,

    beanDestroy: () => void,

    beanUpdate: (data: any, options: any, additional: any) => void,

    
}
