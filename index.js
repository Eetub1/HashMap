class HashMap {
    constructor(loadFactor, capacity) {
        this.loadFactor = loadFactor
        this.capacity = capacity
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
        hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode;
    }
}

function main() {
    const map = new HashMap(0.7, 16)
    console.log(map.hash("eetv"))
}

main()