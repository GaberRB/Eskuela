//module para manipular arquivos
const fs = require('fs')
const data = require('./data.json')
const { age, date } = require('./utils')
const Intl = require('intl')

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
        
        return res.redirect(`/teachers/${id}`)

    })

}

//show
exports.show = function(req, res){
    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id
    })

    if (!foundTeacher) return res.send("Teacher not found!")

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at),
        vocation: foundTeacher.vocation.split(',')
    }
    return res.render('teachers/show', {teacher})
}

//edit

exports.edit = function(req, res){
    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id
    })

    if (!foundTeacher) return res.send("Teacher not found!")

    teacher = {
        ...foundTeacher,
        date: date(foundTeacher.birth)
    }


    return res.render('teachers/edit', {teacher})

}