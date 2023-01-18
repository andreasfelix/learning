
(() => {
    type Effect = () => void
    type Dep = Set<Effect>
    type DepsMap = Map<string, Dep>
    type TargetMap = WeakMap<any, DepsMap>

    const targetMap: TargetMap = new WeakMap()
    let activeEffect: Effect | null = null

    function effect(eff: Effect) {
        activeEffect = eff
        activeEffect()
        activeEffect = null
    }

    function track(target: object, key: string) {
        if (activeEffect) {
            let depsMap = targetMap.get(target)
            if (!depsMap) {
                depsMap = new Map()
                targetMap.set(target, depsMap)
            }
            let dep = depsMap.get(key)
            if (!dep) {
                dep = new Set()
                depsMap.set(key, dep)
            }
            dep.add(activeEffect)
        }
    }

    function trigger(target: object, key: string) {
        const depsMap = targetMap.get(target)
        if (!depsMap) {
            return
        }
        const dep = depsMap.get(key)
        if (dep) {
            dep.forEach(effect => effect())
        }
    }

    function ref(raw: any) {
        const r = {
            get value() {
                track(r, 'value')
                return raw
            },
            set value(newValue) {
                raw = newValue
                trigger(r, 'value')
            }
        }
        return r
    }

    function computed(getter: () => any) {
        const r = ref(undefined)
        effect(() => r.value = getter())
        return r
    }

    (() => {
        const a = ref(1)
        const b = computed(() => { console.log("update b"); return a.value * 2 }) // immedialty computes b
        const c = computed(() => { console.log("update c"); return b.value * 2 }) // immedialty computes c
        console.log("a", a.value)
        console.log("b", b.value)
        console.log("c", c.value)
        a.value = 2 // also triggers update of b, c
        console.log("a", a.value)
        console.log("b", b.value)
        console.log("c", c.value)
    })()

})()
