//module para manipular arquivos
const fs = require('fs')
const data = require('./data.json')

//create
exports.post = function(req, res){

    //validação dos campos
    const keys = Object.keys(req.body)
    
    for (key of keys ){
        //desta forma o loop passa a chave dentro do array de objetos
        if (req.body[key] == "" ){
            return res.send('Por favor, Preencha todos os campos!')
        } 
    }

    //destruction
    let {name, avatar_url, birth, scholarity, typeClass, vocation} = req.body

    const id = Number(data.teachers.length + 1)
    birth = Date.parse(birth)
    const created_at = Date.now()
    data.teachers.push({
        id,
        name,
        avatar_url,
        birth,
        scholarity,
        typeClass,
        vocation,
        created_at
    } 
) 
    

    //JSON.stringfy transforma objeto em JSON
    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if (err) return res.send('Arquivo incorreto')
        
        return res.redirect('/teachers')

    })

}