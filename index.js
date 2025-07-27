const { LinkedList } = require('./linkedlist.js')

class HashMap {
    constructor(loadFactor, capacity) {
        this.loadFactor = loadFactor
        this.capacity = capacity
        this.currentLoad = 0
        this.keysCount = 0
        this.buckets = []
        this.buckets.length = capacity
        this.originalCapacity = capacity
    }

    growBuckets() {
        const newArr = []
        newArr.length = this.capacity * 2
        for (let i = 0; i < this.capacity; i++) {
            if (this.buckets[i] !== undefined) {
                newArr[i] = this.buckets[i]
            }
        }
        this.buckets = newArr
        this.capacity *= 2
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
        hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode % this.buckets.length;
    }

    set(key, value) {
        const index = this.hash(key)
        //console.log(index)
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
        if (this.buckets[index] === undefined) {
            const list = new LinkedList()
            list.append({key, value})
            this.buckets[index] = list
            this.currentLoad++
            this.keysCount++
        } else {
            const list = this.buckets[index]
            const containsKey = list.contains(key)
            if (containsKey) {
                let current = list.head()
                while (current) {
                    if (current.value.key === key) {
                        current.value.value = value
                        break
                    }
                }
            } else {
                list.append({key, value})
                this.keysCount++
            }
        }
        if (this.currentLoad / this.capacity >= this.loadFactor) {
            this.growBuckets()
        }
    }

    get(key) {
        const index = this.hash(key)
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
        if (this.buckets[index] === undefined) return null
        const list = this.buckets[index]
        //voisiko tässä käyttää linkedlist luokassa olevaa valmista metodia?
        let current = list.head()
        while (current) {
            if (current.value.key === key) return current.value.value
            current = current.nextNode
        }
        return null
    }

    has(key) {
        const index = this.hash(key)
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
        if (this.buckets[index] === undefined) return false
        const list = this.buckets[index]
        //voisiko tässä käyttää linkedlist luokassa olevaa valmista metodia?
        let current = list.head()
        while (current) {
            if (current.value.key === key) return true
            current = current.nextNode
        }
        return false
    }

    remove(key) {
        const index = this.hash(key)
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
        if (this.buckets[index] === undefined) return false
        const list = this.buckets[index]
        //täälläkin vois hyödyntää valmiita metodeja? tai ehkä ei! muahahahah
        let current = list.head()
        let i = 0
        while (current) {
            if (current.value.key === key) {
                list.removeAt(i)
                if (list.size() === 1) this.currentLoad--
                this.keysCount--
                return true
            }
            current = current.nextNode
            i++
        }
        return false
    }

    length() {return this.keysCount}

    clear() {
        this.capacity = this.originalCapacity
        this.buckets = []
        this.currentLoad = 0
        this.keysCount = 0
    }

    keys() {
        const keys = []
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i] === undefined) continue
            const list = this.buckets[i]
            let current = list.head()
            while (current) {
                keys.push(current.value.key)
                current = current.nextNode
            }
        }
        return keys
    }

    values() {
        const values = []
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i] === undefined) continue
            const list = this.buckets[i]
            let current = list.head()
            while (current) {
                values.push(current.value.value)
                current = current.nextNode
            }
        }
        return values
    }

    entries() {
        const entries = []
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i] === undefined) continue
            const list = this.buckets[i]
            let current = list.head()
            while (current) {
                entries.push([current.value.key, current.value.value])
                current = current.nextNode
            }
        }
        return entries
    }

    show() {
        for (const bucket of this.buckets) {
            console.log(bucket)
        }
    }
}

function main() {
    const test = new HashMap(0.75, 16)
    test.set('apple', 'red')
    test.set('banana', 'yellow')
    test.set('carrot', 'orange')
    test.set('dog', 'brown')
    test.set('elephant', 'gray')
    test.set('frog', 'green')
    test.set('grape', 'purple') //11
    test.set('hat', 'black') //11 same hashcode
    test.set('ice cream', 'white')
    test.set('jacket', 'blue')
    test.set('kite', 'pink')
    test.set('lion', 'golden')
    test.set('carrot', 'blorange')
    console.log("Load: ", test.currentLoad)
    console.log("Current length: ", test.buckets.length)
    console.log("Is there an apple? ", test.has("apple"))
    console.log()

    console.log("Every item: ")
    test.show()
    console.log("Avainten määrä: ", test.length())
    console.log()

    console.log(test.remove("kite"))
    test.show()
    console.log("Avainten määrä: ", test.length())
    console.log()

    test.set('kite', 'pink')
    test.show()
    console.log("Avainten määrä: ", test.length())

    console.log("Avaimet: ", test.keys())
    console.log("Arvot: ", test.values())
    console.log("Avaimet ja arvot: ", test.entries())

    /*test.clear()
    console.log("Load: ", test.currentLoad)
    console.log("Current length: ", test.buckets.length)
    test.show()*/


    /*test.set("jasatekko", "jotain")
    test.set("eethuy", "juuso")
    console.log("Load: ", test.currentLoad)
    console.log("Current length: ", test.buckets.length)
    console.log()

    console.log(test.get("carrot"))
    console.log(test.get("apple"))
    console.log("Is there an apple? ", test.has("apple"))*/

}

main()