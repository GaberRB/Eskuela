const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../utils')
const Intl = require('intl')

exports.index = function(req, res){


    return res.render('students/index', {students: data.students})
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

    const id = Number(data.students.length + 1)
    birth = Date.parse(birth)
    const created_at = Date.now()
    data.students.push({
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
        
        return res.redirect(`/students/${id}`)

    })

}
exports.show = function(req, res){
    const { id } = req.params

    const foundStudent = data.students.find(function(student){
        return student.id == id
    })

    if (!foundStudent) return res.send("Student not found!")

    const student = {
        ...foundStudent,
        age: age(foundStudent.birth),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundStudent.created_at),
        vocation: foundStudent.vocation.split(',')
    }
    return res.render('students/show', {student})
}
exports.edit = function(req, res){
    const { id } = req.params

    const foundStudent = data.students.find(function(student){
        return student.id == id
    })

    if (!foundStudent) return res.send("Student not found!")

    student = {
        ...foundStudent,
        date: date(foundStudent.birth)
    }


    return res.render('students/edit', {student})

}
exports.create = function(req, res){

    return res.render('students/create')
}
exports.put = function(req, res){
    const { id } = req.body
    let index = 0

    const foundStudent = data.students.find(function(student, foundIndex){
        if (student.id == id){
            index = foundIndex
            return true
        }
    })

    if (!foundStudent) return res.send("Student not found!")

    const student = {
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }
 
    data.students[index] = student

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if (err) return res.send('Wrong File!')

        return res.redirect(`/students/${id}`)
    })
}
exports.delete = function(req, res){
    const { id } = req.body

    const filteredStudent = data.students.filter(function(student){
        return student.id != id
    })
    
    data.students = filteredStudent

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if (err) return res.send('Wrong File')

        return res.redirect('/students')
    })


}