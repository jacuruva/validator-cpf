class ValidarCPF {
    constructor(cpfEnviado) {
        Object.defineProperty(this, 'cpfLimpo', {
            enumerable:true,
            get: function() {
                return cpfEnviado = cpfEnviado.replace(/\D+/g, '')
            }
        })
    }

    valida() {
        // Checar se o CPF não é algo randomico 
        if(!this.cpfLimpo) return false;
        if(typeof this.cpfLimpo === 'undefined') return false;
        if(this.cpfLimpo.length !== 11) return false;
        if(this.éSequencia()) return false;
        // Pegar os 9 primeiros digitos do CPF
        const cpfParcial = this.cpfLimpo.slice(0, -2);
        // Validação do CPF
        const digito1 = ValidarCPF.criaDigito(cpfParcial);
        const digito2 = ValidarCPF.criaDigito(cpfParcial + digito1);
        const novoCpf = cpfParcial + digito1 + digito2
        return novoCpf === this.cpfLimpo;
    };

    static criaDigito(cpfParcial) {
        // CPF de string virar um array
        const cpfArray = Array.from(cpfParcial);
        // Calculo para validar os 2 digitos do CPF
        let regressivo = cpfArray.length + 2;
        const total = cpfArray.reduce((ac, val) => {
            regressivo--;
            ac += (regressivo * Number(val));
            return ac;
        }, 0);

        const digito = 11 - (total % 11);
        return digito > 9 ? '0' : String(digito);
    }

    éSequencia() {
        /*
        Testar se o numero não é uma sequencia, Ex: 111.111.111-72
        charAt(*o caracter zero*)
        */
        return this.cpfLimpo.charAt(0).repeat() === this.cpfLimpo.length
    }
}

// Coloque o CPF dentro das aspas
const cpf = new ValidarCPF('');

if(cpf.valida ()) {
    console.log('Cpf válido')
} else {
    console.log('Cpf inválido')
};