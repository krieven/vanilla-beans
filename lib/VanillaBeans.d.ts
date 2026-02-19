
interface Factory {
    with: (context?: any) => FactoryInitiated
}

interface Module {
    imports: {
        [moduleKey: string]: {
            type: 'html' | 'cjs' | 'css',
            src: string
        }
    },
    src: string
}

interface BeansModule extends Module {
    beans: {
        [name: string]: BeanDescriptor,
    }
}

interface CJSModule extends Module {
    script?: string, 
    evaluated?: any
}

interface CSSModule extends Module {
    style:string, 
    evaluated?: CSSStyleSheet
}

interface AnyModule extends BeansModule, CJSModule, CSSModule{}

interface FactoryInitiated {
    create: (
        tag: string, 
        attributes?:{
            [name:string]: string
        }) => Node
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
    ) => void,

}

interface BeanSearchResult {
    src?: string, 
    tag?: string, 
    bean?: BeanDescriptor,
    create?: (
        ns:string | null | undefined,
        tag:string, 
        attributes:{[key:string]:string}, 
        children: (BeanDescriptor | string)[] | [], 
        appContext: any, 
        moduleSrc: string, 
        rootRef?: {[key:string]:Node} | undefined
    ) => Node
}


interface BeanInstance extends Element {

    beanMount: (target: Node, before: Node | number) => void,
    beanUnmount: () => void,

    beanStart: () => void,
    beanStop: () => void,

    beanDestroy: () => void,

    beanUpdate: (data: any, options: any, additional: any) => void,

    onBeanMount?:  () => void,
    onBeanUnmount?: () => void,
    onBeanStart?: () => void,
    onBeanStop?:  () => void,
    onBeanUpdate?:  (data: any, options?: any, additional?: any) => void,
    transformBeanData?: (data: any, options?: any, additional?: any) => any,
    onBeanDestroy?:  () => void

}

interface AnyProps {
    [k:string]: string
}