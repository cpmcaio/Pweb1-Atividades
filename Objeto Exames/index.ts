class Weight{
    constructor(public value: number[]){}
}

class Answer{
    constructor(
        public student: string,
        public responses: string[]
    ){}
}
class Exams{
    private weight: Weight;
    private answerkey: Answer;
    private exams: Array<Answer> = [];
    
    constructor(answerkey:Answer, weight: Weight){
        this.answerkey =answerkey
        this.weight = weight
    }
        public add(exam: Answer){
            this.exams.push(exam);
        }
        private calcularnota(exam: Answer):number{
            let notafinal = 0;
            for (let i = 0; i < exam.responses.length; i++){
                if (exam.responses[i] == this.answerkey.responses[i]){
                    notafinal += this.weight.value[i]??0; 
                }
            }
            return notafinal;
        }

        public avg(): number{
            if (this.exams.length === 0) return 0;
            const media = this.exams.reduce((total, exam) =>total + this.calcularnota(exam),0)/ this.exams.length;
            return media
        }
        public min(count: number = 1): number[]{
            const notas = this.exams.map(exam => this.calcularnota(exam));
            return notas.sort((a, b) => a - b).slice(0, count);
        }
        public max (count: number = 1): number[]{
            const notas = this.exams.map(exam => this.calcularnota(exam));
            return notas.sort((a, b) => b - a).slice(0, count);
        }
        public lt(limit: number):number[]{
            const notas = this.exams.map(exam => this.calcularnota(exam));
            return notas.filter(nota => nota < limit)
        }
        public gt(limit: number):number[]{
            const notas = this.exams.map(exam => this.calcularnota(exam));
            return notas.filter(nota => nota > limit)
        }
    }

// Gabarito
const gabarito = new Answer("gabarito", ["A", "B", "C", "D"]);

// Pesos de cada questão
const peso = new Weight([2, 2, 3, 3]);

// Cria a prova\
const prova = new Exams(gabarito, peso);

// Adiciona alunos
prova.add(new Answer("João",  ["A", "B", "C", "D"])); // acertou tudo = 10
prova.add(new Answer("Maria", ["A", "B", "X", "D"])); // errou questão 3 = 7
prova.add(new Answer("Pedro", ["X", "X", "X", "D"])); // acertou só a 4  = 3

// Testa os métodos
console.log("Média:",   prova.avg());
console.log("Menores:", prova.min(2));
console.log("Maiores:", prova.max(2));
console.log("Abaixo de 7:", prova.lt(7));
console.log("Acima de 7:",  prova.gt(7));