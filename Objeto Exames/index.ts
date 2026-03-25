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
                if (this.exams[i] == this.answerkey.responses[i]){
                    notafinal += this.weight.value[i]??0; 
                }
            }
            return notafinal;
        }

        public avg(): number{
            const media = this.exams.reduce((total, valor) => total + valor, 0) / this.exams.length;   
        }
    }