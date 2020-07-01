const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../utils')
const Intl = require('intl')

exports.index = function(req, res){


    return res.render('teachers/index', {teachers: data.teachers})
}
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
exports.edit = function(req, res){
    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id
    })

    if (!foundTeacher) return res.send("Teacher not found!")

    teacher = {
        ...foundTeacher,
        date: date(foundTeacher.birth).iso
    }


    return res.render('teachers/edit', {teacher})

}
exports.create = function(req, res){

    return res.render('teachers/create')
}
exports.put = function(req, res){
    const { id } = req.body
    let index = 0

    const foundTeacher = data.teachers.find(function(teacher, foundIndex){
        if (teacher.id == id){
            index = foundIndex
            return true
        }
    })

    if (!foundTeacher) return res.send("Teacher not found!")

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }
 
    data.teachers[index] = teacher

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if (err) return res.send('Wrong File!')

        return res.redirect(`/teachers/${id}`)
    })
}
exports.delete = function(req, res){
    const { id } = req.body

    const filteredTeacher = data.teachers.filter(function(teacher){
        return teacher.id != id
    })
    
    data.teachers = filteredTeacher

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if (err) return res.send('Wrong File')

        return res.redirect('/teachers')
    })


}