const returnRandomZasada = () => {
    const zasady = ['A', 'T','C','G'];
    return zasady[Math.floor(Math.random() * zasady.length)];
    
}


const dnaMaker = () => {
    const dnaArr = [];
    for (let i = 0; i< 10; i++) {
        dnaArr.push(returnRandomZasada())
    }
    return dnaArr
}

const tVitaFactory = (specNumber, dna) => { 
    return {
        specNumber: specNumber,
        dna: dna,
        mutate() {
            const randomIndex = Math.floor(Math.random() * this.dna.length);
            const obecnaZasada = this.dna[randomIndex];
            const zasady = ['A', 'T','C','G'];
            const mozliweZasady = zasady.filter(zasada => zasada !== obecnaZasada);
            const randomNowaZasadaIndex = Math.floor(Math.random() * mozliweZasady.length)
            const nowaZasada = mozliweZasady[randomNowaZasadaIndex];
            this.dna[randomIndex] = nowaZasada;
            return this.dna
        },
        compareDNA(otherTvita) {
            let count = 0;
            for(let i = 0; i < 10; i++) {
                if (this.dna[i] === otherTvita.dna[i]) {
                    count++;
                }
            }
            let procent = (count / this.dna.length) * 100;
            return `podobienstwo wynosi ${procent} %!`
        },
        willLikelySurvive() {
            let aCount = 0;
            let tCount = 0;
            for (let i = 0; i < this.dna.length;i++) {
                if(this.dna[i] === 'A') {
                    aCount++;
                }
                if(this.dna[i] === 'T') {
                    tCount++;
                }
            }
            const precentage = ((aCount+tCount) / this.dna.length) * 100;
            return precentage > 50 ? true : false
        },
        completeStrand() {
            const complement = { 'A': 'T', 'T': 'A', 'C': 'G', 'G': 'C' };
            const complementaryStrand = this.dna.map(base => complement[base])
            return complementaryStrand
        },
        crossOver(otherTvita) {
            const crossoverPoint = Math.floor(Math.random() * (this.dna.length - 1)) + 1;
            const firstHalf = this.dna.slice(0,crossoverPoint);
            const otherSecondHalf = otherTvita.dna.slice(crossoverPoint)
            const newDna = firstHalf.concat(otherSecondHalf)
            return newDna;
        },
        specialMutate(numOfMutations) {
            if (typeof numOfMutations !== 'number' || numOfMutations < 1 || numOfMutations > this.dna.length) {
                throw new Error('Invalid number of mutations');
              }
              for (let i =0; i< numOfMutations;i++) {
                const randomIndex = Math.floor(Math.random() * this.dna.length);
                const obecnaZasada = this.dna[randomIndex];
                const zasady = ['A', 'T','C','G'];
                const mozliweZasady = zasady.filter(zasada => zasada !== obecnaZasada);
                const randomNowaZasadaIndex = Math.floor(Math.random() * mozliweZasady.length)
                const nowaZasada = mozliweZasady[randomNowaZasadaIndex];
                this.dna[randomIndex] = nowaZasada;
                
              }
              return this.dna
        }
    }
}
const first = tVitaFactory(1,dnaMaker())
console.log('bazowe dna: ',first.dna);
const mutate = first.specialMutate(5)
console.log('dna po 5 mutacjach', mutate)
// let survingArr = []
// let specNum = 1
// while(survingArr.length < 20) {
    
//     const organizm = tVitaFactory(specNum,dnaMaker());
//     if (organizm.willLikelySurvive() === true) {
//         survingArr.push(organizm)
//     }
//     specNum++;
// }



