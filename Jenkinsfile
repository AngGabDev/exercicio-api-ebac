pipeline {
    agent any

    stages {
        stage('Setup') {
            steps {
                git branch: 'main', url: 'https://github.com/AngGabDev/exercicio-api-ebac.git'
                bat 'npm install'
            }
        }
        stage('Start') {
            steps {
                bat 'npm start'
            }
        }
        stage('Teste') {
            steps {
                bat '''set NO_COLOR=1
npm test'''
            }
        }
    }
}
