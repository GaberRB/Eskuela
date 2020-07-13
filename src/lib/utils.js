module.exports = {
    age(timestamp){

        const today = new Date()

        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()

        let month = today.getMonth() - birthDate.getMonth()

        if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()){
            age = age - 1
        }
   
        return age
    },
    date(timestamp){

        const date = new Date(timestamp)

        const year = date.getUTCFullYear()

        const month = `0${date.getUTCMonth() + 1}`.slice(-2)

        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            birthDay: `${day}/${month}`,
            iso :  `${year}-${month}-${day}`
        }
        
       

    },

    grade(scholarity){
        let grade ='';
        switch (scholarity){
            case 'EF5':
                grade = '5º Ensino Fundamental';
                break;
            case 'EF6':
                grade = '6º Ensino Fundamental';
                break;
            case 'EF7':
                grade = '7º Ensino Fundamental';
                break;
            case 'EF8':
                grade = '8º Ensino Fundamental';
                break;
            case 'EM1':
                grade = '1º Colegial';
                break;
            case 'EM2':
                grade = '2º Colegial';
                break;                      
            case 'EM3':
                grade = '3º Colegial';
                break;         
        
        }

        return grade
    }
}