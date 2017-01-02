node() {

  stage('Checkout') {
    checkout scm

    sh 'bin/own.sh $PWD'
    sh 'git reset --hard'
    sh 'git clean -fd'
  }

  stage('Test') {
    sh 'bin/test.sh --singleRun=true'
  }

  stage('Publish test results') {
    junit 'test-reports/junit.xml'
  }

  stage('Publish code coverage') {
      step([$class: 'CloverPublisher', cloverReportDir: 'test-reports/', cloverReportFileName: 'clover.xml'])
    }

}
