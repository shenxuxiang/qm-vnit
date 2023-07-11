import groovy.json.JsonSlurper;

pipeline {
  agent any

  triggers {
    GenericTrigger (
      // 构建标题
      causeString: 'Triggered building qm-vnit in $ref',
      // 定义变量
      genericVariables: [
        [ key: 'ref', value: '$.ref', regexpFilter: 'refs/heads/' ],
        [ key: 'commit_message', value: '$.head_commit.message' ],
        [ key: 'modified', value: '$.head_commit.modified' ],
      ],
      // 与 git webhook 中定义的 payload-url 一样
      token: 'qmvnit',
      // 要匹配的内容
      regexpFilterText: '$ref;$ref;$commit_message',
      // 匹配的正则表达四
      regexpFilterExpression: '^preview;' + BRANCH_NAME + ';build: '
    )
  }

  stages {
    stage('output variables defined by generic-webhook-trigger plugin') {
      steps {
        script {
          echo "ref: ${ref}";

          echo "commit_message: ${commit_message}";

          echo "modified: ${modified}";
        }
      }
    }

    stage('declare hasInstall variables') {
      steps {
        script {
          def json = new JsonSlurper();
          def modifiedFiles = json.parseText(modified);
          def hasInstall = false;

          for (file in modifiedFiles) {
            if (file == 'package.json') {
              hasInstall = true;
              break;
            }
          }
          echo "hasInstall: ${hasInstall}";
          env.hasInstall = hasInstall;
        }
      }
    }

    stage('building') {
      steps {
        script {
          def dt = new Date();
          def timestamp = dt.toString();

          dingtalk(
            robot: '4ca66784-8955-4dd2-aa78-8294f71cbaac',
            type: 'TEXT',
            text: [
              "qm-vnit is building",
              "分支: ${GIT_BRANCH}",
              "时间：${timestamp}",
              "\n"
            ],
            at: [ "${GIT_COMMITTER_NAME}" ]
          );

          sh '''
            if [ "${hasInstall}" == true ]; then
              yarn install;
            fi

            npm run build;

            rm -rf /usr/share/nginx/www;

            mv ./build /usr/share/nginx/www;
          '''

          def currentTime = new Date();
          env.build_duration = (currentTime.getTime() - dt.getTime()) / 1000;
        }
      }
    }
  }

  post {
    success {
      script {
        def dt = new Date();
        def timestamp = dt.toString();

        dingtalk(
          robot: '4ca66784-8955-4dd2-aa78-8294f71cbaac',
          type: 'TEXT',
          text: [
            "qm-vnit is build successed",
            "分支: ${GIT_BRANCH}",
            "时间：${timestamp}",
            "耗时：${build_duration} s",
            "\n"
          ],
          at: [ "${GIT_COMMITTER_NAME}" ]
        );
      }
    }

    failure {
      script {
        def dt = new Date();
        def timestamp = dt.toString();

        dingtalk(
          robot: '4ca66784-8955-4dd2-aa78-8294f71cbaac',
          type: 'TEXT',
          text: [
            "qm-vnit is build failed",
            "分支: ${GIT_BRANCH}",
            "时间：${timestamp}",
            "\n"
          ],
          at: [  "${GIT_COMMITTER_NAME}" ]
        );
      }
    }
  }
}
