const fs = require('fs')
const data = require('../data.json')
const { age, date, grade } = require('../utils')
const Intl = require('intl')

exports.index = function(req, res){
 
    return res.render('students/index', {students : data.students})
}
exports.post = function(req, res){

    const keys = Object.keys(req.body)
    
    for (key of keys ){
        if (req.body[key] == "" ){
            return res.send('Por favor, Preencha todos os campos!')
        } 
    }

    birth = Date.parse(req.body.birth)
    let id = 1
    const lastStudant = data.students[data.students.length - 1]
    
    if(lastStudant){
        id = lastStudant.id + 1
    }
    data.students.push({
        id,
        ...req.body,
        birth
    } 
) 
    

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
        birthDay: date(foundStudent.birth).birthDay,
        grade : grade(foundStudent.scholarity)
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
        date: date(foundStudent.birth).iso
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