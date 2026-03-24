interface Weight{
    valor: number
}

interface Answer{
    valor: number
}
class Exams{
    private weight: Weight;
    private answer: Answer;
    private exams: Array<Answer> = [];
    constructor(answer:Answer, weight: Weight){
        this.answer =answer
        this.weight = weight
    }
    
    public add(exam:Answer): void{
        this.exams.push(exam)
    }
    public avg(): number{
        return 0;
    }
}