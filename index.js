const { LinkedList } = require('./linkedlist.js')

class HashMap {
    constructor(loadFactor, capacity) {
        this.loadFactor = loadFactor
        this.capacity = capacity
        this.currentLoad = 0
        this.buckets = []
        this.buckets.length = capacity
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
        console.log(index)
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
        if (this.buckets[index] === undefined) {
            const list = new LinkedList()
            list.append({key, value})
            this.buckets[index] = list
            this.currentLoad += 1
        } else {
            const list = this.buckets[index]
            const containsKey = list.contains(key)
            if (containsKey) {
                console.log("Täällä pitäisi vaihtaa arvo")
            } else {
                console.log("Täällä pitäisi lisätä arvo listan loppuun")
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
        return this.buckets[index]
    }

    has(key) {
        const index = this.hash(key)
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
        if (this.buckets[index] === undefined) return false
        return true
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
    console.log()

    console.log("Every item: ")
    test.show()
    console.log()

    /*test.set("jasatekko", "jotain")
    test.set("eethuy", "juuso")
    console.log("Load: ", test.currentLoad)
    console.log("Current length: ", test.buckets.length)
    console.log()*/

    console.log(test.get("apple"))
    console.log(test.has("apple"))

}

main()