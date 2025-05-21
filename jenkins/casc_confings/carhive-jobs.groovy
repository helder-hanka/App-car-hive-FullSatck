// jenkins/init.groovy.d/carhive-jobs.groovy

import jenkins.model.*
import javaposse.jobdsl.plugin.*

def instance = Jenkins.getInstance()

def jobDslScript = '''
pipelineJob("hello-world") {
  definition {
    cps {
      script("""
        pipeline {
          agent any
          stages {
            stage('Hello') {
              steps {
                echo 'Hello, Jenkins with JCasC!'
              }
            }
          }
        }
      """)
      sandbox()
    }
  }
}

pipelineJob("carhive-pipeline") {
  definition {
    cpsScm {
      scm {
        git {
          remote {
            url('https://github.com/helder-hanka/App-car-hive-FullSatck.git')
          }
          branches('*/feature/test-ci')
        }
      }
    }
  }
}
'''

def dslScriptLoader = new ExecuteDslScripts()
dslScriptLoader.setScriptText(jobDslScript)
dslScriptLoader.setUsingScriptText(true)
dslScriptLoader.run()
