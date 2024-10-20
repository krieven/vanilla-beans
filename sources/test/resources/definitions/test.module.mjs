// import html from './index.html' 

export default 
`
<H1>beans library</H1>

<script xtype="javascript">
    //optional declaration of stub attributes (for static code analysis)
    const $appContext = {}
    const $factory = {create:(tag, attributes, children)=>{return {}}}
    const $ref = {}
    const require = (src) => {return {}}
</script>

<beans-import src="hello-world" beans-as="mod" type="html"></beans-import>
<beans-import src="./hh/mod.js" beans-as="mod.js" type="js"></beans-import>

<div beans-as="a-first-bean" beans-usetag="table">
    <div beans-ref="cc">cc</div>
    aa */
    <!--comment-->
    <built-in.slot beans-ref="n1">
        slot content

    </built-in.slot>
    <script type="javascript">
        /**
         *
         */
        console.log('Hello world')

        $appContext,a ='a'
    </script>
</div>

<div beans-as="b-bean">
    <!--comment-->
    bb
</div>

<mod.inner beans-as="c-bean">
    bb
</mod.inner>

<mod.double-hello-world beans-as="hello-world">
    <h1>Hello World</h1>
</mod.double-hello-world>
`