const { age, date, grade } = require('../../lib/utils')
const Student = require ('../models/Student')
const Intl = require('intl')

module.exports = {

    index(req, res){

        Student.all(function(students){
            
            return res.render('students/index', {students}) 
        })
        
    },
    create(req, res){
        return res.render('students/create')
    },
    post(req, res){
        const keys = Object.keys(req.body)
    
        for (key of keys ){
            if (req.body[key] == "" ){
                return res.send('Por favor, Preencha todos os campos!')
            } 
        }

        Student.create(req.body, function(student){
            return res.redirect(`/students/${student.id}`)
        })
        
        
    },
    show(req, res){
       
        Student.find(req.params.id, function(student){
            if(!student) return res.send("Professor não encontrado")

            student.age = age(student.birth_date)
            student.birthDay = date(student.birth_date).birthDay
            student.grade = grade(student.education_level)
            
            return res.render('students/show', { student })
        })
    },
    edit(req, res){
        const keys = Object.keys(req.body)
    
        for (key of keys ){
            if (req.body[key] == "" ){
                return res.send('Por favor, Preencha todos os campos!')
            } 
        }
        Student.find(req.params.id, function(student){
            if(!student) return res.send("Professor não encontrado")

            student.birth_date = date(student.birth_date).iso

            return res.render('students/edit', { student })
        })
    },
    put(req, res){
        Student.update(req.body, function(){
            return res.redirect(`/students/${req.body.id}`)
        })
    },
    delete(req, res){
        Student.delete(req.body.id, function(){
            return res.redirect(`/students`)
        })
    },
}
